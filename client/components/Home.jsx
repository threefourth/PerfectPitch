class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav>
          <ul role="nav">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/login">Logout</Link>
            <Link to="/signup">Sign Up</Link>
          </ul>
        </nav>

        {this.props.children}
      </div>
    );
  }
}