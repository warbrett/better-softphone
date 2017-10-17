import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
// import Phone from 'material-ui/svg-icons/maps/local-phone';

// import './call-log.css';

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
  componentDidMount() {
  }
  handleCallSelect = () => {
  }
  render() {
    const { calls } = this.props;
    const callList = map(calls, (call) => {
      return (<div key={call.id}> {call.number} </div>);
    });
    return (
      <div className="CallLog">
        <div>
          {callList}
        </div>
      </div>
    );
  }
}

export default CallLog;
