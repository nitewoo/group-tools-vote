import React from 'react'

// class Counter extends Component {
//   render() {
//     const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props
//     return (
//       <p>
//         Clicked: {counter} times
//         {' '}
//         <button onClick={increment}>+</button>
//         {' '}
//         <button onClick={decrement}>-</button>
//         {' '}
//         <button onClick={incrementIfOdd}>Increment if odd</button>
//         {' '}
//         <button onClick={() => incrementAsync()}>Increment async</button>
//       </p>
//     )
//   }
// }





class Counter extends React.Component {
  render() {
    const { increment } = this.props
    return (
      <div>
        <button onClick={increment}>+</button>
      </div>
    )
  }
}

// Counter.propTypes = {
//   increment: PropTypes.func.isRequired,
//   // incrementIfOdd: PropTypes.func.isRequired,
//   // incrementAsync: PropTypes.func.isRequired,
//   // decrement: PropTypes.func.isRequired,
//   // counter: PropTypes.number.isRequired
// }

export default Counter