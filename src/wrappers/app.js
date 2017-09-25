import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Paper, FlatButton, Toolbar, ToolbarGroup } from 'material-ui';
import { colors } from '../lib/app-styles';

const baseStyles = {
  container: {
    height: 50,
    width: '100%',
  },
  header: {
    backgroundColor: colors.headerBlue,
    padding: '25px',
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
        <Toolbar style={baseStyles.header}>
          <ToolbarGroup firstChild={true}>
            <span>Better Softphone</span>
          </ToolbarGroup>
          <ToolbarGroup>
            <FlatButton label="Logout" onClick={this.handleLogout} primary={true} />
          </ToolbarGroup>
        </Toolbar>
        <Paper>
          {this.props.children}
        </Paper>
      </div>
    );
  }
}


AppWrapper.defaultProps = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
