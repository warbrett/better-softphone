import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import keydown from 'react-keydown';
import { MenuItem, SelectField, TextField } from 'material-ui';
import phoneFormatter from 'phone-formatter';

import Twilio, { setupTwilio } from '../lib/twilio';
import { getNumbers } from '../state/self';
import { addCall } from '../state/calls';

import AppWrapper from '../wrappers/app';
import CallLog from '../components/call-log';
import Dialer from '../components/dialer';

import { apiFetch } from '../lib/fetch';
import { flexCenterColumn } from '../lib/app-styles';

// Keys that keydown will listen for
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '*', 'enter', 'shift+8', 'shift+=', 'backspace'];

const baseStyles = {
  container: {
    margin: 25,
  },
  phoneControls: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%',
  },
};
const App = keydown(KEYS)(class App extends Component {
  static defaultProps = {
    calls: {},
    self: {
      numbers: [],
    },
  }
  static propTypes = {
    calls: PropTypes.object,
    getNumbers: PropTypes.func.isRequired,
    self: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      callerIdFocused: false,
      errors: {},
      inCall: false,
      number: '',
      token: null,
    };
  }
  componentDidMount() {
    // TODO: move to actions
    apiFetch('/twilio-token')
      .then(({ token, identity }) => {
        Twilio.Device.setup(token);
        setupTwilio(this);

        this.setState({
          token,
          identity,
          callerId: null,
        });
      })
      .catch((err) => {
        console.log('token err', err);
      });

    this.props.getNumbers();
  }
  componentWillReceiveProps({ keydown }) {
    const { callerIdFocused, dialpadNumberFocused, inCall, number } = this.state;
    if (keydown.event) {
      const { key } = keydown.event;
      if (key === 'Backspace') {
        return this.setState({
          number: number.slice(0, number.length - 1),
        });
      }
      if (key !== 'Enter') {
        return this.handleTouchEnterNumber(key);
      }
      if (key === 'Enter' && !callerIdFocused && !inCall && !dialpadNumberFocused) {
        return this.handleDial();
      }
    }
  }
  handleEnterNumber = (evt) => {
    this.setState({
      number: evt.target.value,
    });
  }
  handleTouchEnterNumber = (num, e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      number: this.state.number + num,
    });
  }
  handleChangeCallerId = (evt, idx, val) => {
    this.setState({
      callerId: val,
      errors: omit(this.state.errors, 'callerId'),
    });
  }
  handleDial = (e) => {
    const { callerId, number, inCall } = this.state;
    if (e) {
      e.preventDefault();
    }
    if (inCall) {
      return;
    }
    if (!this.state.callerId) {
      return this.setState({
        errors: {
          ...this.state.errors,
          callerId: 'Please Select Your Caller Id',
        },
      });
    }
    this.setState({ inCall: true });
    const prettyNumber = phoneFormatter.normalize(number);
    this.props.addCall(prettyNumber);
    Twilio.Device.connect({
      To: prettyNumber,
      callerId,
    });
  }
  handleBlurSelect = () => {
    this.setState({
      callerIdFocused: false,
    });
  }
  handleFocusSelect = () => {
    this.setState({
      callerIdFocused: true,
    });
  }
  handleHangup = () => {
    this.setState({
      inCall: false,
    });
    Twilio.Device.disconnectAll();
  }
  handleFocusNumber = () => {
    this.setState({
      dialpadNumberFocused: true,
    });
  }
  handleBlurNumber = () => {
    this.setState({
      dialpadNumberFocused: false,
    });
  }
  render() {
    const { numbers } = this.props.self;
    const numberOptions = numbers.map((n) => {
      const formatted = phoneFormatter.format(n, '(NNN) NNN-NNNN');
      return (
        <MenuItem
          key={n}
          value={n}
          label={formatted}
          onBlur={this.handleBlurSelect}
          onFocus={this.handleFocusSelect}
          primaryText={formatted}
        />);
    });

    return (
      <AppWrapper>
        <div style={baseStyles.container}>
          <div style={flexCenterColumn}>
            <SelectField
              floatingLabelText="Caller Id"
              errorText={this.state.errors.callerId}
              onChange={this.handleChangeCallerId}
              onFocus={this.handleFocusSelect}
              onBlur={this.handleBlurSelect}
              value={this.state.callerId}
            >
              {numberOptions}
            </SelectField>
            <div>
              <form onSubmit={this.handleDial}>
                <TextField
                  floatingLabelText="Number to Dial"
                  onChange={this.handleEnterNumber}
                  value={this.state.number}
                />
              </form>
            </div>
            <div style={baseStyles.phoneControls}>
              <Dialer
                inCall={this.state.inCall}
                onHangup={this.handleHangup}
                onDial={this.handleDial}
                onBlurNumber={this.handleBlurNumber}
                onFocusNumber={this.handleFocusNumber}
                onNumberClick={this.handleTouchEnterNumber}
              />
              {/*<CallLog
                calls={this.props.calls}
                />*/}
            </div>
          </div>
        </div>
      </AppWrapper>
    );
  }
});

function mapStateToProps(state) {
  const { self, calls } = state;
  return { self, calls: calls.data };
}

const boundFunctions = {
  addCall,
  getNumbers,
};

export default connect(mapStateToProps, boundFunctions)(App);
