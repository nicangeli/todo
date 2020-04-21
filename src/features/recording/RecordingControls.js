import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  startRecordingClicked,
  stopRecording,
  playRecordingClicked,
  clearRecording,
} from './recordingSlice'

import { SubmitButton, ButtonGroup } from '../../components/atoms'

const RecordingControls = ({
  isRecording,
  startRecordingClicked,
  stopRecording,
  playRecordingClicked,
  hasRecordings,
  isPlaying,
  clearRecording,
}) => {
  const canPlayRecording = hasRecordings && !isRecording && !isPlaying
  return (
    <ButtonGroup>
      {isRecording ? (
        <SubmitButton onClick={() => stopRecording()}>
          Stop Recording
        </SubmitButton>
      ) : (
        <SubmitButton onClick={() => startRecordingClicked()}>
          Start Recording
        </SubmitButton>
      )}
      {canPlayRecording && (
        <>
          <SubmitButton onClick={() => playRecordingClicked()}>
            Play Recording
          </SubmitButton>
          <SubmitButton onClick={() => clearRecording()}>
            Clear Recording
          </SubmitButton>
        </>
      )}
    </ButtonGroup>
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
  clearRecording,
}
export default connect(mapStateToProps, mapDispatchToProps)(RecordingControls)
