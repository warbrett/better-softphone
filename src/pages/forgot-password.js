import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RaisedButton, TextField } from 'material-ui';
import AuthWrapper from '../wrappers/auth';
import { forgotPassword } from '../state/self';

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
    };
    this.handleEmail = this.handleText.bind(this, 'email');
  }
  handleText = (field, evt) => {
    this.setState({
      [field]: evt.target.value,
    });
  }
  handleLogin = () => {
    const { email } = this.state;
    this.props.forgotPassword(email)
      .then(() => {
        this.setState({
          message: 'Please Check Your Email',
        });
      })
      .catch((err) => {
        this.setState({
          errorMessage: '',
        });
      });
  }
  render() {
    return (
      <AuthWrapper title="Forgot Password">
        {this.state.errorMessage}
        <div>
          <TextField
            floatingLabelText="Email"
            onChange={this.handleEmail}
            value={this.state.email}
          />
        </div>
        <div style={baseStyles.btnContainer}>
          <Link to="/">
            <RaisedButton
              label="Cancel"
              style={baseStyles.btn}
            />
          </Link>
          <RaisedButton
            label="Reset Password"
            onClick={this.handleReset}
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
  forgotPassword,
};

Login.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, boundFunctions)(Login);
