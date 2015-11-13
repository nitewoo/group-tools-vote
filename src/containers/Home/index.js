import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux';


// components
import {
  TextField,
  RaisedButton
} from 'material-ui'

import TopicList from '../../components/TopicList/List'

// action creator
import { searchTopic, fetchTopicsIfNeeded } from '../../reducers/topics'


class Home extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  render() {
    const sc = this.style.locals

    const {
      dispatch,
      items,
      isFetching
    } = this.props

    return (
      <div>
        <TextField
          className={sc['search-input']}
          fullWidth={true}
          floatingLabelText="Search" />
        <RaisedButton label="Search" secondary={true} onClick={this.handleRefreshClick} />
        <TopicList list={items || []}/>
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

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch, topics, searchInput } = this.props;
    dispatch(searchTopic(searchInput))
    dispatch(fetchTopicsIfNeeded(searchInput))
  }
}

function mapStateToProps(state) {
  const { topics } = state
  // console.log(state)
  const {
    isFetching,
    lastUpdated,
    items
  } = topics

  return {
    items,
    isFetching,
    lastUpdated
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     someAction: bindActionCreators(actionCreator, dispatch)
//   };
// }

export default connect(mapStateToProps)(Home)