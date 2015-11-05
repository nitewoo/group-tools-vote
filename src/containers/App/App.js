import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';

class App extends Component {

  render() {
    const { dispatch } = this.props;

    // to transfer props to children
    // use {childrenElement} replace {this.props.children}
    // let childrenElement = React.cloneElement(this.props.children, {incre: this.props.incre});

    return (
      <div>
        <h1>hello, redux</h1>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return Object.assign({}, state)
}

// function mapDispatchToProps(dispatch) {
//   return {
//     someAction: bindActionCreators(actionCreator, dispatch)
//   };
// }

// to-do: use es7 decorators instead
export default connect(mapStateToProps)(App)
