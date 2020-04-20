import todoSlice, { addTodo } from './todoSlice'

describe('reduce', () => {
  it('should append a todo to the list when addTodo is dispatched', () => {
    const initialState = []
    const action = addTodo({ name: 'Todo', description: 'My description' })
    const nextState = todoSlice(initialState, action)
    expect(nextState).toEqual([
      {
        name: 'Todo',
        description: 'My description',
      },
    ])
  })
})
