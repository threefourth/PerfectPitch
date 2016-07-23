window.Router = window.ReactRouter.Router;
window.Route = window.ReactRouter.Route;
window.Link = window.ReactRouter.Link;
window.browserHistory = window.ReactRouter.browserHistory;
window.IndexRoute = window.ReactRouter.IndexRoute;


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={App}/>
      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>
    </Route>
  </Router>
), document.getElementById('app'));



// ReactDOM.render(<App songs={songs}/>, document.getElementById('app'));