import React from 'react'

import AddTodo from './features/todo/AddTodo'
import TodoList from './features/todo/TodoList'
import RecordingControls from './features/recording/RecordingControls'

const App = () => (
  <>
    <AddTodo />
    <TodoList />
    <RecordingControls />
  </>
)

export default App
