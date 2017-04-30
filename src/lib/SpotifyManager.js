import spotify from 'spotify-node-applescript'

class SpotifyManager {
  static isRunning () {
    return new Promise(function (resolve, reject) {
      spotify.isRunning((err, isRunning) => {
        if (err) {
          reject(err)
        } else {
          resolve(isRunning)
        }
      })
    })
  }

  static getState () {
    return new Promise(function (resolve, reject) {
      spotify.getState((err, state) => {
        if (err) {
          reject(err)
        } else {
          resolve({ ...state })
        }
      })
    })
  }

  static getTrack () {
    return new Promise(function (resolve, reject) {
      spotify.getTrack((err, track) => {
        if (err) {
          reject(err)
        } else {
          resolve({ ...track })
        }
      })
    })
  }
}

export default SpotifyManager
