import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { forEach, upperFirst } from 'lodash';
import { RaisedButton, TextField } from 'material-ui';
import AuthWrapper from '../wrappers/auth';
import validate from '../lib/validate';
import { login } from '../state/self';

const baseStyles = {
  btn: {
    margin: 15,
  },
  btnContainer: {
    position: 'absolute',
    top: 320,
  },
};

const fields = {
  email: {
    name: 'Email',
    required: true,
  },
  password: {
    name: 'Password',
    required: true,
  },
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    });
  }
  handleLogin = () => {
    const errors = validate(fields, this.state);
    if (Object.keys(errors).length) {
      return this.setState({ errors });
    }

    const { email, password } = this.state;
    this.props.login(email, password)
      .then(() => {
        this.props.history.push('/app');
      })
      .catch((err) => {
        this.setState({
          password: '',
          pageError: 'Error Logging in',
        });
      });
  }
  render() {
    return (
      <AuthWrapper title="Login">
        {this.state.pageError}
        <div>
          <TextField
            errorText={this.state.errors.email}
            floatingLabelText="Email"
            onChange={this.handleEmail}
            value={this.state.email}
          />
        </div>
        <div>
          <TextField
            errorText={this.state.errors.password}
            floatingLabelText="Password"
            onChange={this.handlePassword}
            type="password"
            value={this.state.password}
          />
        </div>
        <div style={baseStyles.btnContainer}>
          <Link to="/forgot">
            <RaisedButton
              label="Reset Password"
              secondary={true}
              style={baseStyles.btn}
            />
          </Link>
          <RaisedButton
            label="Login"
            onClick={this.handleLogin}
            primary={true}
            style={baseStyles.btn}
          />
        </div>
      </AuthWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const boundFunctions = {
  login,
};

export default connect(mapStateToProps, boundFunctions)(Login);
