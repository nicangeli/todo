import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { deleteTodo, updateTodo } from './todoSlice'

import { CancelButton } from '../../components/atoms'

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`

const ListItem = styled.li`
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  margin-bottom: 20px;

  input {
    margin-right: 10px;
  }

  ${CancelButton} {
    margin-left: 10px;
  }
`

const TodoList = ({ todos, deleteTodo, updateTodo }) => (
  <List>
    {todos.map((todo) => (
      <ListItem key={todo.id}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() =>
            updateTodo({ id: todo.id, completed: !todo.completed })
          }
        />
        {todo.name}
        <CancelButton onClick={() => deleteTodo({ id: todo.id })}>
          Delete
        </CancelButton>
      </ListItem>
    ))}
  </List>
)

const mapStateToProps = (state) => ({
  todos: state.todos,
})
const mapDispatchToProps = {
  deleteTodo,
  updateTodo,
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
