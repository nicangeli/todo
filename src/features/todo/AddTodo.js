import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { addTodo } from './todoSlice'

const Title = styled.h1`
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
`

const SubmitButton = styled.button`
  padding: 10px 30px;
  background: #f7ab1b;
  color: white;
  border: none;
  border-radius: 10px;
  text-transform: uppercase;
  cursor: pointer;
`

const FormElement = styled.div`
  margin-bottom: 20px;
`

const FormInput = styled.input`
  padding: 10px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  min-width: 300px;
`

const FormTextArea = styled.textarea`
  padding: 10px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  width: 50%;
  min-width: 300px;
`

const AddToDo = ({ addTodo }) => {
  const [todo, setTodo] = React.useState('')
  const [description, setDescription] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    addTodo({ name: todo, description })

    setTodo('')
    setDescription('')
  }

  return (
    <>
      <Title>Add Todo:</Title>
      <form onSubmit={handleSubmit}>
        <FormElement>
          <FormInput
            type="text"
            value={todo}
            placeholder="add todo"
            onChange={(e) => setTodo(e.target.value)}
          />
        </FormElement>

        <FormElement>
          <FormTextArea
            value={description}
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormElement>

        <SubmitButton data-testid="addTodo" type="submit">
          Add
        </SubmitButton>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  addTodo,
}
export default connect(null, mapDispatchToProps)(AddToDo)
