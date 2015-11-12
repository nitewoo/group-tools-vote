import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux';


// components
import {
  TextField,
  FlatButton
} from 'material-ui'

import TopicList from '../../components/TopicList/List'

// action creator
import { increment } from '../../reducers/counter'


class Home extends Component {

  render() {
    const sc = this.style.locals

    const {
      dispatch,
      counter
    } = this.props

    const topicList = [{
      id: '123',
      title: 'topic 1',
      date: '2015-11-11',
      description: 'blah blah balh topic 1111'
    }, {
      id: '333',
      title: 'topic 2',
      date: '2015-10-10',
      description: 'blah blah balh topic 222222222222'
    }]

    function doIncrement () {
      dispatch({type: 'INCREMENT_COUNTER'})
    }

    return (
      <div>
        <TextField
          className={sc['search-input']}
          fullWidth={true}
          floatingLabelText="Search" />
        <TopicList list={topicList}/>
      </div>
    )
  }

  componentWillMount() {
    // load module style
    this.style = require('./style.scss').ref()
  }

  componentWillUnmount() {
    // unload module style
    this.style.unref()
  }
}

function mapStateToProps(state) {
  // console.log(state);
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