import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

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
