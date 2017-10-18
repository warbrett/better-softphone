import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Subheader, List, ListItem } from 'material-ui';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
// import Phone from 'material-ui/svg-icons/maps/local-phone';

const baseStyles = {
  container: {
    border: '1px solid rgb(217, 217, 217)',
    display: 'flex',
    flexDirection: 'column',
    height: 320,
    width: 200,
  },
};

class CallLog extends Component {
  static defaultProps = {
    calls: {},
  }
  static propTypes = {
    calls: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleCallSelect = () => {
  }
  render() {
    const { calls } = this.props;
    // TODO: Clear split/reverse once these are stored on the server
    const callList = map(calls, (call) => {
      return (
        <ListItem
          key={call.id}
          leftIcon={<CommunicationCall />}
          primaryText={call.number}
        />
      );
    }).reverse().splice(0, 5);
    return (
      <div style={baseStyles.container}>
        <Subheader>Recent Calls</Subheader>
        <List>
          {callList}
        </List>
      </div>
    );
  }
}

export default CallLog;
