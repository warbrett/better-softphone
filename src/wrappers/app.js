import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Paper, FlatButton, AppBar, ToolbarGroup } from 'material-ui';
import { colors } from '../lib/app-styles';

const baseStyles = {
  container: {
    width: '100%',
  },
  headerText: {
    align: 'center',
    width: '100%',
  },
};

class AppWrapper extends Component {
  handleLogout = () => {
    console.log('logging out!');
  }
  render() {
    return (
      <div style={baseStyles.container}>
        <AppBar
          title="Better Softphone"
        >
        </AppBar>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}


AppWrapper.defaultProps = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
