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
  },
})

const { actions, reducer } = todoSlice

const { addTodo } = actions

export { addTodo }

export default reducer
