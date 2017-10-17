import { makeActionCreator } from 'cooldux';
const ADD_CALL_START = 'ADD_CALL_START';
const ADD_CALL_END = 'ADD_CALL_END';
const ADD_CALL_ERROR = 'ADD_CALL_ERROR';

const addCallStart = makeActionCreator(ADD_CALL_START);
const addCallEnd = makeActionCreator(ADD_CALL_END);
// const addCallError = makeActionCreator(ADD_CALL_ERROR);

export function addCall(details) {
  return function dispatcher(dispatch) {
    dispatch(addCallStart(details));
    dispatch(addCallEnd(details));
  };
}

const initialState = {
  data: {
    1: { id: 1 },
    2: { id: 2 },
    3: { id: 3 },
    4: { id: 4 },
    5: { id: 5 },
  },
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
