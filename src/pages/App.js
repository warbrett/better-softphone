import React, { Component } from 'react';
import { FloatingActionButton, TextField } from 'material-ui';
import Twilio from '../lib/twilio';

import './App.css';

import { apiFetch } from '../lib/fetch';

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
      numbers: [],
      token: null,
    }
  }
  componentDidMount() {
    apiFetch('/twilio-token')
    .then((data) => {
      Twilio.Device.setup(data.token);
      setupTwilio();

      this.setState({
        token:  data.token,
        identity: data.identity,
      });
    })
    .catch(err => {
      console.log('token err', err);
    });

    apiFetch('/numbers')
    .then((numbers) => {
      this.setState({ numbers });
    })
    .catch(err => {
      console.log('fetch err', err);
    });
  }
  handleEnterNumber = (evt) => {
    this.setState({
      number: evt.target.value,
    });
  }
  handleDial = () => {
    console.log('dialing', this.state.number);
    Twilio.Device.connect({
      To: this.state.number,
      callerId: this.state.numbers[0],
    });
  }
  handleHangup = () => {
    Twilio.Device.disconnectAll();
  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Caller Demo</h2>
          <TextField
            value={this.state.number}
            onChange={this.handleEnterNumber}
          />
          <FloatingActionButton
            onClick={this.handleDial}
          />
        </div>
      </div>
    );
  }
}

export default App;
