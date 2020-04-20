import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        name: action.payload.name,
        description: action.payload.description,
      })
    },
  },
})

const { actions, reducer } = todoSlice

const { addTodo } = actions

export { addTodo }

export default reducer
