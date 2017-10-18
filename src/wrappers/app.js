import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, IconButton, IconMenu, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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

const menuOrigins = { horizontal: 'right', vertical: 'top' };
class AppWrapper extends Component {
  static defaultProps = {
    label: 'Better Softphone',
  }
  static propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string,
    onLogout: PropTypes.func.isRequired,
  }
  render() {
    const menu = (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={menuOrigins}
        anchorOrigin={menuOrigins}
      >
        <MenuItem onClick={this.props.onLogout} primaryText="Sign out" />
      </IconMenu>
    );
    return (
      <div style={baseStyles.container}>
        <AppBar
          title={this.props.label}
          iconElementRight={menu}
          showMenuIconButton={false}
        />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default AppWrapper;
