import Radium from 'radium'
import HyperSpotifyWidgetFactory from '../containers/HyperSpotifyWidget'

export const HyperSpotifyHeaderFactory = (React) => {
  const HyperSpotifyWidget = HyperSpotifyWidgetFactory(React) // eslint-disable-line no-unused-vars

  return Radium(({ pluginConfig }) => (
    <header style={styles.headerStyle}>
      <span style={styles.headerOverlayStyle} />
      <HyperSpotifyWidget pluginConfig={pluginConfig} />
    </header>
  ))
}

const styles = {
  'headerStyle': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    opacity: '0.5',
    ':hover': {
      opacity: '1'
    }
  },
  'headerOverlayStyle': {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: 0.1
  }
}
