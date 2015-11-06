import React, { Component } from 'react'
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';

// components
// import CounterBtn from '../../components/CounterBtn'
// import CounterVal from '../../components/CounterVal'

// action creator
// import { increment } from '../../reducers/counter'

class About extends Component {

  render() {
    const { dispatch } = this.props;
      console.log(this.props)
    // console.log(dispatch);

    console.log(this.props)

    return (
      <div>
        <h1>hello, react</h1>
      </div>
    )
  }
}

// export default Home

function mapStateToProps(state) {
  return {
    count: state.counter.count
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     someAction: bindActionCreators(actionCreator, dispatch)
//   };
// }

export default connect(mapStateToProps)(About)