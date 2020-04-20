import React from 'react'
import { connect } from 'react-redux'

import { deleteTodo } from './todoSlice'

const TodoList = ({ todos, deleteTodo }) => (
  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        {todo.name}
        <button onClick={() => deleteTodo({ id: todo.id })}>Delete</button>
      </li>
    ))}
  </ul>
)

const mapStateToProps = (state) => ({
  todos: state.todos,
})
const mapDispatchToProps = {
  deleteTodo,
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
