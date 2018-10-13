import os from 'os'
import { SpotifyDarwin, SpotifyLinux, SpotifyDefault } from './spotify'

class SpotifyManager {
  constructor () {
    switch (os.platform()) {
      case 'darwin':
        this.spotifyService = new SpotifyDarwin()
        break

      case 'linux':
        this.spotifyService = new SpotifyLinux()
        break

      default:
        this.spotifyService = new SpotifyDefault()
    }
  }

  supportedActions () {
    return this.spotifyService.supportedActions()
  }

  isRunning () {
    return this.spotifyService.isRunning()
  }

  getState () {
    return this.spotifyService.getState()
  }

  togglePlayPause () {
    return this.spotifyService.togglePlayPause()
  }

  previousTrack () {
    return this.spotifyService.previousTrack()
  }

  nextTrack () {
    return this.spotifyService.nextTrack()
  }

  getTrack () {
    return this.spotifyService.getTrack()
  }
}

export default SpotifyManager
