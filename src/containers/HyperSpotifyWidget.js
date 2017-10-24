import isEqual from 'lodash.isequal'
import SpotifyManager from '../lib/SpotifyManager'
import IconFactory from '../components/Icon'
import TrackInfoFactory from '../components/TrackInfo'

const HyperSpotifyWidgetFactory = (React) => {
  const { Component } = React

  const Icon = IconFactory(React) // eslint-disable-line no-unused-vars
  const TrackInfo = TrackInfoFactory(React) // eslint-disable-line no-unused-vars

  const skipActions = {
    previous: 'PREV',
    next: 'NEXT'
  }

  const initialState = {
    isRunning: false,
    isPlaying: false,
    track: {
      name: '',
      artist: ''
    }
  }

  return class extends Component {
    constructor (props) {
      super(props)

      this.state = {
        isRunning: false,
        isPlaying: false,
        track: {
          name: '',
          artist: ''
        }
      }

      this.spotifyManager = new SpotifyManager()
    }

    performSoundCheck () {
      // console.log('SoundCheck...', new Date(), 'at', this)
      const { spotifyManager } = this

      // _reactInternalInstance (Hyper 1.x) || _reactInternalFiber (Hyper 2.x)
      if (!this._reactInternalInstance && !this._reactInternalFiber) {
        // Kill this interval since its container does not exists anymore
        if (this.soundCheck) {
          clearInterval(this.soundCheck)
        }

        return
      }

      spotifyManager.isRunning()
        .then(isRunning => {
          this.setState({ isRunning })

          if (isRunning) {
            // Get Play/Pause state
            spotifyManager.getState()
              .then(({ state }) => {
                this.setState({ isPlaying: (state === 'playing') })
                // Get Track details
                return spotifyManager.getTrack()
              })
              .then((track) => {
                // console.log('currentTrack', track)
                this.setState({ track })
              })
              .catch(() => {
                this.setState({ ...initialState })
              })
          } else {
            this.setState({ ...initialState })
          }
        })
        .catch(() => {
          this.setState({ ...initialState })
        })
    }

    togglePlayState () {
      const { spotifyManager, state: { isRunning } } = this

      if (isRunning) {
        spotifyManager.togglePlayPause()
          .then((spotifyState) => {
            this.setState({ isPlaying: (spotifyState.state === 'playing') })
          })
          .catch(() => {
            this.setState({ ...initialState })
          })
      }
    }

    _getSkipPromise (skipAction) {
      const { spotifyManager } = this
      const { previous, next } = skipActions

      switch (skipAction) {
        case previous:
          return spotifyManager.previousTrack()

        case next:
          return spotifyManager.nextTrack()
      }
    }

    skipTo (skipAction) {
      const { isRunning } = this.state

      if (isRunning) {
        this._getSkipPromise(skipAction)
            .then((track) => {
              // console.log('newTrack', track)
              this.setState({ track })
            })
            .catch(() => {
              this.setState({ ...initialState })
            })
      }
    }

    componentDidMount () {
      // console.log('HyperSpotifyWidget didMount')

      if (!this.soundCheck) {
        this.soundCheck = setInterval(() => this.performSoundCheck(), 5000)
      }

      this.performSoundCheck()
    }

    componentWillUnmount () {
      // console.log('HyperSpotifyWidget willUnmount')

      if (this.soundCheck) {
        clearInterval(this.soundCheck)
      }
    }

    shouldComponentUpdate (nextProps, nextState) {
      return !isEqual(nextState, this.state)
    }

    renderControls () {
      const {
        previous,
        next
      } = skipActions

      const {
        controlsContainerStyle,
        leftControlsContainerStyle,
        rightControlsContainerStyle,
        iconStyle,
        playIconStyle
      } = styles

      const {
        isRunning,
        isPlaying
      } = this.state

      const {
        pluginConfig: {
          controlsPosition
        }
      } = this.props

      if (isRunning) {
        let controlsStyle = controlsContainerStyle

        switch (controlsPosition) {
          case 'left':
            controlsStyle = { ...controlsContainerStyle, ...leftControlsContainerStyle }
            break

          case 'right':
            controlsStyle = { ...controlsContainerStyle, ...rightControlsContainerStyle }
            break

          default:
            controlsStyle = { ...controlsContainerStyle }
        }

        return (
          <div style={controlsStyle}>
            <Icon
              iconName='previous'
              onClick={() => this.skipTo(previous)}
              style={iconStyle}
            />

            <Icon
              iconName={isPlaying ? 'pause' : 'play'}
              onClick={() => this.togglePlayState()}
              style={{ ...iconStyle, ...playIconStyle }}
            />

            <Icon
              iconName='next'
              onClick={() => this.skipTo(next)}
              style={iconStyle}
            />
          </div>
        )
      }

      return (
        <Icon
          iconName='spotify'
          onClick={() => console.log('Start Spotify')}
          style={iconStyle}
        />
      )
    }

    render () {
      const {
        track
      } = this.state

      const {
        widgetStyle
      } = styles

      return (
        <div style={widgetStyle}>
          {this.renderControls()}

          <TrackInfo
            track={track}
          />
        </div>
      )
    }
  }
}

const styles = {
  'widgetStyle': {
    height: 30,
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'controlsContainerStyle': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginRight: 6
  },
  'leftControlsContainerStyle': {
    position: 'absolute',
    left: 14,
    marginRight: 0
  },
  'rightControlsContainerStyle': {
    position: 'absolute',
    right: 14,
    marginRight: 0
  },
  'iconStyle': {
    height: 16,
    width: 17,
    backgroundColor: '#FFF'
  },
  'playIconStyle': {
    marginLeft: 6,
    marginRight: 6
  }
}

export default HyperSpotifyWidgetFactory
