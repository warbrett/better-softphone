import { makeActionCreator } from 'cooldux';
import { apiFetch } from '../lib/fetch';

const LOGIN_START = 'LOGIN_START';
const LOGIN_END = 'LOGIN_END';
const LOGIN_ERROR = 'LOGIN_ERROR';

const SIGNUP_START = 'SIGNUP_START';
const SIGNUP_END = 'SIGNUP_END';
const SIGNUP_ERROR = 'SIGNUP_ERROR';

const GET_NUMBERS_START = 'GET_NUMBERS_START';
const GET_NUMBERS_END = 'GET_NUMBERS_END';
const GET_NUMBERS_ERROR = 'GET_NUMBERS_ERROR';

const loginStart = makeActionCreator(LOGIN_START);
const loginEnd = makeActionCreator(LOGIN_END);
const loginError = makeActionCreator(LOGIN_ERROR);

const signupStart = makeActionCreator(SIGNUP_START);
const signupEnd = makeActionCreator(SIGNUP_END);
const signupError = makeActionCreator(SIGNUP_ERROR);

const getNumbersStart = makeActionCreator(GET_NUMBERS_START);
const getNumbersEnd = makeActionCreator(GET_NUMBERS_END);
const getNumbersError = makeActionCreator(GET_NUMBERS_ERROR);

export function login(email, password) {
  return function dispatcher(dispatch) {
    dispatch(loginStart());
    const options = {
      method: 'POST',
      body: { email, password },
    };
    console.log('login attempt');
    return apiFetch('/login', options)
      .then((self) => {
        console.log('login success!', self);
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

export function getNumbers() {
  return function dispatcher(dispatch) {
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

const initialState = {
  id: null,
  numbers: [],
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_END:
      console.log('done logging in', payload);
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
