import React from 'react'
import { connect } from 'react-redux'

import { deleteTodo, updateTodo } from './todoSlice'

const TodoList = ({ todos, deleteTodo, updateTodo }) => (
  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() =>
            updateTodo({ id: todo.id, completed: !todo.completed })
          }
        />
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
  updateTodo,
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
