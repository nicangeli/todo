import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import todos from './features/todo/todoSlice'
import recording from './features/recording/recordingSlice'

const rootReducer = combineReducers({
  todos,
  recording,
})

const loadStateFromStorage = () => {
  const state = localStorage.getItem('todoState')
  if (state) {
    return JSON.parse(state)
  }
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadStateFromStorage(),
})

store.subscribe(() => {
  const state = store.getState()
  const serialized = JSON.stringify(state)
  localStorage.setItem('todoState', serialized)
})

export default store
