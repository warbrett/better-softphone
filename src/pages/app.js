import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FloatingActionButton, MenuItem, SelectField, TextField } from 'material-ui';
import phoneFormatter from 'phone-formatter';
import Phone from 'material-ui/svg-icons/maps/local-phone';

import Twilio from '../lib/twilio';
import { getNumbers } from '../state/self';
import './app.css';

import { apiFetch } from '../lib/fetch';
// Maybe use a redux-middleware for these
function setupTwilio() {
  Twilio.Device.ready((device) => {
    console.log('Twilio.Device Ready!', device);
  });

  Twilio.Device.error((error) => {
    console.log('Twilio.Device Error: ' + error.message, error);
  });

  Twilio.Device.connect((conn) => {
    console.log('Successfully established call!', conn);
  });

  Twilio.Device.disconnect((conn) => {
    console.log('Call ended.', conn);
  });

  Twilio.Device.incoming((conn) => {
    console.log('Incoming connection from ' + conn.parameters.From);
    conn.accept();
  });
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      token: null,
    };
    if (!props.self.id) {
      //      this.props.history.push('/');
    }
  }
  componentDidMount() {
    // TODO: move to actions
    apiFetch('/twilio-token')
      .then(({ token, identity }) => {
        Twilio.Device.setup(token);
        setupTwilio();

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
  handleEnterNumber = (evt) => {
    this.setState({
      number: evt.target.value,
    });
  }
  handleTouchEnterNumber = (num) => {
    this.setState({
      number: this.state.number + num,
    });
  }
  handleChangeCallerId = (evt, idx, val) => {
    this.setState({
      callerId: val,
    });
  }
  handleDial = () => {
    const { number, callerId } = this.state;
    this.setState({
      onCall: true,
    });

    Twilio.Device.connect({
      To: phoneFormatter.normalize(number),
      callerId,
    });
  }
  handleHangup = () => {
    this.setState({
      onCall: false,
    });
    Twilio.Device.disconnectAll();
  }
  render() {
    const { numbers } = this.props.self;
    const numberOptions = numbers.map((n) => {
      const formatted = phoneFormatter.format(n, '(NNN) NNN-NNNN');
      return (<MenuItem key={n} value={n} label={formatted} primaryText={formatted} />);
    });

    return (
      <div className="App">
        <div className="App-header">
          <h2>Caller Demo</h2>
        </div>
        <SelectField
          floatingLabelText="Caller Id"
          onChange={this.handleChangeCallerId}
          value={this.state.callerId}
        >
          {numberOptions}
        </SelectField>
        <div>
          <TextField
            floatingLabelText="Number to Dial"
            onChange={this.handleEnterNumber}
            value={this.state.number}
          />
          <div className="dialpad">
            <div>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={() => this.handleTouchEnterNumber('1')}
              >1</FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={() => this.handleTouchEnterNumber('2')}
              >2</FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={() => this.handleTouchEnterNumber('3')}
              >3</FloatingActionButton>
            </div>
            <div>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={() => this.handleTouchEnterNumber('4')}
              >4</FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={() => this.handleTouchEnterNumber('5')}
              >5</FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={() => this.handleTouchEnterNumber('6')}
              >6</FloatingActionButton>
            </div>
            <div>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={() => this.handleTouchEnterNumber('7')}
              >7</FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={() => this.handleTouchEnterNumber('8')}
              >8</FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={() => this.handleTouchEnterNumber('9')}
              >9</FloatingActionButton>
            </div>
            <div>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={() => this.handleTouchEnterNumber('*')}
              >*</FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={() => this.handleTouchEnterNumber('0')}
              >0</FloatingActionButton>
              <FloatingActionButton
                className="dialpad-btn"
                onClick={() => this.handleTouchEnterNumber('+')}
                value="+"
              >+</FloatingActionButton>
            </div>
          </div>
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
    );
  }
}

function mapStateToProps(state) {
  const { self } = state;
  return { self };
}

const boundFunctions = {
  getNumbers,
};

App.defaultProps = {
  self: {
    numbers: [],
  },
};

App.propTypes = {
  getNumbers: PropTypes.object.isRequired,
  self: PropTypes.object,
};

export default connect(mapStateToProps, boundFunctions)(App);
