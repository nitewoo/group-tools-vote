import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Counter from './counter'
import CountView from './countView'
import { increment } from './actionCreater'

class App extends Component {


  render() {
    const { dispatch } = this.props;

    function doIncrement () {
      // console.log(state)
      dispatch(increment());
    }
   
    return (
      <div>
        <h1>Hello</h1>
        <Counter increment={doIncrement} />
        <CountView count={this.props.count}/>
      </div>
    )
  }
}

function select (state) {
  return {
    count: state.count
  }
}

export default connect(select)(App)