import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import todos from './features/todo/todoSlice'
import recording from './features/recording/recordingSlice'

const rootReducer = combineReducers({
  todos,
  recording,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
