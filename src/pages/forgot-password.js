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

class ForgotPassword extends Component {
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
  handleReset = () => {
    const { email } = this.state;
    this.props.forgotPassword(email)
      .then(() => {
        this.setState({
          message: 'Please Check Your Email',
        });
      })
      .catch(() => {
        this.setState({
          message: 'An Error Occured',
        });
      });
  }
  render() {
    return (
      <AuthWrapper title="Forgot Password">
        {this.state.message}
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
              secondary={true}
              style={baseStyles.btn}
            />
          </Link>
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

function mapStateToProps(state) {
  return {};
}

const boundFunctions = {
  forgotPassword,
};

export default connect(mapStateToProps, boundFunctions)(ForgotPassword);
