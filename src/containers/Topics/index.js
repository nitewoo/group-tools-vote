import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux';
import { LinkedStateMixin } from 'react-addons-linked-state-mixin'

// components
import {
  TextField,
  RaisedButton
} from 'material-ui'

import TopicList from '../../components/TopicList/List'

// action creator
import { searchTopic, fetchTopicsIfNeeded } from '../../reducers/topics'


class Topics extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)

    // it is react component local state, not redux store(state-tree)
    // maintain it here is just for tring react two-way binding using `valueLinl`,
    // it may be convenient in some case.
    // to-find-out: it should not be?
    this.state = {
      sInput: null
    }
  }

  searchInputValueLink() {
    return {
      value: this.state.sInput,
      requestChange: this.handleSearchInputChange
    }
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
        <div className={sc['search-input']}>
          <TextField
            fullWidth={true}
            floatingLabelText="Search"
            valueLink={this.searchInputValueLink()} />
        </div>
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
    const { dispatch, topics } = this.props

    dispatch(searchTopic(this.state.sInput))
    dispatch(fetchTopicsIfNeeded(this.state.sInput))
  }

  handleSearchInputChange(newValue) {
    this.setState({
      sInput: newValue
    })
  }
}

function mapStateToProps(state) {
  const { topics } = state

  return topics
}

// function mapDispatchToProps(dispatch) {
//   return {
//     someAction: bindActionCreators(actionCreator, dispatch)
//   };
// }

export default connect(mapStateToProps)(Topics)