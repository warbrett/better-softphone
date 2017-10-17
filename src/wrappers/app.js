import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar } from 'material-ui';
import { colors } from '../lib/app-styles';

const baseStyles = {
  container: {
    width: '100%',
  },
  headerText: {
    align: 'center',
    width: '100%',
  },
  progressIndicator: {
    margin: '25px auto',
    display: 'block',
  },
};

class AppWrapper extends Component {
  static defaultProps = {}
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  handleLogout = () => {
    console.log('logging out!');
  }
  render() {
    return (
      <div style={baseStyles.container}>
        <AppBar
          title="Better Softphone"
        />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default AppWrapper;
