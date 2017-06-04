import HyperSpotifyWidgetFactory from '../containers/HyperSpotifyWidget'

export const HyperSpotifyFooterFactory = (React) => {
  const HyperSpotifyWidget = HyperSpotifyWidgetFactory(React) // eslint-disable-line no-unused-vars

  return () => {
    return (
      <footer style={styles.footerStyle}>
        <span style={styles.footerOverlayStyle} />
        <HyperSpotifyWidget />
      </footer>
    )
  }
}

const styles = {
  'footerStyle': {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'footerOverlayStyle': {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#cbcfd4',
    opacity: 0.03
  }
}
