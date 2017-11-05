import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App, {rootReducer, initialState} from './components/App'

const enhancer = process.env.NODE_ENV !== 'production' ?
                 (
                   window.__REDUX_DEVTOOLS_EXTENSION__ &&
                   window.__REDUX_DEVTOOLS_EXTENSION__()
                 ) : undefined

const store = createStore(
  rootReducer,
  initialState,
  enhancer
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
