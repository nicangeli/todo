import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import recordingReducer, {
  startRecording,
  startRecordingClicked,
} from './recordingSlice'

const mockStore = configureMockStore([thunk])

describe('recording reducer', () => {
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
