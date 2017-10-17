import { makeActionCreator } from 'cooldux';
import { uniqueId } from 'lodash';

const ADD_CALL_START = 'ADD_CALL_START';
const ADD_CALL_END = 'ADD_CALL_END';
const ADD_CALL_ERROR = 'ADD_CALL_ERROR';

const addCallStart = makeActionCreator(ADD_CALL_START);
const addCallEnd = makeActionCreator(ADD_CALL_END);
// const addCallError = makeActionCreator(ADD_CALL_ERROR);

export function addCall(number) {
  return function dispatcher(dispatch) {
    const call = {
      id: uniqueId('call_'),
      number,
    };
    dispatch(addCallStart(call));
    dispatch(addCallEnd(call));
  };
}

const initialState = {
  data: {},
};

function callsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_CALL_START:
    case ADD_CALL_END:
      return { ...state, data: { ...state.data, [payload.id]: payload } };
    default:
      return state;
  }
}

export default callsReducer;
