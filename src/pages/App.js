import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FloatingActionButton, MenuItem, SelectField, TextField } from 'material-ui';
import phoneFormatter from 'phone-formatter';
import Twilio from '../lib/twilio';
import { getNumbers } from '../state/self';

import './App.css';

import { apiFetch } from '../lib/fetch';
// Maybe use a redux-middleware for these
function setupTwilio() {
  Twilio.Device.ready(function (device) {
    console.log('Twilio.Device Ready!');
  });

  Twilio.Device.error(function (error) {
    console.log(error);
    console.log('Twilio.Device Error: ' + error.message);
  });

  Twilio.Device.connect(function (conn) {
    console.log('Successfully established call!');
  });

  Twilio.Device.disconnect(function (conn) {
    console.log('Call ended.');
  });

  Twilio.Device.incoming(function (conn) {
    console.log('Incoming connection from ' + conn.parameters.From);
    var archEnemyPhoneNumber = '+12099517118';

    if (conn.parameters.From === archEnemyPhoneNumber) {
      conn.reject();
      console.log('It\'s your nemesis. Rejected call.');
    } else {
      // accept the incoming connection and start two-way audio
      conn.accept();
    }
  });
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      token: null,
    }
    if(!props.self.id) {
      this.props.history.push('/');
    }
  }
  componentDidMount() {
    // TODO: move to actions
    apiFetch('/twilio-token')
    .then((data) => {
      Twilio.Device.setup(data.token);
      setupTwilio();

      this.setState({
        token:  data.token,
        identity: data.identity,
        callerId: null,
      });
    })
    .catch(err => {
      console.log('token err', err);
    });

    this.props.getNumbers();
  }
  handleEnterNumber = (evt) => {
    this.setState({
      number: evt.target.value,
    });
  }
  handleChangeCallerId = (evt, idx, val) => {
    this.setState({
      callerId: val
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
      onCall: false
    });
    Twilio.Device.disconnectAll();
  }
  render() {
    const { numbers } = this.props.self;
    const numberOptions = numbers.map(n => {
      const formatted = phoneFormatter.format(n, "(NNN) NNN-NNNN");
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
          {this.state.onCall ?
            (
              <FloatingActionButton
                onClick={this.handleHangup}
                secondary={true}
              />
            )
            :(
              <FloatingActionButton
                onClick={this.handleDial}
              />
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
}

App.defaultProps = {
  user: {
    numbers: []
  }
};

export default connect(mapStateToProps, boundFunctions)(App);
