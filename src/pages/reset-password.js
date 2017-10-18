import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { RaisedButton, TextField } from 'material-ui';
import AuthWrapper from '../wrappers/auth';
import { resetPassword } from '../state/self';

const baseStyles = {
  btn: {
    margin: 15,
  },
  btnContainer: {
    position: 'absolute',
    top: 320,
  },
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
    };
    this.handlePassword = this.handleText.bind(this, 'password');
    this.handleConfirmPassword = this.handleText.bind(this, 'confirmPassword');
  }
  handleText = (field, evt) => {
    this.setState({
      [field]: evt.target.value,
    });
  }
  handleReset = () => {
    const { password, confirmPassword } = this.state;
    const token = get(this.props, 'query.token', '');

    if (password !== confirmPassword) {
      return this.setState({ passwordError: 'Passwords Must Match' });
    }
    this.props.resetPassword(password, token)
      .then(() => {
        this.props.router.push('/?message=reset');
      })
      .catch(() => {
        this.setState({
          message: 'An Error Occured',
        });
      });
  }
  render() {
    return (
      <AuthWrapper title="Reset Password">
        {this.state.message}
        <div>
          <TextField
            floatingLabelText="Password"
            onChange={this.handlePassword}
            value={this.state.password}
          />
        </div>
        <div>
          <TextField
            floatingLabelText="Confirm Password"
            onChange={this.handleConfirmPassword}
            errorText={this.state.passwordError}
            value={this.state.confirmPassword}
          />
        </div>
        <div style={baseStyles.btnContainer}>
          <RaisedButton
            label="Reset Password"
            onClick={this.handleReset}
            primary={true}
            style={baseStyles.btn}
          />
        </div>
      </AuthWrapper>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    query: props.location.query,
  };
}

const boundFunctions = {
  resetPassword,
};

ResetPassword.propTypes = {
  router: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, boundFunctions)(ResetPassword);
