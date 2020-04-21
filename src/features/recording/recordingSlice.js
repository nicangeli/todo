import { createSlice } from '@reduxjs/toolkit'

import { addTodo, updateTodo, deleteTodo, resetTodos } from '../todo/todoSlice'

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
    stopRecording: (state) => {
      state.isRecording = false
    },
    playRecording: (state) => {
      state.isPlaying = true
    },
    clearRecording: (state) => {
      state.actions = []
      state.stateAtStartOfRecording = {}
    },
  },
  extraReducers: {
    [addTodo]: trackActions,
    [updateTodo]: trackActions,
    [deleteTodo]: trackActions,
  },
})

const { actions, reducer } = recordingSlice

const { startRecording, stopRecording, playRecording, clearRecording } = actions

const startRecordingClicked = () => (dispatch, getState) => {
  const stateAtStartOfRecording = getState()
  dispatch(startRecording({ stateAtStartOfRecording }))
}

const playRecordingClicked = () => (dispatch, getState) => {
  const { recording } = getState()
  const { actions: actionsToDispatch, stateAtStartOfRecording } = recording

  dispatch(playRecording())
  dispatch(resetTodos({ todos: stateAtStartOfRecording.todos }))

  actionsToDispatch.forEach((action, i) => {
    setTimeout(() => {
      dispatch(action)
    }, (i + 1) * 1000)
  })
}

export {
  startRecording,
  startRecordingClicked,
  stopRecording,
  playRecording,
  playRecordingClicked,
  clearRecording,
}

export default reducer
