import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  RaisedButton, TextField } from 'material-ui';
import { login } from '../state/self';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
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
          error: 'Error Logging in',
        });
      });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Caller Demo</h2>
        </div>
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
          <RaisedButton
            label="Login"
            onClick={this.handleLogin}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const boundFunctions = {
  login,
}

Login.defaultProps = {
};

export default connect(mapStateToProps, boundFunctions)(Login);
