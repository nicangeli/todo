import React from 'react'
import { addTodo } from './todoSlice'
import { connect } from 'react-redux'

const AddToDo = ({ addTodo }) => {
  const [todo, setTodo] = React.useState('')
  const [description, setDescription] = React.useState('')

  return (
    <>
      <input
        type="text"
        value={todo}
        placeholder="what"
        onChange={(e) => setTodo(e.target.value)}
      />
      <textarea
        value={description}
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        data-testid="addTodo"
        onClick={() => addTodo({ name: todo, description })}
      >
        Add
      </button>
    </>
  )
}

const mapDispatchToProps = {
  addTodo,
}
export default connect(null, mapDispatchToProps)(AddToDo)
