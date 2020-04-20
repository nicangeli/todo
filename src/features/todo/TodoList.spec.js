import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { deleteTodo, updateTodo } from './todoSlice'
import TodoList from './TodoList'

const mockStore = configureStore()

describe('TodoList', () => {
  it('should render each todo in state', () => {
    const todos = [
      {
        id: '1',
        name: 'Name 1',
      },
      {
        id: '2',
        name: 'Name 2',
      },
    ]
    const store = mockStore({ todos })

    const { getByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )

    expect(getByText(todos[0].name)).toBeTruthy()
    expect(getByText(todos[1].name)).toBeTruthy()
  })
  it('should dispatch a deleteTodo action when the delete button is clicked', () => {
    const todos = [
      {
        id: '1',
        name: 'Name 1',
      },
      {
        id: '2',
        name: 'Name 2',
      },
    ]
    const store = mockStore({ todos })

    const { getAllByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    const deleteButtons = getAllByText('Delete')

    userEvent.click(deleteButtons[1])

    const [action] = store.getActions()

    expect(action).toEqual({
      payload: {
        id: '2',
      },
      type: deleteTodo.toString(),
    })
  })
  it('should dispatch a updateTodo action when the checkbox is toggled', () => {
    const todos = [
      {
        id: '1',
        name: 'Name 1',
        completed: false,
      },
      {
        id: '2',
        name: 'Name 2',
        completed: true,
      },
    ]
    const store = mockStore({ todos })

    const { getAllByRole } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    const checkboxes = getAllByRole('checkbox')

    userEvent.click(checkboxes[0])
    userEvent.click(checkboxes[1])

    const [action1, action2] = store.getActions()

    expect(action1).toEqual({
      payload: {
        id: '1',
        completed: true,
      },
      type: updateTodo.toString(),
    })
    expect(action2).toEqual({
      payload: {
        id: '2',
        completed: false,
      },
      type: updateTodo.toString(),
    })
  })
})
