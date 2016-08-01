import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Home from './components/Home.jsx';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Progress from './components/Progress.jsx';
import NoMatch from './components/NoMatch.jsx';

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