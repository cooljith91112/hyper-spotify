import spotify from 'spotify-node-applescript'

class SpotifyDarwin {
  supportedActions () {
    return [
      'togglePlayPause',
      'previousTrack',
      'nextTrack'
    ]
  }

  isRunning () {
    return new Promise((resolve, reject) => {
      spotify.isRunning((err, isRunning) => {
        if (err) {
          reject(err)
        } else {
          resolve(isRunning)
        }
      })
    })
  }

  getState () {
    return new Promise((resolve, reject) => {
      spotify.getState((err, state) => {
        if (err) {
          reject(err)
        } else {
          resolve(state)
        }
      })
    })
  }

  getTrack () {
    return new Promise((resolve, reject) => {
      spotify.getTrack((err, track) => {
        if (err) {
          reject(err)
        } else {
          resolve(track)
        }
      })
    })
  }

  togglePlayPause () {
    return new Promise((resolve, reject) => {
      spotify.playPause((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
      .then(() => this.getState())
  }

  previousTrack () {
    return new Promise((resolve, reject) => {
      spotify.previous((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
      .then(() => this.getTrack())
  }

  nextTrack () {
    return new Promise((resolve, reject) => {
      spotify.next((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
      .then(() => this.getTrack())
  }
}

export default SpotifyDarwin
