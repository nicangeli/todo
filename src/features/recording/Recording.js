import React from 'react'
import { connect } from 'react-redux'

import { startRecordingClicked, stopRecording } from './recordingSlice'

const Recording = ({ isRecording, startRecordingClicked, stopRecording }) => (
  <>
    {isRecording ? (
      <button onClick={() => stopRecording()}>Stop Recording</button>
    ) : (
      <button onClick={() => startRecordingClicked()}>Start Recording</button>
    )}
  </>
)

const mapStateToProps = (state) => ({
  isRecording: state.recording.isRecording,
})
const mapDispatchToProps = {
  startRecordingClicked,
  stopRecording,
}
export default connect(mapStateToProps, mapDispatchToProps)(Recording)
