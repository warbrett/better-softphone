import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Paper, FlatButton, Toolbar, ToolbarGroup } from 'material-ui';
import { colors } from '../lib/app-styles';

const baseStyles = {
  childContainer: {
    margin: '25px auto',
    padding: 25,
    width: 400,
  },
  container: {
    height: 50,
    width: '100%',
  },
  errorMessage: {
    color: colors.error,
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
  static defaultProps = {
    controls: null,
    title: 'Better SoftPhone',
    pageError: null,
  }
  static propTypes = {
    controls: PropTypes.node,
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    pageError: PropTypes.string,
  }
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
          <div style={baseStyles.errorMessage}>{this.props.pageError}</div>
          {this.props.children}
          <div>
            {this.props.controls}
          </div>
        </Paper>
      </div>
    );
  }
}

export default AuthWrapper;
