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
}) => (
  <>
    {isRecording ? (
      <button onClick={() => stopRecording()}>Stop Recording</button>
    ) : (
      <button onClick={() => startRecordingClicked()}>Start Recording</button>
    )}
    {hasRecordings && (
      <button onClick={() => playRecordingClicked()}>Play Recording</button>
    )}
  </>
)

const mapStateToProps = (state) => ({
  isRecording: state.recording.isRecording,
  hasRecordings: state.recording.actions.length > 0,
})
const mapDispatchToProps = {
  startRecordingClicked,
  stopRecording,
  playRecordingClicked,
}
export default connect(mapStateToProps, mapDispatchToProps)(Recording)
