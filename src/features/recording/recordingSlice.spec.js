import recordingReducer, { startRecording } from './recordingSlice'

describe('recording reducer', () => {
  it('should set the isRecording state to true when startRecording is dispatched', () => {
    const initialState = {
      isRecording: false,
    }
    const action = startRecording()
    const nextState = recordingReducer(initialState, action)

    expect(nextState).toEqual({
      isRecording: true,
    })
  })
})
