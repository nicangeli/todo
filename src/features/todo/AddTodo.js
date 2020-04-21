import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { addTodo } from './todoSlice'

import {
  Title,
  SubmitButton,
  FormInput,
  FormTextArea,
} from '../../components/atoms'

const FormElement = styled.div`
  margin-bottom: 20px;
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
