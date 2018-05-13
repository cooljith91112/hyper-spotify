import { Spotilocal } from 'spotilocal'

class SpotifyWindows {
  constructor () {
    this.spotilocal = new Spotilocal();
  }

  supportedActions () {
    return [
      'togglePlayPause'
    ];
  }

  isRunning () {
    return this.spotilocal.init()
      .then(() => Promise.resolve(true))
      .catch(() => Promise.resolve(false));
  }

  getState () {
    return this.spotilocal.getStatus()
      .then(status => Promise.resolve({
        state: status.playing ? 'playing' : 'paused'
      }));
  }

  getTrack () {
    return this.spotilocal.getStatus()
      .then(status => Promise.resolve({
        name: status.track.track_resource.name,
        artist: status.track.artist_resource.name
      }));
  }

  togglePlayPause () {
    return this.getState()
    .then(({state}) => this.spotilocal.pause(state == 'playing'))
    .then(status => Promise.resolve({
      state: status.playing ? 'playing' : 'pause'
    }));
  }

  previousTrack () {
    return Promise.reject('Method "previousTrack" is unsupported on this platform.');
  }

  nextTrack () {
    return Promise.reject('Method "nextTrack" is unsupported on this platform.');
  }
}

export default SpotifyWindows
