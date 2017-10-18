import { combineReducers } from 'redux';

import calls from './calls';
import phone from './phone';
import self from './self';

const reducers = combineReducers({
  calls,
  phone,
  self,
});

export default reducers;
