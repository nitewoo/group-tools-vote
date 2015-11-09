import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux';

// components
import CounterBtn from '../../components/CounterBtn'
import CounterVal from '../../components/CounterVal'

// action creator
import { increment } from '../../reducers/counter'


class Home extends Component {

  render() {
    const sc = this.style.locals

    const {
      dispatch,
      counter
    } = this.props

    function doIncrement () {
      dispatch({type: 'INCREMENT_COUNTER'})
    }

    return (
      <div>
        <h1 className={sc.title}>it is home</h1>
        <CounterBtn increment={doIncrement} />
        <CounterVal count={this.props.count} />
      </div>
    )
  }

  componentWillMount() {
    // load module style
    this.style = require('./style.scss').ref()
  }

  componentWillUnmount() {
    // unload module style
    this.style.unref()
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    count: state.counter.count
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     someAction: bindActionCreators(actionCreator, dispatch)
//   };
// }

export default connect(mapStateToProps)(Home)