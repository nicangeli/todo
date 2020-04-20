import React from 'react'
import { connect } from 'react-redux'

import { startRecordingClicked } from './recordingSlice'

const Recording = ({ startRecordingClicked }) => (
  <button onClick={() => startRecordingClicked()}>Start Recording</button>
)

const mapDispatchToProps = {
  startRecordingClicked,
}
export default connect(null, mapDispatchToProps)(Recording)
