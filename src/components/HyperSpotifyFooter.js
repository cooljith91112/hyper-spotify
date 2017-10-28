import HyperSpotifyWidgetFactory from '../containers/HyperSpotifyWidget'

export const HyperSpotifyFooterFactory = (React) => {
  const HyperSpotifyWidget = HyperSpotifyWidgetFactory(React) // eslint-disable-line no-unused-vars

  return ({ pluginConfig }) => (
    <footer
      className='hyper-spotify hoverable'
      style={styles.footerStyle}
    >
      <span style={styles.footerOverlayStyle} />
      <HyperSpotifyWidget pluginConfig={pluginConfig} />
    </footer>
  )
}

const styles = {
  'footerStyle': {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0.5'
  },
  'footerOverlayStyle': {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    opacity: 0.07
  }
}
