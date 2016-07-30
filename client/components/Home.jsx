import React from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null
    }
  }

  componentDidMount() {
    var that = this;
    $.ajax({
      url: '/checkUser',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        if (data) {
          that.setState({
            isLoggedIn: true,
            user: data
          });
        }
      },
      error: function(jqXHR, textStatus, error) {
        console.log('failed GET /checkUser: ', error);
      }
    });
  }

  handleSignOut() {
    var that = this;
    $.ajax({
      url: '/signoutUser',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        that.setState({
          isLoggedIn: false,
          user: null
        });
        browserHistory.push('/login');
      },
      error: function(data) {
        console.log('failed to sign out');
      }
    });
  }

  updateStateAfterLogin(user) {
    this.setState({user: user, isLoggedIn: true});
  }

  render() {
    var child = React.cloneElement(this.props.children, {
      isLoggedIn: this.state.isLoggedIn,
      user: this.state.user,
      updateStateAfterLogin: this.updateStateAfterLogin.bind(this)
    });

    var toggleNavBar;
    if (this.state.isLoggedIn) {
      toggleNavBar =
        <ul className="right hide-on-med-and-down">
          <Link to="/progress">{this.state.user.username}'s Progress</Link>
          <a onClick={this.handleSignOut.bind(this)}>Logout</a>
        </ul>
    } else {
      toggleNavBar =
        <ul className="right hide-on-med-and-down">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </ul>
    }

    return (
      <div>
        <div className="navbar-fixed">
          <nav className="flow-text grey darken-3 ">
            <div className="nav-wrapper">
              &nbsp; &nbsp; &nbsp;
              <Link to="/" params={{ user: this.state.user }}>Perfect Pitch</Link>
              {toggleNavBar}
            </div>
          </nav>
        </div>
        <div>
          {child}
        </div>
      </div>
    );
  }
}

// window.Home = Home;
