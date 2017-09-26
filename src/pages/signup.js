import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  RaisedButton, TextField } from 'material-ui';
import { signup } from '../state/self';
import AuthWrapper from '../wrappers/auth';

const baseStyles = {
  signupBtn: {
    margin: 20,
    width: 300,
  },
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      twimlAppSid: '',
      twilioAccountSid: '',
      twilioAuthToken: '',
    };
    this.handleEmail = this.handleText.bind(this, 'email');
    this.handlePassword = this.handleText.bind(this, 'password');
    this.handleName = this.handleText.bind(this, 'name');
    this.handleTwimlAppAsid = this.handleText.bind(this, 'twimlAppSid');
    this.handleTwilioAccountSid = this.handleText.bind(this, 'twilioAccountSid');
    this.handleTwilioAuthToken = this.handleText.bind(this, 'twilioAuthToken');
  }
  handleText = (field, evt) => {
    this.setState({
      [field]: evt.target.value,
    });
  }
  handleSignup = () => {
    const { email, password, name, twimlAppSid, twilioAuthToken, twilioAccountSid } = this.state;
    this.props.signup({ email, password, name, twimlAppSid, twilioAuthToken, twilioAccountSid })
      .then(() => {
        this.props.history.push('/app');
      })
      .catch((err) => {
        this.setState({
          password: '',
          error: 'Error Signing up',
        });
      });
  }
  render() {
    return (
      <AuthWrapper title="Signup">
        <div>
          <TextField
            floatingLabelText="Email"
            onChange={this.handleEmail}
            value={this.state.email}
          />
          <TextField
            floatingLabelText="Password"
            onChange={this.handlePassword}
            type="password"
            value={this.state.password}
          />
          <TextField
            floatingLabelText="Name"
            hintText="John Doe"
            onChange={this.handleName}
            value={this.state.name}
          />
          <TextField
            floatingLabelText="Twilio Account Sid"
            onChange={this.handleTwilioAccountSid}
            value={this.state.twilioAccountSid}
          />
          <TextField
            floatingLabelText="Twilio Auth Token"
            onChange={this.handleTwilioAuthToken}
            value={this.state.twilioAuthToken}
          />
          <TextField
            floatingLabelText="Twiml App Sid"
            onChange={this.handleTwimlAppAsid}
            value={this.state.twimlAppSid}
          />
          <div>
            <RaisedButton
              label="Signup"
              onClick={this.handleSignup}
              primary={true}
              style={baseStyles.signupBtn}
            />
          </div>
        </div>
      </AuthWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const boundFunctions = {
  signup,
}

Signup.defaultProps = {
};

export default connect(mapStateToProps, boundFunctions)(Signup);
