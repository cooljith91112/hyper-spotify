import { emojify } from 'react-emojione'

const TrackInfoFactory = (React) => ({ track }) => {
  return (
    <div>
      {emojify('🎵')}
      <b>{track.name}</b> by <b>{track.artist}</b>
      {emojify('🎵')}
    </div>
  )
}

export default TrackInfoFactory
