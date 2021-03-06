import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { forEach, omit, upperFirst } from 'lodash';
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
    top: 400,
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
  static propTypes = {
    router: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
  }
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
      errors: omit(this.state.errors, field),
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
        this.props.router.push('/app');
      })
      .catch(() => {
        this.setState({
          password: '',
          pageError: 'Error Logging in',
        });
      });
  }
  render() {
    const controls = [
      <Link to="/forgot">
        <RaisedButton
          label="Reset Password"
          secondary={true}
          style={baseStyles.btn}
        />
      </Link>,
      <RaisedButton
        label="Login"
        onClick={this.handleLogin}
        primary={true}
        style={baseStyles.btn}
      />,
    ];
    return (
      <AuthWrapper controls={controls} pageError={this.state.pageError} title="Login">
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
      </AuthWrapper>
    );
  }
}

function mapStateToProps() {
  return {};
}

const boundFunctions = {
  login,
};

export default connect(mapStateToProps, boundFunctions)(Login);
