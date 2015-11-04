import React from 'react'

class CountView extends React.Component {
  render() {

    return (
      <h1>it is: {this.props.count}</h1>
    )
  }
}

export default CountView