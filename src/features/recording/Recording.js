import React from 'react'
import { connect } from 'react-redux'

import {
  startRecordingClicked,
  stopRecording,
  playRecordingClicked,
} from './recordingSlice'

const Recording = ({
  isRecording,
  startRecordingClicked,
  stopRecording,
  playRecordingClicked,
  hasRecordings,
  isPlaying,
}) => {
  const canPlayRecording = hasRecordings && !isRecording && !isPlaying
  return (
    <>
      {isRecording ? (
        <button onClick={() => stopRecording()}>Stop Recording</button>
      ) : (
        <button onClick={() => startRecordingClicked()}>Start Recording</button>
      )}
      {canPlayRecording && (
        <button onClick={() => playRecordingClicked()}>Play Recording</button>
      )}
    </>
  )
}
const mapStateToProps = (state) => ({
  isRecording: state.recording.isRecording,
  hasRecordings: state.recording.actions.length > 0,
  isPlaying: state.recording.isPlaying,
})
const mapDispatchToProps = {
  startRecordingClicked,
  stopRecording,
  playRecordingClicked,
}
export default connect(mapStateToProps, mapDispatchToProps)(Recording)
