import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { addTodo, updateTodo, deleteTodo, resetTodos } from '../todo/todoSlice'

import recordingReducer, {
  startRecording,
  startRecordingClicked,
  stopRecording,
  playRecording,
  playRecordingClicked,
  clearRecording,
  playRecordingFinished,
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
  describe('playRecording', () => {
    it('should set isPlaying when playRecording is dispatched', () => {
      const initialState = {
        isPlaying: false,
      }
      const playRecordingAction = playRecording()
      const nextState = recordingReducer(initialState, playRecordingAction)

      expect(nextState).toEqual({
        isPlaying: true,
      })
    })
  })
  describe('clearRecording', () => {
    it('should set actions and stateAtStartOfRecording back to initial when clearRecording is dispatched', () => {
      const initialState = {
        actions: [addTodo({ name: 'Todo', description: 'To clear' })],
        stateAtStartOfRecording: {
          todos: [],
        },
      }
      const clearRecordingAction = clearRecording()
      const nextState = recordingReducer(initialState, clearRecordingAction)

      expect(nextState).toEqual({
        actions: [],
        stateAtStartOfRecording: {},
      })
    })
  })
  describe('playRecordingFinished', () => {
    it('should set isPlaying to false when playRecordingFinished is dispatched', () => {
      const initialState = {
        isPlaying: true,
      }
      const playRecordingFinishedAction = playRecordingFinished()
      const nextState = recordingReducer(
        initialState,
        playRecordingFinishedAction
      )

      expect(nextState).toEqual({
        isPlaying: false,
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
  describe('playRecordingClicked', () => {
    it('should dispatch ', () => {
      jest.useFakeTimers()

      const stateAtStartOfRecording = {
        todos: [
          {
            id: '1',
            name: 'Name 1',
            completed: false,
          },
        ],
      }

      const addTodoAction = addTodo({ name: 'Name 2' })
      const updateTodoAction = updateTodo({ id: '1', completed: true })
      const deleteTodoAction = deleteTodo({ id: '1' })

      const initialState = {
        recording: {
          isRecording: false,
          isPlaying: false,
          stateAtStartOfRecording,
          actions: [addTodoAction, updateTodoAction, deleteTodoAction],
        },
        todos: stateAtStartOfRecording.todos,
      }
      const store = mockStore(initialState)

      store.dispatch(playRecordingClicked())

      jest.runAllTimers()

      const dispatchedActions = store.getActions()

      expect(dispatchedActions).toEqual([
        playRecording(),
        resetTodos({ todos: stateAtStartOfRecording.todos }),
        addTodoAction,
        updateTodoAction,
        deleteTodoAction,
        playRecordingFinished(),
      ])
    })
  })
})
