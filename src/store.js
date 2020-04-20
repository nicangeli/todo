import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import todos from './features/todo/todoSlice'

const rootReducer = combineReducers({
  todos,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
