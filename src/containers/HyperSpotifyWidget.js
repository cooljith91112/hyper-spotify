import { isEqual } from 'lodash'
import spotify from 'spotify-node-applescript'
import TrackInfoFactory from '../components/TrackInfo'

const HyperSpotifyWidgetFactory = (React) => {
  const { Component } = React

  const TrackInfo = TrackInfoFactory(React) // eslint-disable-line no-unused-vars

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
    }

    performSoundCheck () {
      console.log('SoundCheck...', new Date(), 'at', this)

      if (!this._reactInternalInstance) {
        // Kill this interval since its container does not exists anymore
        if (this.soundCheck) {
          clearInterval(this.soundCheck)
        }

        return
      }

      spotify.isRunning((err, isRunning) => {
        if (!err) {
          this.setState({ isRunning })

          if (isRunning) {
            // Get Play/Pause state
            spotify.getState((err, spotifyState) => {
              if (!err) {
                this.setState({ isPlaying: spotifyState.state })

                // Get Track details
                spotify.getTrack((err, track) => {
                  if (!err) {
                    console.log('currentTrack', track)
                    this.setState({ track })
                  } else {
                    this.setState({ ...initialState })
                  }
                })
              } else {
                this.setState({ ...initialState })
              }
            })
          }
        } else {
          this.setState({ ...initialState })
        }
      })
    }

    componentDidMount () {
      console.log('HyperSpotifyWidget didMount')

      if (!this.soundCheck) {
        this.soundCheck = setInterval(() => this.performSoundCheck(), 5000)
      }

      this.performSoundCheck()
    }

    componentDidUnmount () {
      console.log('HyperSpotifyWidget didUnmount')

      if (this.soundCheck) {
        clearInterval(this.soundCheck)
      }
    }

    shouldComponentUpdate (nextProps, nextState) {
      return !isEqual(nextState, this.state)
    }

    render () {
      const {
        isRunning,
        isPlaying,
        track
      } = this.state

      return (
        <div style={styles.widgetStyle}>
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
    fontSize: 12
  }
}

export default HyperSpotifyWidgetFactory
