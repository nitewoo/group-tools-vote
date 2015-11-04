import React from 'react';
import ReactDOM from 'react-dom';
// import App from './app'
// import { increment } from './actionCreater'
// import { createStore } from 'redux'
// import counterReducer from './reducer'
import { Provider } from 'react-redux'


// let store = createStore(counterReducer)

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('content')
// )

import {
  createStore,
  compose,
  combineReducers
} from 'redux';

import {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter
} from 'redux-router';

import { Route, IndexRoute } from 'react-router';

import { createHistory } from 'history';

import App from './containers/App/App'
import Home from './containers/Home/Home'

const reducer = combineReducers({
  router: routerStateReducer
})

const store = compose(
  reduxReactRouter({ createHistory })
)(createStore)(reducer)

ReactDOM.render(
  <Provider store={store}>
    <ReduxRouter>
      <Route path="/" component={App}>
        <Route path="home" component={Home}/>
      </Route>
    </ReduxRouter>
  </Provider>,

  document.getElementById('content')
)