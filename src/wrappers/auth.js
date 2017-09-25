import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Paper, FlatButton, Toolbar, ToolbarGroup } from 'material-ui';
import { colors } from '../lib/app-styles';

const baseStyles = {
  childContainer: {
    margin: '25px auto',
    padding: 25,
    width: 400,
    height: 300,
  },
  container: {
    height: 50,
    width: '100%',
  },
  header: {
    backgroundColor: colors.headerBlue,
    padding: '25px 50px',
  },
  headerText: {
    align: 'center',
    width: '100%',
  },
  siteTitle: {
    color: '#ffffff',
  },
  pageTitle: {
    textAlign: 'center',
  },
};

class AuthWrapper extends Component {
  render() {
    return (
      <div style={baseStyles.container}>
        <Toolbar style={baseStyles.header}>
          <ToolbarGroup firstChild={true}>
            <span style={baseStyles.siteTitle}>Better Softphone</span>
          </ToolbarGroup>
          <ToolbarGroup>
            <Link style={baseStyles.menuLink} to="/">
              <FlatButton label="Login" primary={true} />
            </Link>
            <Link to="/signup">
              <FlatButton label="Signup" primary={true} />
            </Link>
          </ToolbarGroup>
        </Toolbar>
        <Paper style={baseStyles.childContainer}>
          <h2 style={baseStyles.pageTitle}>{this.props.title}</h2>
          {this.props.children}
        </Paper>
      </div>
    );
  }
}


AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default AuthWrapper;
