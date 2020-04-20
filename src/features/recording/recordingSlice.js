import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isRecording: false,
  isPlaying: false,
  stateAtStartOfRecording: {},
  actions: [],
}

const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {
    startRecording: (state, action) => {
      state.isRecording = true
      state.stateAtStartOfRecording = action.payload.stateAtStartOfRecording
    },
  },
})

const { actions, reducer } = recordingSlice

const { startRecording } = actions

const startRecordingClicked = () => (dispatch, getState) => {
  const stateAtStartOfRecording = getState()
  dispatch(startRecording({ stateAtStartOfRecording }))
}

export { startRecording, startRecordingClicked }

export default reducer
