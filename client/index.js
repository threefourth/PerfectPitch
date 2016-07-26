import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Home from './components/Home';
import App from './components/App';
import Login from './components/Login';
import Signup from './components/Signup';
import Progress from './components/Progress';
import NoMatach from './components/NoMatch';

// window.Router = window.ReactRouter.Router;
// window.Route = window.ReactRouter.Route;
// window.Link = window.ReactRouter.Link;
// window.browserHistory = window.ReactRouter.browserHistory;
// window.IndexRoute = window.ReactRouter.IndexRoute;

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={App}/>
      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>
      <Route path="progress" component={Progress}/>
    </Route>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('app'));