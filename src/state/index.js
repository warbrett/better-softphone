import { combineReducers } from 'redux';

import self from './self';
import calls from './calls';

const reducers = combineReducers({
  calls,
  self,
});

export default reducers;
