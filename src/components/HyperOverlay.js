
const HyperSpotifyOverlayFactory = (React) => () => (
  <span style={styles.overlayStyle} />
)

const styles = {
  overlayStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    opacity: 0.07
  }
}

export default HyperSpotifyOverlayFactory
