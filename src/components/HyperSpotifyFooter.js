import HyperSpotifyOverlayFactory from './HyperOverlay';
import HyperSpotifyWidgetFactory from '../containers/HyperSpotifyWidget';

export const HyperSpotifyFooterFactory = React => {
  const HyperSpotifyOverlay = HyperSpotifyOverlayFactory(React);
  const HyperSpotifyWidget = HyperSpotifyWidgetFactory(React);

  const HyperSpotifyFooter = ({pluginConfig}) => (
    <footer className="hyper-spotify hoverable" style={styles.footerStyle}>
      <HyperSpotifyOverlay />
      <HyperSpotifyWidget pluginConfig={pluginConfig} />
    </footer>
  );

  return HyperSpotifyFooter;
};

const styles = {
  footerStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0.5'
  }
};
