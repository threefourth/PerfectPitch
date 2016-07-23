class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav className="flow-text grey darken-3 ">
            <div className="nav-wrapper">
              <Link to="/">Home</Link>
              <ul className="right hide-on-med-and-down">
                <Link to="/login">Login</Link>
                <Link to="/login">Logout</Link>
                <Link to="/signup">Sign Up</Link>
              </ul>
            </div>
          </nav>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}