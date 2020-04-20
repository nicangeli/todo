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
    },
  },
})

const { actions, reducer } = recordingSlice

const { startRecording } = actions

export { startRecording }

export default reducer
