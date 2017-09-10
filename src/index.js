import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import './index.css';
import reducers from './state';
import registerServiceWorker from './registerServiceWorker';

// Pages
import App from './pages/app';
import Login from './pages/login';
import Signup from './pages/signup';

const store = createStore(reducers, applyMiddleware(reduxThunk));

const application = (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/app" component={App} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(application, document.getElementById('root'));
registerServiceWorker();
