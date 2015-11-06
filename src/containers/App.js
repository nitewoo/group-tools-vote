import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
import {
  pushState
} from 'redux-router'

import {
  AppBar,
  LeftNav,
  IconButton,
  IconMenu,
  FlatButton,
  Avatar,
  FontIcon
} from 'material-ui'
import {
  NavigationMenu,
  NavigationClose,
  NavigationMoreVert,
} from 'material-ui/lib/svg-icons'

// if require with 'material-ui' batch it will:
// Warning: Failed propType: Required prop `index` was not specified in `MenuItem`. Check the render method of `App`.
// reference: https://github.com/callemall/material-ui/issues/1346
const MenuItem = require('material-ui/lib/menus/menu-item');

// Some components use react-tap-event-plugin to listen for touch events.
// This dependency is temporary and will go away once react v1.0 is released.
// Until then, be sure to inject this plugin at the start of your app.
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class App extends Component {
  render() {
    const { dispatch } = this.props;

    const menuItems = [
      { route: 'home', text: 'go home' },
      { route: 'about', text: 'go about' }
    ];

    const _toggleLeftNav = () => {
      this.refs.leftNav.toggle();
    }

    const _onLeftNavChange = (e, key, payload) => {
      dispatch(pushState(null, payload.route));
      // this.props.history.pushState(null, payload.route);
    }

    // to transfer props to children
    // use {childrenElement} replace {this.props.children}
    // let childrenElement = React.cloneElement(this.props.children, {incre: this.props.incre});
    return (
      <div>
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems} onChange={_onLeftNavChange}/>
        <AppBar
          title="Vote"
          iconElementLeft={
            <IconButton
              onClick={_toggleLeftNav}
            >
              <NavigationMenu />
            </IconButton>
          }
          iconElementRight={
            <IconMenu iconButtonElement={
              <IconButton><NavigationMoreVert /></IconButton>
            }>
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Hdelp" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
        } />
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return Object.assign({}, state)
}

// function mapDispatchToProps(dispatch) {
//   return {
//     someAction: bindActionCreators(actionCreator, dispatch)
//   };
// }

// to-do: use es7 decorators instead
export default connect(mapStateToProps)(App)
