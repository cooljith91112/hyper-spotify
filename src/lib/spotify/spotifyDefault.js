class SpotifyDefault {
  constructor () {
    console.error('[hyper-spotify] Unsupported OS')
  }

  isRunning () {
    Promise.resolve(false)
  }
}

export default SpotifyDefault
