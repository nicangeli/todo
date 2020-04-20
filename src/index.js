import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'

const App = () => 'Hello World'

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
)
