import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import './index.css';
import reducers from './state';
import registerServiceWorker from './registerServiceWorker';
import { verifyUser } from './state/self';

// Pages
import App from './pages/app';
import Login from './pages/login';
import Signup from './pages/signup';
import ForgotPassword from './pages/forgot-password';
import ResetPassword from './pages/reset-password';

const store = createStore(reducers, applyMiddleware(reduxThunk));

function requireAuth(nextState, replace, cb) {
  return store.dispatch(verifyUser())
    .then(() => cb())
    .catch(() => {
      replace({ pathname: '/' });
      cb();
    });
}

const application = (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/reset" component={ResetPassword} />
        <Route path="/app" component={App} onEnter={requireAuth} />
      </Router>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(application, document.getElementById('root'));
registerServiceWorker();
