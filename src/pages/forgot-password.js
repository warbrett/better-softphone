import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { omit } from 'lodash';
import { RaisedButton, TextField } from 'material-ui';

import AuthWrapper from '../wrappers/auth';
import { forgotPassword } from '../state/self';
import validate from '../lib/validate';

const baseStyles = {
  btn: {
    margin: 15,
  },
};

const fields = {
  email: {
    required: true,
    name: 'Email',
    schema: Joi.string().email(),
  },
};

class ForgotPassword extends Component {
  static propTypes = {
    forgotPassword: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
    };
    this.handleEmail = this.handleText.bind(this, 'email');
  }
  handleText = (field, evt) => {
    this.setState({
      [field]: evt.target.value,
      errors: omit(this.state.errors, field),
    });
  }
  handleReset = () => {
    const errors = validate(fields, this.state);
    if (Object.keys(errors)) {
      return this.setState({ errors });
    }

    const { email } = this.state;
    this.props.forgotPassword(email)
      .then(() => {
        this.setState({
          message: 'Please Check Your Email',
          pageError: null,
        });
      })
      .catch(() => {
        this.setState({
          pageErro: 'An Error Occured',
        });
      });
  }
  render() {
    const controls = [
      <Link to="/">
        <RaisedButton
          label="Cancel"
          secondary={true}
          style={baseStyles.btn}
        />
      </Link>,
      <RaisedButton
        label="Reset Password"
        onClick={this.handleReset}
        primary={true}
        style={baseStyles.btn}
      />,
    ];
    return (
      <AuthWrapper controls={controls} pageError={this.state.pageError} title="Forgot Password">
        {this.state.message}
        <div>
          <TextField
            errorText={this.state.errors.email}
            floatingLabelText="Email"
            onChange={this.handleEmail}
            value={this.state.email}
          />
        </div>
      </AuthWrapper>
    );
  }
}

function mapStateToProps() {
  return {};
}

const boundFunctions = {
  forgotPassword,
};

export default connect(mapStateToProps, boundFunctions)(ForgotPassword);
