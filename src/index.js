// import React from 'react'
// var ReactDom = require('react-dom')

// var App = React.createClass({
//   render: function() {
//     return (
//       <div> hey </div>
//     );
//   }
// })

// ReactDOM.render(<App />, document.getElementById('content'))


// import React from 'react'
// import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import App from './app'

// let store = createStore(counter)


// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('content')
// )

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import { increment } from './actionCreater'
import { createStore } from 'redux'
import counterReducer from './reducer'
import { Provider } from 'react-redux'

let store = createStore(counterReducer)
// function aa () {
//   store.dispatch(increment());
// }

// ReactDOM.render(<Counter increment={increment}/>, document.getElementById('content'));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)