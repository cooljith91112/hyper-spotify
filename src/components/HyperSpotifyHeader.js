import HyperSpotifyOverlayFactory from './HyperOverlay'
import HyperSpotifyWidgetFactory from '../containers/HyperSpotifyWidget'

export const HyperSpotifyHeaderFactory = (React) => {
  const HyperSpotifyOverlay = HyperSpotifyOverlayFactory(React) // eslint-disable-line no-unused-vars
  const HyperSpotifyWidget = HyperSpotifyWidgetFactory(React) // eslint-disable-line no-unused-vars

  return ({ pluginConfig }) => (
    <header
      className='hyper-spotify hoverable'
      style={styles.headerStyle}
    >
      <HyperSpotifyOverlay />
      <HyperSpotifyWidget pluginConfig={pluginConfig} />
    </header>
  )
}

const styles = {
  'headerStyle': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    opacity: '0.5'
  }
}
