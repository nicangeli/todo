import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: ({ name, description }) => ({
        payload: {
          id: uuid(),
          createdAt: new Date(Date.now()).toISOString(),
          name,
          description,
          completed: false,
        },
      }),
    },
    updateTodo: (state, action) => {
      const todo = state.find(({ id }) => id === action.payload.id)

      if (todo) {
        todo.completed = action.payload.completed
      }
    },
  },
})

const { actions, reducer } = todoSlice

const { addTodo, updateTodo } = actions

export { addTodo, updateTodo }

export default reducer
