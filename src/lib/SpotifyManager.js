import os from 'os'
import spotify from 'spotify-node-applescript'
import { SpotifyLinux, SpotifyDefault } from './spotify'

class SpotifyManager {
  constructor () {
    switch (os.platform()) {
      case 'darwin':
        this.spotifyService = spotify
        break
      case 'linux':
        this.spotifyService = new SpotifyLinux()
        break

      default:
        this.spotifyService = new SpotifyDefault()
    }
  }

  isRunning () {
    return new Promise((resolve, reject) => {
      this.spotifyService.isRunning((err, isRunning) => {
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
      this.spotifyService.getState((err, state) => {
        if (err) {
          reject(err)
        } else {
          resolve(state)
        }
      })
    })
  }

  togglePlayPause () {
    return new Promise((resolve, reject) => {
      this.spotifyService.playPause((err) => {
        if (err) {
          reject(err)
        } else {
          spotify.getState((err, state) => {
            if (err) {
              reject(err)
            } else {
              resolve(state)
            }
          })
        }
      })
    })
  }

  previousTrack () {
    return new Promise((resolve, reject) => {
      this.spotifyService.previous((err) => {
        if (err) {
          reject(err)
        } else {
          this.spotifyService.getTrack((err, track) => {
            if (err) {
              reject(err)
            } else {
              resolve(track)
            }
          })
        }
      })
    })
  }

  nextTrack () {
    return new Promise((resolve, reject) => {
      this.spotifyService.next((err) => {
        if (err) {
          reject(err)
        } else {
          this.spotifyService.getTrack((err, track) => {
            if (err) {
              reject(err)
            } else {
              resolve(track)
            }
          })
        }
      })
    })
  }

  getTrack () {
    return new Promise((resolve, reject) => {
      this.spotifyService.getTrack((err, track) => {
        if (err) {
          reject(err)
        } else {
          resolve(track)
        }
      })
    })
  }
}

export default SpotifyManager
