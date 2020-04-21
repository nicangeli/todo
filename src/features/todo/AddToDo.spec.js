import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { addTodo } from './todoSlice'
import AddTodo from './AddTodo'

const mockStore = configureStore()

describe('AddTodo', () => {
  it('should dispatch a addTodo action with name and description', () => {
    const store = mockStore({ todos: [] })

    const { getByPlaceholderText, getByRole } = render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    )
    userEvent.type(getByPlaceholderText('add todo'), 'test name')
    userEvent.type(getByPlaceholderText('description'), 'test description')
    userEvent.click(getByRole('button'))

    const [action] = store.getActions()

    expect(action).toEqual({
      payload: {
        id: expect.any(String),
        createdAt: expect.any(String),
        name: 'test name',
        description: 'test description',
        completed: false,
      },
      type: addTodo.toString(),
    })
  })
})
