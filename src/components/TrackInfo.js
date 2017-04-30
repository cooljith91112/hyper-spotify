const TrackInfoFactory = (React) => ({ track }) => {
  return (
    <div>
      <b>{track.name}</b> by <b>{track.artist}</b>
    </div>
  )
}

export default TrackInfoFactory
