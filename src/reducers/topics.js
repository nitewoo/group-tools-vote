import { combineReducers } from 'redux'
import fetch from 'isomorphic-fetch'

// -------- action type constant ----------------------
export const SEARCH_TOPICS = 'SEARCH_TOPICS'
export const REQUEST_TOPICS = 'REQUEST_TOPICS'
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS'

// -------- action creater ----------------------

// user action `do search`
export function searchTopic(input) {
  return {
    type: SEARCH_TOPICS,
    input: input
  }
}

function requestTopics(input) {
  return {
    type: REQUEST_TOPICS,
    input: input
  }
}

function receiveTopics(response) {
  return {
    type: RECEIVE_TOPICS,
    items: response.data,
    receiveAt: Date.now()
  }
}

function fetchTopics(input) {
  return function (dispatch) {
    dispatch(requestTopics(input))

    return fetch('http://localhost:7070/api/getTopic')
      .then(response => response.json())
      .then(json => {
        dispatch(receiveTopics(json))
      })
  }
}

function shouldFetchTopic(state, input) {
  console.log('state: ', state)
  const topics = state.topics;
  if (!topics) {
    return true
  } else if (topics.isFetching) {
    return false
  } else {
    return topics.didInvalidate
  }
}

export function fetchTopicsIfNeeded(input) {
  return (dispatch, getState) => {
    if (shouldFetchTopic(getState(), input)) {
      return dispatch(fetchTopics(input))
    }
  }
}

// -------- initial state ----------------------
const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}

// -------- reducer ----------------------
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case SEARCH_TOPICS:
      return Object.assign({}, state, {
        didInvalidate: true
      })

    case REQUEST_TOPICS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })

    case RECEIVE_TOPICS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        lastUpdated: action.receiveAt
      })

    default:
      return state
  }
}