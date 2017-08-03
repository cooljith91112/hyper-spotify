import dbus from 'dbus-native'
import { join, reduce, split, toLower } from 'lodash'

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
}

export default SpotifyLinux
