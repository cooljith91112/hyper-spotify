import {SpotifyManager} from '@panz3r/spotify-js';
import {isEqual} from 'lodash';

import IconFactory from '../components/Icon';
import PlayerControlsFactory from '../components/PlayerControls';
import TrackInfoFactory from '../components/TrackInfo';
import {RPCEvents} from '../constants';

const getWidgetStyle = controlsPosition => {
  switch (controlsPosition) {
    case 'left':
      return {
        ...styles.widgetStyle,
        ...styles.leftControlsWidgetStyle
      };

    case 'right':
      return {
        ...styles.widgetStyle,
        ...styles.rightControlsWidgetStyle
      };

    default:
      return {
        ...styles.widgetStyle
      };
  }
};

const HyperSpotifyWidgetFactory = React => {
  const Icon = IconFactory(React); // eslint-disable-line no-unused-vars
  const PlayerControls = PlayerControlsFactory(React); // eslint-disable-line no-unused-vars
  const TrackInfo = TrackInfoFactory(React); // eslint-disable-line no-unused-vars

  const skipActions = {
    previous: 'PREV',
    next: 'NEXT'
  };

  const initialState = {
    isPlaying: false,
    isRunning: false,
    track: {
      artist: '',
      name: ''
    }
  };

  return class HyperSpotifyWidget extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        ...initialState
      };

      this.spotifyManager = new SpotifyManager();
      this.supportedSpotifyActions = this.spotifyManager.supportedActions();
    }

    componentDidMount() {
      // console.log('HyperSpotifyWidget didMount')

      if (!this.soundCheck) {
        this.soundCheck = setInterval(() => this.performSoundCheck(), 5000);
      }

      this.performSoundCheck();

      // Attach shortcut handlers
      window.rpc.on(RPCEvents.togglePlayPause, this.togglePlayState);
      window.rpc.on(RPCEvents.prevSong, this.skipToPrevious);
      window.rpc.on(RPCEvents.nextSong, this.skipToNext);
    }

    componentWillUnmount() {
      // console.log('HyperSpotifyWidget willUnmount')

      if (this.soundCheck) {
        clearInterval(this.soundCheck);
      }

      // Remove shortcut handlers
      window.rpc.removeListener(RPCEvents.togglePlayPause, this.togglePlayState);
      window.rpc.removeListener(RPCEvents.prevSong, this.skipToPrevious);
      window.rpc.removeListener(RPCEvents.nextSong, this.skipToNext);
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !isEqual(nextState, this.state);
    }

    performSoundCheck() {
      // console.log('SoundCheck...', new Date(), 'at', this)

      // _reactInternalInstance (Hyper 1.x) || _reactInternalFiber (Hyper 2.x)
      if (!this._reactInternalInstance && !this._reactInternalFiber) {
        // Kill this interval since its container does not exists anymore
        if (this.soundCheck) {
          clearInterval(this.soundCheck);
        }

        return;
      }

      this.spotifyManager
        .isRunning()
        .then(isRunning => {
          this.setState({isRunning});

          if (isRunning) {
            // Get Play/Pause state
            this.spotifyManager
              .getState()
              .then(({state}) => {
                this.setState({isPlaying: state === 'playing'});
                // Get Track details
                return this.spotifyManager.getTrack();
              })
              .then(track => {
                // console.log('currentTrack', track)
                this.setState({track});
              })
              .catch(() => {
                this.setState({...initialState});
              });
          } else {
            this.setState({...initialState});
          }
        })
        .catch(() => {
          this.setState({...initialState});
        });
    }

    togglePlayState = () => {
      const {isRunning} = this.state;

      if (isRunning) {
        this.spotifyManager
          .togglePlayPause()
          .then(spotifyState => {
            this.setState({isPlaying: spotifyState.state === 'playing'});
          })
          .catch(() => {
            this.setState({...initialState});
          });
      }
    };

    _getSkipPromise(skipAction) {
      const {previous, next} = skipActions;

      switch (skipAction) {
        case previous:
          return this.spotifyManager.previousTrack();

        case next:
          return this.spotifyManager.nextTrack();
      }
    }

    skipTo = skipAction => {
      const {isRunning} = this.state;

      if (isRunning) {
        this._getSkipPromise(skipAction)
          .then(track => {
            // console.log('newTrack', track)
            this.setState({track});
          })
          .catch(() => {
            this.setState({...initialState});
          });
      }
    };

    skipToNext = () => this.skipTo(skipActions.next);

    skipToPrevious = () => this.skipTo(skipActions.previous);

    _launchSpotify = () => this.spotifyManager.launchSpotify();

    renderSpacer(controlsPosition) {
      if (controlsPosition !== 'center') {
        return <div style={styles.spacer} />;
      }

      return null;
    }

    render() {
      const {pluginConfig} = this.props;
      const {isPlaying, isRunning, track} = this.state;

      const {controlsPosition} = pluginConfig;

      if (!isRunning) {
        return (
          <div style={styles.widgetStyle}>
            <Icon iconName="spotify" onClick={this._launchSpotify} style={styles.iconStyle} />
          </div>
        );
      }

      return (
        <div style={getWidgetStyle(controlsPosition)}>
          <PlayerControls
            isPlaying={isPlaying}
            onNext={this.skipToNext}
            onPrevious={this.skipToPrevious}
            onTogglePlayState={this.togglePlayState}
            supportedActions={this.supportedSpotifyActions}
          />

          <TrackInfo track={track} />

          {this.renderSpacer(controlsPosition)}
        </div>
      );
    }
  };
};

const styles = {
  widgetStyle: {
    width: '100%',
    height: 30,
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftControlsWidgetStyle: {
    justifyContent: 'space-between'
  },
  rightControlsWidgetStyle: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
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
  },
  spacer: {
    width: 86
  }
};

export default HyperSpotifyWidgetFactory;
