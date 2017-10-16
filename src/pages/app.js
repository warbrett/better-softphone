import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import keydown from 'react-keydown';
import { FloatingActionButton, MenuItem, SelectField, TextField } from 'material-ui';
import phoneFormatter from 'phone-formatter';
import Phone from 'material-ui/svg-icons/maps/local-phone';

import Twilio from '../lib/twilio';
import { getNumbers } from '../state/self';
import './app.css';

import { apiFetch } from '../lib/fetch';
// Maybe use a redux-middleware for these
function setupTwilio(component) {
  Twilio.Device.ready((device) => {
    console.log('Twilio.Device Ready!', device);
  });

  Twilio.Device.error((error) => {
    component.setState({
      onCall: false,
    });
    console.log('Twilio.Device Error: ' + error.message, error);
  });

  Twilio.Device.connect((conn) => {
    console.log('Successfully established call!', conn);
  });

  Twilio.Device.disconnect((conn) => {
    component.setState({
      onCall: false,
    });
    console.log('Call ended.', conn);
  });

  Twilio.Device.incoming((conn) => {
    console.log('Incoming connection from ' + conn.parameters.From);
    conn.accept();
  });
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '*', 'enter', 'shift+8', 'shift+=', 'backspace'];

const App = keydown(KEYS)(class App extends Component {
  static defaultProps = {
    self: {
      numbers: [],
    },
  }
  static propTypes = {
    getNumbers: PropTypes.object.isRequired,
    self: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      callerIdFocused: false,
      onCall: false,
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
    const { callerIdFocused, dialpadNumberFocused, onCall, number } = this.state;
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
      if (key === 'Enter' && !callerIdFocused && !onCall && !dialpadNumberFocused) {
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
    });
  }
  handleDial = (e) => {
    const { callerId, number, onCall } = this.state;
    if (e) {
      e.preventDefault();
    }
    if (onCall) {
      return;
    }
    this.setState({ onCall: true });
    Twilio.Device.connect({
      To: phoneFormatter.normalize(number),
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
      onCall: false,
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
      <div className="App">
        <div className="dialpad-controls">
          <SelectField
            floatingLabelText="Caller Id"
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
          <div className="dialpad">
            <div className="flex-item">
              <FloatingActionButton
                className="dialpad-btn"
                onClick={e => this.handleTouchEnterNumber('1', e)}
                onFocus={this.handleFocusNumber}
                onBlur={this.handleBlurNumber}
              >
                <div>1</div>
              </FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={e => this.handleTouchEnterNumber('2', e)}
                onFocus={this.handleFocusNumber}
                onBlur={this.handleBlurNumber}
              >
                <div>2</div>
              </FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={e => this.handleTouchEnterNumber('3', e)}
                onFocus={this.handleFocusNumber}
                onBlur={this.handleBlurNumber}
              >
                <div>3</div>
              </FloatingActionButton>
            </div>
            <div className="flex-item">
              <FloatingActionButton
                className="dialpad-btn"
                onClick={e => this.handleTouchEnterNumber('4', e)}
                onFocus={this.handleFocusNumber}
                onBlur={this.handleBlurNumber}
              >
                <div>4</div>
              </FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={e => this.handleTouchEnterNumber('5', e)}
                onFocus={this.handleFocusNumber}
                onBlur={this.handleBlurNumber}
              >
                <div>5</div>
              </FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={e => this.handleTouchEnterNumber('6', e)}
                onFocus={this.handleFocusNumber}
                onBlur={this.handleBlurNumber}
              >
                <div>6</div>
              </FloatingActionButton>
            </div>
            <div className="flex-item">
              <FloatingActionButton
                className="dialpad-btn"
                onClick={e => this.handleTouchEnterNumber('7', e)}
                onFocus={this.handleFocusNumber}
                onBlur={this.handleBlurNumber}
              >
                <div>7</div>
              </FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={e => this.handleTouchEnterNumber('8', e)}
                onFocus={this.handleFocusNumber}
                onBlur={this.handleBlurNumber}
              >
                <div>8</div>
              </FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={e => this.handleTouchEnterNumber('9', e)}
                onFocus={this.handleFocusNumber}
                onBlur={this.handleBlurNumber}
              >
                <div>9</div>
              </FloatingActionButton>
            </div>
            <div className="flex-item">
              <FloatingActionButton
                className="dialpad-btn"
                onClick={e => this.handleTouchEnterNumber('*', e)}
                onFocus={this.handleFocusNumber}
                onBlur={this.handleBlurNumber}
              >
                <div>*</div>
              </FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={e => this.handleTouchEnterNumber('0', e)}
                onFocus={this.handleFocusNumber}
                onBlur={this.handleBlurNumber}
              >
                <div>0</div>
              </FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={e => this.handleTouchEnterNumber('+', e)}
                onFocus={this.handleFocusNumber}
                onBlur={this.handleBlurNumber}
                value="+"
              >
                <div>+</div>
              </FloatingActionButton>
            </div>
            <div className="flex-item">
              {this.state.onCall ?
                (
                  <FloatingActionButton
                    onClick={this.handleHangup}
                    secondary={true}
                  >
                    <Phone />
                  </FloatingActionButton>
                )
                : (
                  <FloatingActionButton
                    onClick={this.handleDial}
                  >
                    <Phone />
                  </FloatingActionButton>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { self } = state;
  return { self };
}

const boundFunctions = {
  getNumbers,
};

export default connect(mapStateToProps, boundFunctions)(App);
