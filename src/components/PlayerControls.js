import IconFactory from './Icon';

const PlayerControlsFactory = React => {
  const Icon = IconFactory(React);

  const PlayerControls = ({isPlaying, onNext, onPrevious, onTogglePlayState, supportedActions}) => (
    <div style={styles.controlsContainerStyle}>
      <Icon
        iconName="previous"
        onClick={onPrevious}
        style={{
          ...styles.iconStyle,
          display: !supportedActions.includes('previousTrack') ? 'none' : 'inherit'
        }}
      />

      <Icon
        iconName={isPlaying ? 'pause' : 'play'}
        onClick={onTogglePlayState}
        style={{
          ...styles.iconStyle,
          ...styles.playIconStyle,
          display: !supportedActions.includes('togglePlayPause') ? 'none' : 'inherit'
        }}
      />

      <Icon
        iconName="next"
        onClick={onNext}
        style={{
          ...styles.iconStyle,
          display: !supportedActions.includes('nextTrack') ? 'none' : 'inherit'
        }}
      />
    </div>
  );

  return PlayerControls;
};

const styles = {
  controlsContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  iconStyle: {
    height: 16,
    width: 18
  },
  playIconStyle: {
    marginLeft: 6,
    marginRight: 6
  }
};

export default PlayerControlsFactory;
