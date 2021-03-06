import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { FloatingActionButton } from 'material-ui';
import Phone from 'material-ui/svg-icons/maps/local-phone';

import { colors, flexItem, flexCenterColumn } from '../lib/app-styles';

const baseStyles = {
  dialpadBtn: {
    margin: 5,
  },
};

class Dialer extends Component {
  static defaultProps = {
    onBlurNumber: noop,
    inCall: false,
    onFocusNumber: noop,
    onNumberClick: noop,
  }
  static propTypes = {
    onBlurNumber: PropTypes.func,
    inCall: PropTypes.bool,
    onDial: PropTypes.func.isRequired,
    onHangup: PropTypes.func.isRequired,
    onFocusNumber: PropTypes.func,
    onNumberClick: PropTypes.func.isRequired,
  }
  render() {
    const { onHangup, onDial, onNumberClick, onBlurNumber, onFocusNumber } = this.props;
    return (
      <div style={flexCenterColumn}>
        <div style={flexItem}>
          <FloatingActionButton
            onClick={e => onNumberClick('1', e)}
            onFocus={onFocusNumber}
            onBlur={onBlurNumber}
            style={baseStyles.dialpadBtn}
          >
            <div>1</div>
          </FloatingActionButton>
          <FloatingActionButton
            onClick={e => onNumberClick('2', e)}
            onFocus={onFocusNumber}
            onBlur={onBlurNumber}
            style={baseStyles.dialpadBtn}
          >
            <div>2</div>
          </FloatingActionButton>
          <FloatingActionButton
            onClick={e => onNumberClick('3', e)}
            onFocus={onFocusNumber}
            onBlur={onBlurNumber}
            style={baseStyles.dialpadBtn}
          >
            <div>3</div>
          </FloatingActionButton>
        </div>
        <div style={flexItem}>
          <FloatingActionButton
            onClick={e => onNumberClick('4', e)}
            onFocus={onFocusNumber}
            onBlur={onBlurNumber}
            style={baseStyles.dialpadBtn}
          >
            <div>4</div>
          </FloatingActionButton>
          <FloatingActionButton
            onClick={e => onNumberClick('5', e)}
            onFocus={onFocusNumber}
            onBlur={onBlurNumber}
            style={baseStyles.dialpadBtn}
          >
            <div>5</div>
          </FloatingActionButton>
          <FloatingActionButton
            onClick={e => onNumberClick('6', e)}
            onFocus={onFocusNumber}
            onBlur={onBlurNumber}
            style={baseStyles.dialpadBtn}
          >
            <div>6</div>
          </FloatingActionButton>
        </div>
        <div style={flexItem}>
          <FloatingActionButton
            onClick={e => onNumberClick('7', e)}
            onFocus={onFocusNumber}
            onBlur={onBlurNumber}
            style={baseStyles.dialpadBtn}
          >
            <div>7</div>
          </FloatingActionButton>
          <FloatingActionButton
            onClick={e => onNumberClick('8', e)}
            onFocus={onFocusNumber}
            onBlur={onBlurNumber}
            style={baseStyles.dialpadBtn}
          >
            <div>8</div>
          </FloatingActionButton>
          <FloatingActionButton
            onClick={e => onNumberClick('9', e)}
            onFocus={onFocusNumber}
            onBlur={onBlurNumber}
            style={baseStyles.dialpadBtn}
          >
            <div>9</div>
          </FloatingActionButton>
        </div>
        <div style={flexItem}>
          <FloatingActionButton
            onClick={e => onNumberClick('*', e)}
            onFocus={onFocusNumber}
            onBlur={onBlurNumber}
            style={baseStyles.dialpadBtn}
          >
            <div>*</div>
          </FloatingActionButton>
          <FloatingActionButton
            onClick={e => onNumberClick('0', e)}
            onFocus={onFocusNumber}
            onBlur={onBlurNumber}
            style={baseStyles.dialpadBtn}
          >
            <div>0</div>
          </FloatingActionButton>
          <FloatingActionButton
            onClick={e => onNumberClick('+', e)}
            onFocus={onFocusNumber}
            onBlur={onBlurNumber}
            style={baseStyles.dialpadBtn}
            value="+"
          >
            <div>+</div>
          </FloatingActionButton>
        </div>
        <div style={flexItem}>
          {this.props.inCall ? (
            <FloatingActionButton
              backgroundColor={colors.error}
              onClick={onHangup}
            >
              <Phone />
            </FloatingActionButton>
          ) : (
            <FloatingActionButton
              backgroundColor={colors.success}
              onClick={onDial}
            >
              <Phone />
            </FloatingActionButton>
          )}
        </div>
      </div>
    );
  }
}

export default Dialer;
