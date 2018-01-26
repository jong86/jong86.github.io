import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './redux/reducers'
import App from './App'
// import registerServiceWorker from './registerServiceWorker';
require('./index.css')

let store = createStore(reducers)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)