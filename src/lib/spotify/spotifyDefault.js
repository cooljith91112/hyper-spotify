class SpotifyDefault {
  constructor() {
    console.error('[hyper-spotify] Unsupported OS'); // eslint-disable-line no-console
  }

  supportedActions() {
    return [];
  }

  isRunning() {
    Promise.resolve(false);
  }
}

export default SpotifyDefault;
