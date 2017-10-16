import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RaisedButton, TextField } from 'material-ui';
import { forEach, omit, upperFirst } from 'lodash';
import Joi from 'joi-browser';
import { signup } from '../state/self';
import AuthWrapper from '../wrappers/auth';
import validate from '../lib/validate';

const baseStyles = {
  signupBtn: {
    margin: 20,
    width: 300,
  },
};

const fields = {
  name: {
    required: true,
    name: 'Name',
    schema: Joi.string(),
  },
  email: {
    required: true,
    name: 'Email',
    schema: Joi.string().email(),
  },
  password: {
    required: true,
    name: 'Password',
    schema: Joi.string(),
  },
  twimlAppSid: {
    required: true,
    name: 'Twiml Application SID',
    schema: Joi.string(),
  },
  twilioAuthToken: {
    required: true,
    name: 'Twilio Account SID',
    schema: Joi.string(),
  },
  twilioAccountSid: {
    name: 'Twilio Account SID',
    required: true,
    schema: Joi.string(),
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
      errors: {},
    };
    forEach(fields, (fieldName, key) => {
      const functionName = `handle${upperFirst(key)}`;
      this[functionName] = this.handleText.bind(this, key);
    });
  }
  handleText = (field, evt) => {
    this.setState({
      [field]: evt.target.value,
      errors: omit(this.state.errors, field),
    });
  }
  handleSignup = () => {
    const errors = validate(fields, this.state);
    if (Object.keys(errors)) {
      return this.setState({ errors });
    }

    const { email, password, name, twimlAppSid, twilioAuthToken, twilioAccountSid } = this.state;
    this.props.signup({ email, password, name, twimlAppSid, twilioAuthToken, twilioAccountSid })
      .then(() => {
        this.props.history.push('/app');
      })
      .catch(() => {
        this.setState({
          pageError: 'Error Signing up',
        });
      });
  }
  render() {
    const { errors } = this.state;
    return (
      <AuthWrapper title="Signup">
        <div>
          <TextField
            errorText={errors.name}
            floatingLabelText="Name"
            hintText="John Doe"
            onChange={this.handleName}
            value={this.state.name}
          />
          <TextField
            errorText={errors.email}
            floatingLabelText="Email"
            onChange={this.handleEmail}
            value={this.state.email}
          />
          <TextField
            errorText={errors.password}
            floatingLabelText="Password"
            onChange={this.handlePassword}
            type="password"
            value={this.state.password}
          />
          <TextField
            errorText={errors.twilioAccountSid}
            floatingLabelText="Twilio Account Sid"
            onChange={this.handleTwilioAccountSid}
            value={this.state.twilioAccountSid}
          />
          <TextField
            errorText={errors.twilioAuthToken}
            floatingLabelText="Twilio Auth Token"
            onChange={this.handleTwilioAuthToken}
            value={this.state.twilioAuthToken}
          />
          <TextField
            errorText={errors.twimlAppSid}
            floatingLabelText="Twiml App Sid"
            onChange={this.handleTwimlAppSid}
            value={this.state.twimlAppSid}
          />
          <div>
            <RaisedButton
              disabled={Object.keys(errors).length}
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
};

export default connect(mapStateToProps, boundFunctions)(Signup);
