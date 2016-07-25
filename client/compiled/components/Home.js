'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    console.log('------inside Home constructor----');

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Home).call(this, props));

    _this.state = {
      isLoggedIn: false,
      user: {}
    };
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var that = this;
      $.ajax({
        url: '/checkUser',
        type: 'GET',
        dataType: 'json',
        success: function success(data) {
          if (data) {
            that.setState({
              isLoggedIn: true,
              user: data
            });
            console.log('user was previously logged in');
          } else {
            console.log('no user logged in');
          }
        },
        error: function error(jqXHR, textStatus, _error) {
          console.log('failed GET /checkUser: ', _error);
        }
      });
    }
  }, {
    key: 'handleSignOut',
    value: function handleSignOut() {
      var that = this;
      $.ajax({
        url: '/signoutUser',
        type: 'GET',
        dataType: 'json',
        success: function success(data) {
          that.setState({
            isLoggedIn: false,
            user: {}
          });
          browserHistory.push('/login');
          console.log('successfully signed out');
        },
        error: function error(data) {
          console.log('failed to sign out');
        }
      });
    }
  }, {
    key: 'updateStateAfterLogin',
    value: function updateStateAfterLogin(user) {
      this.setState({ user: user, isLoggedIn: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var child = React.cloneElement(this.props.children, {
        isLoggedIn: this.state.isLoggedIn,
        user: this.state.user,
        updateStateAfterLogin: this.updateStateAfterLogin.bind(this)
      });

      var toggleNavBar;
      if (this.state.isLoggedIn) {
        toggleNavBar = React.createElement(
          'ul',
          { className: 'right hide-on-med-and-down' },
          React.createElement(
            Link,
            { to: '/progress' },
            this.state.user.username,
            '\'s Progress'
          ),
          React.createElement(
            'a',
            { onClick: this.handleSignOut.bind(this) },
            'Logout'
          )
        );
      } else {
        toggleNavBar = React.createElement(
          'ul',
          { className: 'right hide-on-med-and-down' },
          React.createElement(
            Link,
            { to: '/login' },
            'Login'
          ),
          React.createElement(
            Link,
            { to: '/signup' },
            'Sign Up'
          )
        );
      }

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'navbar-fixed' },
          React.createElement(
            'nav',
            { className: 'flow-text grey darken-3 ' },
            React.createElement(
              'div',
              { className: 'nav-wrapper' },
              '     ',
              React.createElement(
                Link,
                { to: '/' },
                'Perfect Pitch'
              ),
              toggleNavBar
            )
          )
        ),
        React.createElement(
          'div',
          null,
          child
        )
      );
    }
  }]);

  return Home;
}(React.Component);

window.Home = Home;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvSG9tZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEk7OztBQUNKLGdCQUFhLEtBQWIsRUFBb0I7QUFBQTs7QUFDbEIsWUFBUSxHQUFSLENBQVksbUNBQVo7O0FBRGtCLHdGQUVaLEtBRlk7O0FBR2xCLFVBQUssS0FBTCxHQUFhO0FBQ1gsa0JBQVksS0FERDtBQUVYLFlBQU07QUFGSyxLQUFiO0FBSGtCO0FBT25COzs7O3dDQUVtQjtBQUNsQixVQUFJLE9BQU8sSUFBWDtBQUNBLFFBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSyxZQURBO0FBRUwsY0FBTSxLQUZEO0FBR0wsa0JBQVUsTUFITDtBQUlMLGlCQUFTLGlCQUFTLElBQVQsRUFBZTtBQUN0QixjQUFJLElBQUosRUFBVTtBQUNSLGlCQUFLLFFBQUwsQ0FBYztBQUNaLDBCQUFZLElBREE7QUFFWixvQkFBTTtBQUZNLGFBQWQ7QUFJQSxvQkFBUSxHQUFSLENBQVksK0JBQVo7QUFDRCxXQU5ELE1BTU87QUFDTCxvQkFBUSxHQUFSLENBQVksbUJBQVo7QUFDRDtBQUNGLFNBZEk7QUFlTCxlQUFPLGVBQVMsS0FBVCxFQUFnQixVQUFoQixFQUE0QixNQUE1QixFQUFtQztBQUN4QyxrQkFBUSxHQUFSLENBQVkseUJBQVosRUFBdUMsTUFBdkM7QUFDRDtBQWpCSSxPQUFQO0FBbUJEOzs7b0NBRWU7QUFDZCxVQUFJLE9BQU8sSUFBWDtBQUNBLFFBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSyxjQURBO0FBRUwsY0FBTSxLQUZEO0FBR0wsa0JBQVUsTUFITDtBQUlMLGlCQUFTLGlCQUFTLElBQVQsRUFBZTtBQUN0QixlQUFLLFFBQUwsQ0FBYztBQUNaLHdCQUFZLEtBREE7QUFFWixrQkFBTTtBQUZNLFdBQWQ7QUFJQSx5QkFBZSxJQUFmLENBQW9CLFFBQXBCO0FBQ0Esa0JBQVEsR0FBUixDQUFZLHlCQUFaO0FBQ0QsU0FYSTtBQVlMLGVBQU8sZUFBUyxJQUFULEVBQWU7QUFDcEIsa0JBQVEsR0FBUixDQUFZLG9CQUFaO0FBQ0Q7QUFkSSxPQUFQO0FBZ0JEOzs7MENBRXFCLEksRUFBTTtBQUMxQixXQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQU0sSUFBUCxFQUFhLFlBQVksSUFBekIsRUFBZDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFJLFFBQVEsTUFBTSxZQUFOLENBQW1CLEtBQUssS0FBTCxDQUFXLFFBQTlCLEVBQXdDO0FBQ2xELG9CQUFZLEtBQUssS0FBTCxDQUFXLFVBRDJCO0FBRWxELGNBQU0sS0FBSyxLQUFMLENBQVcsSUFGaUM7QUFHbEQsK0JBQXVCLEtBQUsscUJBQUwsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBaEM7QUFIMkIsT0FBeEMsQ0FBWjs7QUFNQSxVQUFJLFlBQUo7QUFDQSxVQUFJLEtBQUssS0FBTCxDQUFXLFVBQWYsRUFBMkI7QUFDekIsdUJBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSw0QkFBZDtBQUNFO0FBQUMsZ0JBQUQ7QUFBQSxjQUFNLElBQUcsV0FBVDtBQUFzQixpQkFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixRQUF0QztBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUE7QUFBQSxjQUFHLFNBQVMsS0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBQVo7QUFBQTtBQUFBO0FBRkYsU0FERjtBQUtELE9BTkQsTUFNTztBQUNMLHVCQUNFO0FBQUE7QUFBQSxZQUFJLFdBQVUsNEJBQWQ7QUFDRTtBQUFDLGdCQUFEO0FBQUEsY0FBTSxJQUFHLFFBQVQ7QUFBQTtBQUFBLFdBREY7QUFFRTtBQUFDLGdCQUFEO0FBQUEsY0FBTSxJQUFHLFNBQVQ7QUFBQTtBQUFBO0FBRkYsU0FERjtBQUtEOztBQUVELGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSwwQkFBZjtBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLGFBQWY7QUFBQTtBQUVFO0FBQUMsb0JBQUQ7QUFBQSxrQkFBTSxJQUFHLEdBQVQ7QUFBQTtBQUFBLGVBRkY7QUFHRztBQUhIO0FBREY7QUFERixTQURGO0FBVUU7QUFBQTtBQUFBO0FBQ0c7QUFESDtBQVZGLE9BREY7QUFnQkQ7Ozs7RUEvRmdCLE1BQU0sUzs7QUFrR3pCLE9BQU8sSUFBUCxHQUFjLElBQWQiLCJmaWxlIjoiSG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnLS0tLS0taW5zaWRlIEhvbWUgY29uc3RydWN0b3ItLS0tJyk7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0xvZ2dlZEluOiBmYWxzZSxcbiAgICAgIHVzZXI6IHt9XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvY2hlY2tVc2VyJywgXG4gICAgICB0eXBlOiAnR0VUJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc0xvZ2dlZEluOiB0cnVlLFxuICAgICAgICAgICAgdXNlcjogZGF0YVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIHdhcyBwcmV2aW91c2x5IGxvZ2dlZCBpbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdubyB1c2VyIGxvZ2dlZCBpbicpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24oanFYSFIsIHRleHRTdGF0dXMsIGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmYWlsZWQgR0VUIC9jaGVja1VzZXI6ICcsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVNpZ25PdXQoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvc2lnbm91dFVzZXInLCBcbiAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgaXNMb2dnZWRJbjogZmFsc2UsXG4gICAgICAgICAgdXNlcjoge31cbiAgICAgICAgfSk7XG4gICAgICAgIGJyb3dzZXJIaXN0b3J5LnB1c2goJy9sb2dpbicpO1xuICAgICAgICBjb25zb2xlLmxvZygnc3VjY2Vzc2Z1bGx5IHNpZ25lZCBvdXQnKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIHNpZ24gb3V0Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTdGF0ZUFmdGVyTG9naW4odXNlcikge1xuICAgIHRoaXMuc2V0U3RhdGUoe3VzZXI6IHVzZXIsIGlzTG9nZ2VkSW46IHRydWV9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgY2hpbGQgPSBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbiwge1xuICAgICAgaXNMb2dnZWRJbjogdGhpcy5zdGF0ZS5pc0xvZ2dlZEluLFxuICAgICAgdXNlcjogdGhpcy5zdGF0ZS51c2VyLFxuICAgICAgdXBkYXRlU3RhdGVBZnRlckxvZ2luOiB0aGlzLnVwZGF0ZVN0YXRlQWZ0ZXJMb2dpbi5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgICB2YXIgdG9nZ2xlTmF2QmFyO1xuICAgIGlmICh0aGlzLnN0YXRlLmlzTG9nZ2VkSW4pIHtcbiAgICAgIHRvZ2dsZU5hdkJhciA9IFxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cIj5cbiAgICAgICAgICA8TGluayB0bz1cIi9wcm9ncmVzc1wiPnt0aGlzLnN0YXRlLnVzZXIudXNlcm5hbWV9J3MgUHJvZ3Jlc3M8L0xpbms+XG4gICAgICAgICAgPGEgb25DbGljaz17dGhpcy5oYW5kbGVTaWduT3V0LmJpbmQodGhpcyl9PkxvZ291dDwvYT5cbiAgICAgICAgPC91bD5cbiAgICB9IGVsc2Uge1xuICAgICAgdG9nZ2xlTmF2QmFyID0gXG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93blwiPlxuICAgICAgICAgIDxMaW5rIHRvPVwiL2xvZ2luXCI+TG9naW48L0xpbms+XG4gICAgICAgICAgPExpbmsgdG89XCIvc2lnbnVwXCI+U2lnbiBVcDwvTGluaz5cbiAgICAgICAgPC91bD5cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItZml4ZWRcIj5cbiAgICAgICAgICA8bmF2IGNsYXNzTmFtZT1cImZsb3ctdGV4dCBncmV5IGRhcmtlbi0zIFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAmbmJzcDsgJm5ic3A7ICZuYnNwO1xuICAgICAgICAgICAgICA8TGluayB0bz1cIi9cIj5QZXJmZWN0IFBpdGNoPC9MaW5rPlxuICAgICAgICAgICAgICB7dG9nZ2xlTmF2QmFyfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9uYXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHtjaGlsZH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbndpbmRvdy5Ib21lID0gSG9tZTsiXX0=