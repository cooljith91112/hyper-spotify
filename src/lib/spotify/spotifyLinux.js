import dbus from 'dbus-native'
import join from 'lodash.join'
import reduce from 'lodash.reduce'
import split from 'lodash.split'
import toLower from 'lodash.tolower'

class SpotifyLinux {
  constructor () {
    this.sessionBus = dbus.sessionBus()
    this.spotifyService = this.sessionBus.getService('org.mpris.MediaPlayer2.spotify')
  }

  isRunning () {
    return this._getSpotifyInterface()
      .then(() => Promise.resolve(true))
      .catch(() => Promise.resolve(false))
  }

  getState () {
    return this._getSpotifyInterface()
      .then(spotify => this._getPlaybackStatus(spotify))
      .then(status => Promise.resolve({ state: toLower(status) }))
  }

  getTrack () {
    return this._getSpotifyInterface()
      .then(spotify => this._getMetadata(spotify))
  }

  togglePlayPause () {
    return this._getSpotifyInterface()
      .then(spotify => this._playPause(spotify))
      .then(spotify => this._getPlaybackStatus(spotify))
      .then(status => Promise.resolve({ state: toLower(status) }))
  }

  previousTrack () {
    return this._getSpotifyInterface()
      .then(spotify => this._previous(spotify))
      .then(spotify => this._getMetadata(spotify))
  }

  nextTrack () {
    return this._getSpotifyInterface()
      .then(spotify => this._next(spotify))
      .then(spotify => this._getMetadata(spotify))
  }

  // Internal methods
  _getSpotifyInterface () {
    return new Promise((resolve, reject) => {
      this.spotifyService.getInterface('/org/mpris/MediaPlayer2', 'org.mpris.MediaPlayer2.Player', function (err, spotify) {
        if (err) {
          reject(err)
        } else {
          resolve(spotify)
        }
      })
    })
  }

  _getPlaybackStatus (spotifyInterface) {
    return new Promise(function (resolve, reject) {
      spotifyInterface.PlaybackStatus(function (err, status) {
        if (err) {
          reject(err)
        } else {
          resolve(status)
        }
      })
    })
  }

  _getMetadata (spotifyInterface) {
    return new Promise(function (resolve, reject) {
      spotifyInterface.Metadata(function (err, metadata) {
        if (err) {
          reject(err)
        } else {
          const m = reduce(metadata, (dst, m) => {
            const [k, v] = m
            const [, values] = v
            const key = split(k, ':')[1]
            const val = values[0]
            dst[key] = Array.isArray(val) ? join(val, ' & ') : val
            return dst
          }, {})
          m.name = m.title
          resolve(m)
        }
      })
    })
  }

  _playPause (spotifyInterface) {
    return new Promise(function (resolve, reject) {
      try {
        spotifyInterface.PlayPause(function () {
          setTimeout(() => resolve(spotifyInterface), 500)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  _next (spotifyInterface) {
    return new Promise(function (resolve, reject) {
      try {
        spotifyInterface.Next(function () {
          setTimeout(() => resolve(spotifyInterface), 500)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  _previous (spotifyInterface) {
    return new Promise(function (resolve, reject) {
      try {
        spotifyInterface.Previous(function () {
          setTimeout(() => resolve(spotifyInterface), 500)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default SpotifyLinux
