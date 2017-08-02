class SpotifyDefault {
  isRunning (isRunningCallback) {
    if (isRunningCallback) {
      isRunningCallback(undefined, false)
    }
  }
}

export default SpotifyDefault
