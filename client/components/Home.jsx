class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  handleSignOut() {
    $.ajax({
      url: '/signoutUser', 
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        browserHistory.push('/login');
        console.log('successfully signed out');
      },
      error: function(data) {
        console.log('failed to sign out');
      }
    });
  }

  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav className="flow-text grey darken-3 ">
            <div className="nav-wrapper">
              &nbsp; &nbsp; &nbsp;
              <Link to="/">Perfect Pitch</Link>
              <ul className="right hide-on-med-and-down">
                <Link to="/login">Login</Link>
                <a onClick={this.handleSignOut.bind(this)}>Logout</a>
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