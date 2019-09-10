const TrackInfoFactory = React => ({ track }) => {
  return (
    <div className='hyper-spotify-track' style={styles.trackInfoContainer}>
      <b>{track.name}</b>
      {track.artist ? (
        <span> by <b>{track.artist}</b></span>
      ) : (
        ''
      )}
    </div>
  )
}

const styles = {
  trackInfoContainer: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
}

export default TrackInfoFactory
