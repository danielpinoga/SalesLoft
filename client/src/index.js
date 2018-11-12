import './global.css'

import React from "react"
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './components/App'
import Reducers from './reducers/CombinedReducers'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const middlewares = [thunkMiddleware, routerMiddleware(history)]
let store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
)

window.store = store

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)