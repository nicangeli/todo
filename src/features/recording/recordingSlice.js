import { createSlice } from '@reduxjs/toolkit'

import { addTodo, updateTodo, deleteTodo } from '../todo/todoSlice'

const initialState = {
  isRecording: false,
  isPlaying: false,
  stateAtStartOfRecording: {},
  actions: [],
}

const trackActions = (state, action) => {
  if (state.isRecording) {
    state.actions.push(action)
  }
}

const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {
    startRecording: (state, action) => {
      state.isRecording = true
      state.stateAtStartOfRecording = action.payload.stateAtStartOfRecording
    },
    stopRecording: (state, action) => {
      state.isRecording = false
    },
  },
  extraReducers: {
    [addTodo]: trackActions,
    [updateTodo]: trackActions,
    [deleteTodo]: trackActions,
  },
})

const { actions, reducer } = recordingSlice

const { startRecording, stopRecording } = actions

const startRecordingClicked = () => (dispatch, getState) => {
  const stateAtStartOfRecording = getState()
  dispatch(startRecording({ stateAtStartOfRecording }))
}

export { startRecording, startRecordingClicked, stopRecording }

export default reducer