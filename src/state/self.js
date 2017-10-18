import { makeActionCreator } from 'cooldux';
import { apiFetch } from '../lib/fetch';

const LOGIN_START = 'LOGIN_START';
const LOGIN_END = 'LOGIN_END';
const LOGIN_ERROR = 'LOGIN_ERROR';

const VERIFY_START = 'VERIFY_START';
const VERIFY_END = 'VERIFY_END';
const VERIFY_ERROR = 'VERIFY_ERROR';

const SIGNUP_START = 'SIGNUP_START';
const SIGNUP_END = 'SIGNUP_END';
const SIGNUP_ERROR = 'SIGNUP_ERROR';

const GET_NUMBERS_START = 'GET_NUMBERS_START';
const GET_NUMBERS_END = 'GET_NUMBERS_END';
const GET_NUMBERS_ERROR = 'GET_NUMBERS_ERROR';

const FORGOT_PASSWORD_START = 'FORGOT_PASSWORD_START';
const FORGOT_PASSWORD_END = 'FORGOT_PASSWORD_END';
const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

const RESET_PASSWORD_START = 'RESET_PASSWORD_START';
const RESET_PASSWORD_END = 'RESET_PASSWORD_END';
const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

const loginStart = makeActionCreator(LOGIN_START);
const loginEnd = makeActionCreator(LOGIN_END);
const loginError = makeActionCreator(LOGIN_ERROR);

const verifyStart = makeActionCreator(VERIFY_START);
const verifyEnd = makeActionCreator(VERIFY_END);
const verifyError = makeActionCreator(VERIFY_ERROR);

const signupStart = makeActionCreator(SIGNUP_START);
const signupEnd = makeActionCreator(SIGNUP_END);
const signupError = makeActionCreator(SIGNUP_ERROR);

const getNumbersStart = makeActionCreator(GET_NUMBERS_START);
const getNumbersEnd = makeActionCreator(GET_NUMBERS_END);
const getNumbersError = makeActionCreator(GET_NUMBERS_ERROR);

const forgotPasswordStart = makeActionCreator(FORGOT_PASSWORD_START);
const forgotPasswordEnd = makeActionCreator(FORGOT_PASSWORD_END);
const forgotPasswordError = makeActionCreator(FORGOT_PASSWORD_ERROR);

const resetPasswordStart = makeActionCreator(RESET_PASSWORD_START);
const resetPasswordEnd = makeActionCreator(RESET_PASSWORD_END);
const resetPasswordError = makeActionCreator(RESET_PASSWORD_ERROR);

export function login(email, password) {
  return (dispatch) => {
    dispatch(loginStart());
    const options = {
      method: 'POST',
      body: { email, password },
    };
    return apiFetch('/login', options)
      .then((self) => {
        dispatch(loginEnd(self));
        return self;
      })
      .catch((err) => {
        dispatch(loginError(err));
        throw err;
      });
  };
}

export function signup(details) {
  return function dispatcher(dispatch) {
    dispatch(signupStart());
    const options = {
      method: 'POST',
      body: details,
    };
    return apiFetch('/signup', options)
      .then((self) => {
        dispatch(signupEnd(self));
        return self;
      })
      .catch((err) => {
        dispatch(signupError(err));
        throw err;
      });
  };
}

export function forgotPassword(email) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      body: { email },
    };
    dispatch(forgotPasswordStart);
    return apiFetch('/forgot-password', options)
      .then((res) => {
        dispatch(forgotPasswordEnd);
        return res;
      })
      .catch((err) => {
        dispatch(forgotPasswordError);
        throw err;
      });
  };
}

export function resetPassword(password, token) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      body: { password, token },
    };

    dispatch(resetPasswordStart());
    return apiFetch('/reset-password', options)
      .then((res) => {
        dispatch(resetPasswordEnd());
        return res;
      })
      .catch((err) => {
        dispatch(resetPasswordError(err));
        throw err;
      });
  };
}

export function getNumbers() {
  return (dispatch) => {
    dispatch(getNumbersStart());
    return apiFetch('/twilio-numbers')
      .then((numbers) => {
        dispatch(getNumbersEnd(numbers));
        return numbers;
      })
      .catch((err) => {
        dispatch(getNumbersError(err));
        throw err;
      });
  };
}


export function verifyUser() {
  return (dispatch) => {
    dispatch(verifyStart());
    // Attempt to login with cookie
    return apiFetch('/users/me')
      .then((user) => {
        dispatch(verifyEnd(user));
        return user;
      })
      .catch((err) => {
        dispatch(verifyError(err));
        throw err;
      });
  };
}

const initialState = {
  id: null,
  numbers: [],
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case VERIFY_END:
    case LOGIN_END:
      return { ...state, ...payload };
    case GET_NUMBERS_END:
      return { ...state, numbers: payload };
    case SIGNUP_END:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export default userReducer;
