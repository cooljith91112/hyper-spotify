const TrackInfoFactory = (React) => ({ track }) => {
  return (
    <div>
      <b>{track.name}</b> { track.artist ? <span> by <b>{track.artist}</b></span> : '' }
    </div>
  )
}

export default TrackInfoFactory
