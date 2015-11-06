import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div>
        <h1>it is home{this.state.username}</h1>
      </div>
    )
  }
}

export default Home