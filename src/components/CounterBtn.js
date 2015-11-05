import React from 'react'

class CounterBtn extends React.Component {
  render() {
    const { increment } = this.props
    return (
      <div>
        <button onClick={increment}>+</button>
      </div>
    )
  }
}

export default CounterBtn