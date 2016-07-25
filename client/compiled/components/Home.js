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
      user: null
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
            user: null
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvSG9tZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEk7OztBQUNKLGdCQUFhLEtBQWIsRUFBb0I7QUFBQTs7QUFDbEIsWUFBUSxHQUFSLENBQVksbUNBQVo7O0FBRGtCLHdGQUVaLEtBRlk7O0FBR2xCLFVBQUssS0FBTCxHQUFhO0FBQ1gsa0JBQVksS0FERDtBQUVYLFlBQU07QUFGSyxLQUFiO0FBSGtCO0FBT25COzs7O3dDQUVtQjtBQUNsQixVQUFJLE9BQU8sSUFBWDtBQUNBLFFBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSyxZQURBO0FBRUwsY0FBTSxLQUZEO0FBR0wsa0JBQVUsTUFITDtBQUlMLGlCQUFTLGlCQUFTLElBQVQsRUFBZTtBQUN0QixjQUFJLElBQUosRUFBVTtBQUNSLGlCQUFLLFFBQUwsQ0FBYztBQUNaLDBCQUFZLElBREE7QUFFWixvQkFBTTtBQUZNLGFBQWQ7QUFJQSxvQkFBUSxHQUFSLENBQVksK0JBQVo7QUFDRCxXQU5ELE1BTU87QUFDTCxvQkFBUSxHQUFSLENBQVksbUJBQVo7QUFDRDtBQUNGLFNBZEk7QUFlTCxlQUFPLGVBQVMsS0FBVCxFQUFnQixVQUFoQixFQUE0QixNQUE1QixFQUFtQztBQUN4QyxrQkFBUSxHQUFSLENBQVkseUJBQVosRUFBdUMsTUFBdkM7QUFDRDtBQWpCSSxPQUFQO0FBbUJEOzs7b0NBRWU7QUFDZCxVQUFJLE9BQU8sSUFBWDtBQUNBLFFBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSyxjQURBO0FBRUwsY0FBTSxLQUZEO0FBR0wsa0JBQVUsTUFITDtBQUlMLGlCQUFTLGlCQUFTLElBQVQsRUFBZTtBQUN0QixlQUFLLFFBQUwsQ0FBYztBQUNaLHdCQUFZLEtBREE7QUFFWixrQkFBTTtBQUZNLFdBQWQ7QUFJQSx5QkFBZSxJQUFmLENBQW9CLFFBQXBCO0FBQ0Esa0JBQVEsR0FBUixDQUFZLHlCQUFaO0FBQ0QsU0FYSTtBQVlMLGVBQU8sZUFBUyxJQUFULEVBQWU7QUFDcEIsa0JBQVEsR0FBUixDQUFZLG9CQUFaO0FBQ0Q7QUFkSSxPQUFQO0FBZ0JEOzs7MENBRXFCLEksRUFBTTtBQUMxQixXQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQU0sSUFBUCxFQUFhLFlBQVksSUFBekIsRUFBZDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFJLFFBQVEsTUFBTSxZQUFOLENBQW1CLEtBQUssS0FBTCxDQUFXLFFBQTlCLEVBQXdDO0FBQ2xELG9CQUFZLEtBQUssS0FBTCxDQUFXLFVBRDJCO0FBRWxELGNBQU0sS0FBSyxLQUFMLENBQVcsSUFGaUM7QUFHbEQsK0JBQXVCLEtBQUsscUJBQUwsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBaEM7QUFIMkIsT0FBeEMsQ0FBWjs7QUFNQSxVQUFJLFlBQUo7QUFDQSxVQUFJLEtBQUssS0FBTCxDQUFXLFVBQWYsRUFBMkI7QUFDekIsdUJBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSw0QkFBZDtBQUNFO0FBQUMsZ0JBQUQ7QUFBQSxjQUFNLElBQUcsV0FBVDtBQUFzQixpQkFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixRQUF0QztBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUE7QUFBQSxjQUFHLFNBQVMsS0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBQVo7QUFBQTtBQUFBO0FBRkYsU0FERjtBQUtELE9BTkQsTUFNTztBQUNMLHVCQUNFO0FBQUE7QUFBQSxZQUFJLFdBQVUsNEJBQWQ7QUFDRTtBQUFDLGdCQUFEO0FBQUEsY0FBTSxJQUFHLFFBQVQ7QUFBQTtBQUFBLFdBREY7QUFFRTtBQUFDLGdCQUFEO0FBQUEsY0FBTSxJQUFHLFNBQVQ7QUFBQTtBQUFBO0FBRkYsU0FERjtBQUtEOztBQUVELGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSwwQkFBZjtBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLGFBQWY7QUFBQTtBQUVFO0FBQUMsb0JBQUQ7QUFBQSxrQkFBTSxJQUFHLEdBQVQ7QUFBQTtBQUFBLGVBRkY7QUFHRztBQUhIO0FBREY7QUFERixTQURGO0FBVUU7QUFBQTtBQUFBO0FBQ0c7QUFESDtBQVZGLE9BREY7QUFnQkQ7Ozs7RUEvRmdCLE1BQU0sUzs7QUFrR3pCLE9BQU8sSUFBUCxHQUFjLElBQWQiLCJmaWxlIjoiSG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnLS0tLS0taW5zaWRlIEhvbWUgY29uc3RydWN0b3ItLS0tJyk7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0xvZ2dlZEluOiBmYWxzZSxcbiAgICAgIHVzZXI6IG51bGxcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9jaGVja1VzZXInLCBcbiAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgIGlzTG9nZ2VkSW46IHRydWUsXG4gICAgICAgICAgICB1c2VyOiBkYXRhXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgd2FzIHByZXZpb3VzbHkgbG9nZ2VkIGluJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vIHVzZXIgbG9nZ2VkIGluJylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbihqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZhaWxlZCBHRVQgL2NoZWNrVXNlcjogJywgZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlU2lnbk91dCgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9zaWdub3V0VXNlcicsIFxuICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICBpc0xvZ2dlZEluOiBmYWxzZSxcbiAgICAgICAgICB1c2VyOiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICBicm93c2VySGlzdG9yeS5wdXNoKCcvbG9naW4nKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3NmdWxseSBzaWduZWQgb3V0Jyk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZhaWxlZCB0byBzaWduIG91dCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU3RhdGVBZnRlckxvZ2luKHVzZXIpIHtcbiAgICB0aGlzLnNldFN0YXRlKHt1c2VyOiB1c2VyLCBpc0xvZ2dlZEluOiB0cnVlfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIGNoaWxkID0gUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW4sIHtcbiAgICAgIGlzTG9nZ2VkSW46IHRoaXMuc3RhdGUuaXNMb2dnZWRJbixcbiAgICAgIHVzZXI6IHRoaXMuc3RhdGUudXNlcixcbiAgICAgIHVwZGF0ZVN0YXRlQWZ0ZXJMb2dpbjogdGhpcy51cGRhdGVTdGF0ZUFmdGVyTG9naW4uYmluZCh0aGlzKVxuICAgIH0pO1xuXG4gICAgdmFyIHRvZ2dsZU5hdkJhcjtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc0xvZ2dlZEluKSB7XG4gICAgICB0b2dnbGVOYXZCYXIgPSBcbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cInJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XG4gICAgICAgICAgPExpbmsgdG89XCIvcHJvZ3Jlc3NcIj57dGhpcy5zdGF0ZS51c2VyLnVzZXJuYW1lfSdzIFByb2dyZXNzPC9MaW5rPlxuICAgICAgICAgIDxhIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2lnbk91dC5iaW5kKHRoaXMpfT5Mb2dvdXQ8L2E+XG4gICAgICAgIDwvdWw+XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvZ2dsZU5hdkJhciA9IFxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cIj5cbiAgICAgICAgICA8TGluayB0bz1cIi9sb2dpblwiPkxvZ2luPC9MaW5rPlxuICAgICAgICAgIDxMaW5rIHRvPVwiL3NpZ251cFwiPlNpZ24gVXA8L0xpbms+XG4gICAgICAgIDwvdWw+XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyLWZpeGVkXCI+XG4gICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJmbG93LXRleHQgZ3JleSBkYXJrZW4tMyBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2LXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgJm5ic3A7ICZuYnNwOyAmbmJzcDtcbiAgICAgICAgICAgICAgPExpbmsgdG89XCIvXCI+UGVyZmVjdCBQaXRjaDwvTGluaz5cbiAgICAgICAgICAgICAge3RvZ2dsZU5hdkJhcn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbmF2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7Y2hpbGR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG53aW5kb3cuSG9tZSA9IEhvbWU7Il19