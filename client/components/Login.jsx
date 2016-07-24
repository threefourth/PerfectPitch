class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleLogin(e) {
    e.preventDefault();

    var username = this.state.username;
    var password = this.state.password;

    if (username && password) {
      this.setState({
        username: '',
        password: ''
      });

      $.ajax({
        url: '/loginUser', 
        type: 'POST',
        data: JSON.stringify({username: username, password: password}),
        contentType: 'application/json',
        success: function(data) {
          browserHistory.push('/');
          console.log('successfully logged in!');
        }.bind(this),
        error: function(data) {
          alert('Incorrect username or password!');
        }
      });
    }
  }
  
  render() {
    return (
      <div className="container">
        <h3>Welcome back!</h3>
        <br></br>
        <br></br>
        <div className="row">
          <div className="col s6 offset-s3">
            <form className="section" onSubmit={this.handleLogin.bind(this)}>
              <input
                type="text" placeholder="username"
                value={this.state.username}
                onChange={this.handleUsernameChange.bind(this)}
              />
              <input
                type="password" placeholder="password"
                value={this.state.password}
                onChange={this.handlePasswordChange.bind(this)}
              />
              <button className="btn waves-effect waves-light grey darken-3" type="submit" name="action">login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

window.Login = Login;
