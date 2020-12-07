const HyperSpotifyOverlayFactory = (React) =>
  function HyperOverlay() {
    return <span className="hyper-spotify-overlay" style={styles.overlayStyle} />;
  };

const styles = {
  overlayStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.07
  }
};

export default HyperSpotifyOverlayFactory;
