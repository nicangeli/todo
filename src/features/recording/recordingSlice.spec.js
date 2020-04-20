import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { addTodo, updateTodo, deleteTodo } from '../todo/todoSlice'
import recordingReducer, {
  startRecording,
  startRecordingClicked,
  stopRecording,
} from './recordingSlice'

const mockStore = configureMockStore([thunk])

describe('recording reducer', () => {
  describe('startRecording', () => {
    it('should set the isRecording and stateAtStartOfRecording when startRecording is dispatched', () => {
      const initialState = {
        isRecording: false,
        stateAtStartOfRecording: {},
      }
      const stateAtStartOfRecording = {
        todos: [{ id: '1' }],
      }
      const action = startRecording({ stateAtStartOfRecording })
      const nextState = recordingReducer(initialState, action)

      expect(nextState).toEqual({
        isRecording: true,
        stateAtStartOfRecording,
      })
    })
  })
  describe('stopRecording', () => {
    it('should set isRecording to false', () => {
      const initialState = {
        isRecording: true,
      }
      const action = stopRecording()
      const nextState = recordingReducer(initialState, action)

      expect(nextState).toEqual({
        isRecording: false,
      })
    })
  })
  describe('addTodo/updateTodo/deleteTodo', () => {
    it('should track the actions dispatched', () => {
      const initialState = {
        isRecording: true,
        actions: [],
      }
      const addTodoAction = addTodo({
        name: 'todo1',
        description: 'description1',
      })
      const stateAfterAdd = recordingReducer(initialState, addTodoAction)

      expect(stateAfterAdd).toEqual({
        isRecording: true,
        actions: [addTodoAction],
      })

      const updateTodoAction = updateTodo({
        id: addTodoAction.payload.id,
        completed: true,
      })

      const stateAfterUpdate = recordingReducer(stateAfterAdd, updateTodoAction)

      expect(stateAfterUpdate).toEqual({
        isRecording: true,
        actions: [addTodoAction, updateTodoAction],
      })

      const deleteTodoAction = deleteTodo({
        id: addTodoAction.payload.id,
      })

      const stateAfterDelete = recordingReducer(
        stateAfterUpdate,
        deleteTodoAction
      )

      expect(stateAfterDelete).toEqual({
        isRecording: true,
        actions: [addTodoAction, updateTodoAction, deleteTodoAction],
      })
    })
    it('should not track actions dispatched if not recording', () => {
      const initialState = {
        isRecording: false,
        actions: [],
      }
      const addTodoAction = addTodo({
        name: 'Name',
        description: 'Description',
      })
      const nextState = recordingReducer(initialState, addTodoAction)

      expect(nextState).toEqual(initialState)
    })
  })
})

describe('thunks', () => {
  describe('startRecordingClicked', () => {
    it('should dispatch startRecording with state as stateAtStartOfRecording', () => {
      const initialState = {
        todos: [],
        recording: {},
      }
      const store = mockStore(initialState)

      store.dispatch(startRecordingClicked())

      const dispatchedActions = store.getActions()

      expect(dispatchedActions).toEqual([
        startRecording({ stateAtStartOfRecording: initialState }),
      ])
    })
  })
})
