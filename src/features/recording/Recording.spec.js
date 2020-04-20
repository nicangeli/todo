import React from 'react'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { startRecording } from './recordingSlice'
import Recording from './Recording'

const mockStore = configureStore([thunk])

describe('Recording', () => {
  it('should dispatch startRecording when start recording button is clicked', () => {
    const store = mockStore({ todos: [], recording: {} })

    const { getByText } = render(
      <Provider store={store}>
        <Recording />
      </Provider>
    )

    userEvent.click(getByText('Start Recording'))

    const [action] = store.getActions()

    expect(action).toEqual(
      startRecording({
        stateAtStartOfRecording: {
          todos: [],
          recording: {},
        },
      })
    )
  })
})
