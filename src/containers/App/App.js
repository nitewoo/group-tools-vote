import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

class App extends Component {

  render() {
    // static propTypes = {
    //   children: PropTypes.node
    // }
    return (
      <div>
        <h1>hello, redux</h1>
        {this.props.children}
      </div>
    )
  }
}

function select(state) {
  return {

  }
}

export default connect(select)(App)