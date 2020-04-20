import todoSlice, {
  addTodo,
  updateTodo,
  deleteTodo,
  resetTodos,
} from './todoSlice'
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

describe('updateTodo', () => {
  it('should mark todo as completed when updateTodo is dispatched with completed true', () => {
    const initialState = [
      {
        id: '1',
        completed: false,
      },
    ]
    const action = updateTodo({ id: '1', completed: true })
    const nextState = todoSlice(initialState, action)

    expect(nextState).toEqual([
      {
        id: '1',
        completed: true,
      },
    ])
  })
  it('should mark todo as incomplete when updateTodo is dispatched with completed false', () => {
    const initialState = [
      {
        id: '1',
        completed: false,
      },
      {
        id: '2',
        completed: true,
      },
    ]
    const action = updateTodo({ id: '2', completed: false })
    const nextState = todoSlice(initialState, action)

    expect(nextState).toEqual([
      {
        id: '1',
        completed: false,
      },
      {
        id: '2',
        completed: false,
      },
    ])
  })
  it('should do nothing if id is not found', () => {
    const initialState = []
    const action = updateTodo({ id: '1', completed: true })
    const nextState = todoSlice(initialState, action)

    expect(nextState).toEqual(initialState)
  })
})

describe('deleteTodo', () => {
  it('should remove todo if id is found', () => {
    const initialState = [
      {
        id: '1',
        name: 'Todo to delete',
      },
    ]
    const action = deleteTodo({ id: '1' })
    const nextState = todoSlice(initialState, action)

    expect(nextState).toEqual([])
  })
  it('should do nothing if id is not found', () => {
    const initialState = []
    const action = deleteTodo({ id: '2' })
    const nextState = todoSlice(initialState, action)

    expect(nextState).toEqual(initialState)
  })
})

describe('resetTodos', () => {
  it('should reset todos to dispatched todos', () => {
    const initialState = [
      {
        id: '1',
        name: 'Todo',
      },
      {
        id: '2',
        name: 'Todo',
      },
    ]
    const expectedTodos = [
      {
        id: '3',
        name: 'Todo',
      },
    ]
    const action = resetTodos({ todos: expectedTodos })
    const nextState = todoSlice(initialState, action)

    expect(nextState).toEqual(expectedTodos)
  })
})
