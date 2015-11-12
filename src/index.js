// require("babel-polyfill");
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createHistory } from 'history'
import { Route, IndexRoute } from 'react-router'
// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools'
// React components for Redux DevTools
import { DevTools} from 'redux-devtools/lib/react'
import DiffMonitor from 'redux-devtools-diff-monitor'
import {
  createStore,
  compose,
  combineReducers
} from 'redux'

import {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter
} from 'redux-router'

// containers
import {
  App,
  Home
} from './containers/index'

// reducers
import counter from './reducers/counter'

const reducer = combineReducers({
  router: routerStateReducer,
  counter: counter
})

const store = compose(
  reduxReactRouter({ createHistory }),
  devTools()
)(createStore)(reducer)

  // console.log(app)
ReactDOM.render(
  <div>
    <Provider store={store}>
      <ReduxRouter>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
        </Route>
      </ReduxRouter>
    </Provider>
    <DevTools store={store} monitor={DiffMonitor} shortcut='ctrl+d'/>
  </div>,

  document.getElementById('content')
)