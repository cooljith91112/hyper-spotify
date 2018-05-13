class SpotifyDefault {
  constructor () {
    console.error('[hyper-spotify] Unsupported OS')
  }

  supportedActions () {
    return []
  }

  isRunning () {
    Promise.resolve(false)
  }
}

export default SpotifyDefault
