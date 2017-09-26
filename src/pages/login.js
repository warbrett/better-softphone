import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RaisedButton, TextField } from 'material-ui';
import AuthWrapper from '../wrappers/auth';
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleEmail = this.handleText.bind(this, 'email');
    this.handlePassword = this.handleText.bind(this, 'password');
  }
  handleText = (field, evt) => {
    this.setState({
      [field]: evt.target.value,
    });
  }
  handleLogin = () => {
    const { email, password } = this.state;
    this.props.login(email, password)
      .then(() => {
        this.props.history.push('/app');
      })
      .catch((err) => {
        this.setState({
          password: '',
          errorMessage: 'Error Logging in',
        });
      });
  }
  render() {
    return (
      <AuthWrapper title="Login">
        {this.state.errorMessage}
        <div>
          <TextField
            floatingLabelText="Email"
            onChange={this.handleEmail}
            value={this.state.email}
          />
        </div>
        <div>
          <TextField
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

Login.defaultProps = {
  login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, boundFunctions)(Login);
