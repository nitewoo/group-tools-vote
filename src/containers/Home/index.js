import React, { Component } from 'react'
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';

// components
import CounterBtn from '../../components/CounterBtn'
import CounterVal from '../../components/CounterVal'

// action creator
import { increment } from '../../reducers/counter'

class Home extends Component {

  render() {
    const { dispatch, counter } = this.props;
      console.log(this.props)
    function doIncrement () {
      dispatch({type: 'INCREMENT_COUNTER'});
    }
    // console.log(dispatch);

    console.log(this.props)

    return (
      <div>
        <h1>it is home</h1>
        <CounterBtn increment={doIncrement} />
        <CounterVal count={this.props.count} />
      </div>
    )
  }
}

// export default Home

function mapStateToProps(state) {
  console.log(state);
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