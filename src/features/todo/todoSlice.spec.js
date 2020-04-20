import todoSlice, { addTodo } from './todoSlice'
import { v4 as uuid } from 'uuid'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'some-id'),
}))

const unmockedDate = Date

beforeEach(() => {
  global.Date.now = jest.fn(() => new Date('2020-05-19T10:20:30Z').getTime())
})

afterEach(() => {
  global.Date = unmockedDate
})

describe('addTodo', () => {
  it('should append a todo to the list when addTodo is dispatched', () => {
    const initialState = []
    const action = addTodo({ name: 'Todo', description: 'My description' })
    const nextState = todoSlice(initialState, action)
    expect(nextState).toEqual([
      {
        name: 'Todo',
        description: 'My description',
        createdAt: expect.any(String),
        id: expect.any(String),
        completed: false,
      },
    ])
  })
  it('should generate a unique uuid when addTodo is dispatched', () => {
    uuid.mockReturnValueOnce('generated-id')
    const initialState = []
    const action = addTodo({ name: 'Todo', description: 'My description' })
    const [{ id }] = todoSlice(initialState, action)

    expect(id).toEqual('generated-id')
  })
  it('should generate the createdAt date for ad', () => {
    const today = '2020-05-20T10:20:30Z'
    global.Date.now = () => new Date(today).getTime()
    const initialState = []
    const action = addTodo({ name: 'Todo', description: 'My description' })
    const [{ createdAt }] = todoSlice(initialState, action)

    expect(new Date(createdAt).getTime()).toEqual(new Date(today).getTime())
  })
})
