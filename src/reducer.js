
const initialState = {
  count: 0
}

function counter(state = initialState, action = {}) {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      const { count } = state
      return {
        count: state.count + 1
      }
    default:
      return state
  }
}

export default counter
