import HyperSpotifyOverlayFactory from './HyperOverlay'
import HyperSpotifyWidgetFactory from '../containers/HyperSpotifyWidget'

export const HyperSpotifyFooterFactory = (React) => {
  const HyperSpotifyOverlay = HyperSpotifyOverlayFactory(React) // eslint-disable-line no-unused-vars
  const HyperSpotifyWidget = HyperSpotifyWidgetFactory(React) // eslint-disable-line no-unused-vars

  return ({ pluginConfig }) => (
    <footer
      className='hyper-spotify hoverable'
      style={styles.footerStyle}
    >
      <HyperSpotifyOverlay />
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
  }
}
