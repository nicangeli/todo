import React from 'react'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { startRecording, stopRecording, playRecording } from './recordingSlice'
import Recording from './Recording'

const mockStore = configureStore([thunk])

describe('Recording', () => {
  it('should dispatch startRecording when start recording button is clicked', () => {
    const store = mockStore({ todos: [], recording: { actions: [] } })

    const { queryByText, getByText } = render(
      <Provider store={store}>
        <Recording />
      </Provider>
    )

    userEvent.click(getByText('Start Recording'))

    expect(queryByText('Stop Recording')).toBeFalsy()

    const [action] = store.getActions()

    expect(action).toEqual(
      startRecording({
        stateAtStartOfRecording: {
          todos: [],
          recording: {
            actions: [],
          },
        },
      })
    )
  })
  it('should render and dispatch stopRecording when isRecording', () => {
    const store = mockStore({
      todos: [],
      recording: {
        isRecording: true,
        actions: [],
      },
    })

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Recording />
      </Provider>
    )

    userEvent.click(getByText('Stop Recording'))

    expect(queryByText('Start Recording')).toBeFalsy()

    const [action] = store.getActions()

    expect(action).toEqual(stopRecording())
  })
  it('should render Play Recording when there are actions stored to playback', () => {
    const store = mockStore({
      todos: [],
      recording: {
        isRecording: false,
        actions: [
          {
            id: '1',
            name: 'Name 1',
          },
        ],
        stateAtStartOfRecording: {
          todos: [],
        },
      },
    })

    const { getByText } = render(
      <Provider store={store}>
        <Recording />
      </Provider>
    )

    userEvent.click(getByText('Play Recording'))

    const [action] = store.getActions()

    expect(action).toEqual(playRecording())
  })
  it('should not render Play Recording when there no actions stored to playback', () => {
    const store = mockStore({
      todos: [],
      recording: {
        isRecording: false,
        actions: [],
        stateAtStartOfRecording: {
          todos: [],
        },
      },
    })

    const { queryByText } = render(
      <Provider store={store}>
        <Recording />
      </Provider>
    )

    expect(queryByText('Play Recording')).toBeFalsy()
  })
  it('should not render Play Recording when currently recording', () => {
    const store = mockStore({
      todos: [],
      recording: {
        isRecording: true,
        actions: [
          {
            id: '1',
            name: 'Name',
          },
        ],
        stateAtStartOfRecording: {
          todos: [],
        },
      },
    })

    const { queryByText } = render(
      <Provider store={store}>
        <Recording />
      </Provider>
    )

    expect(queryByText('Play Recording')).toBeFalsy()
  })
  it('should not render Play Recording when currently playing back recording', () => {
    const store = mockStore({
      todos: [],
      recording: {
        isRecording: false,
        isPlaying: true,
        actions: [
          {
            id: '1',
            name: 'Name',
          },
        ],
        stateAtStartOfRecording: {
          todos: [],
        },
      },
    })

    const { queryByText } = render(
      <Provider store={store}>
        <Recording />
      </Provider>
    )

    expect(queryByText('Play Recording')).toBeFalsy()
  })
})
