'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvSG9tZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEk7OztBQUNKLGdCQUFhLEtBQWIsRUFBb0I7QUFBQTs7QUFBQSx3RkFDWixLQURZOztBQUVsQixVQUFLLEtBQUwsR0FBYTtBQUNYLGtCQUFZLEtBREQ7QUFFWCxZQUFNO0FBRkssS0FBYjtBQUZrQjtBQU1uQjs7Ozt3Q0FFbUI7QUFDbEIsVUFBSSxPQUFPLElBQVg7QUFDQSxRQUFFLElBQUYsQ0FBTztBQUNMLGFBQUssWUFEQTtBQUVMLGNBQU0sS0FGRDtBQUdMLGtCQUFVLE1BSEw7QUFJTCxpQkFBUyxpQkFBUyxJQUFULEVBQWU7QUFDdEIsY0FBSSxJQUFKLEVBQVU7QUFDUixpQkFBSyxRQUFMLENBQWM7QUFDWiwwQkFBWSxJQURBO0FBRVosb0JBQU07QUFGTSxhQUFkO0FBSUQ7QUFDRixTQVhJO0FBWUwsZUFBTyxlQUFTLEtBQVQsRUFBZ0IsVUFBaEIsRUFBNEIsTUFBNUIsRUFBbUM7QUFDeEMsa0JBQVEsR0FBUixDQUFZLHlCQUFaLEVBQXVDLE1BQXZDO0FBQ0Q7QUFkSSxPQUFQO0FBZ0JEOzs7b0NBRWU7QUFDZCxVQUFJLE9BQU8sSUFBWDtBQUNBLFFBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSyxjQURBO0FBRUwsY0FBTSxLQUZEO0FBR0wsa0JBQVUsTUFITDtBQUlMLGlCQUFTLGlCQUFTLElBQVQsRUFBZTtBQUN0QixlQUFLLFFBQUwsQ0FBYztBQUNaLHdCQUFZLEtBREE7QUFFWixrQkFBTTtBQUZNLFdBQWQ7QUFJQSx5QkFBZSxJQUFmLENBQW9CLFFBQXBCO0FBQ0QsU0FWSTtBQVdMLGVBQU8sZUFBUyxJQUFULEVBQWU7QUFDcEIsa0JBQVEsR0FBUixDQUFZLG9CQUFaO0FBQ0Q7QUFiSSxPQUFQO0FBZUQ7OzswQ0FFcUIsSSxFQUFNO0FBQzFCLFdBQUssUUFBTCxDQUFjLEVBQUMsTUFBTSxJQUFQLEVBQWEsWUFBWSxJQUF6QixFQUFkO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQUksUUFBUSxNQUFNLFlBQU4sQ0FBbUIsS0FBSyxLQUFMLENBQVcsUUFBOUIsRUFBd0M7QUFDbEQsb0JBQVksS0FBSyxLQUFMLENBQVcsVUFEMkI7QUFFbEQsY0FBTSxLQUFLLEtBQUwsQ0FBVyxJQUZpQztBQUdsRCwrQkFBdUIsS0FBSyxxQkFBTCxDQUEyQixJQUEzQixDQUFnQyxJQUFoQztBQUgyQixPQUF4QyxDQUFaOztBQU1BLFVBQUksWUFBSjtBQUNBLFVBQUksS0FBSyxLQUFMLENBQVcsVUFBZixFQUEyQjtBQUN6Qix1QkFDRTtBQUFBO0FBQUEsWUFBSSxXQUFVLDRCQUFkO0FBQ0U7QUFBQyxnQkFBRDtBQUFBLGNBQU0sSUFBRyxXQUFUO0FBQXNCLGlCQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFFBQXRDO0FBQUE7QUFBQSxXQURGO0FBRUU7QUFBQTtBQUFBLGNBQUcsU0FBUyxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBWjtBQUFBO0FBQUE7QUFGRixTQURGO0FBS0QsT0FORCxNQU1PO0FBQ0wsdUJBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSw0QkFBZDtBQUNFO0FBQUMsZ0JBQUQ7QUFBQSxjQUFNLElBQUcsUUFBVDtBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUMsZ0JBQUQ7QUFBQSxjQUFNLElBQUcsU0FBVDtBQUFBO0FBQUE7QUFGRixTQURGO0FBS0Q7O0FBRUQsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGNBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLDBCQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsYUFBZjtBQUFBO0FBRUU7QUFBQyxvQkFBRDtBQUFBLGtCQUFNLElBQUcsR0FBVDtBQUFBO0FBQUEsZUFGRjtBQUdHO0FBSEg7QUFERjtBQURGLFNBREY7QUFVRTtBQUFBO0FBQUE7QUFDRztBQURIO0FBVkYsT0FERjtBQWdCRDs7OztFQTFGZ0IsTUFBTSxTOztBQTZGekIsT0FBTyxJQUFQLEdBQWMsSUFBZCIsImZpbGUiOiJIb21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgSG9tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNMb2dnZWRJbjogZmFsc2UsXG4gICAgICB1c2VyOiBudWxsXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvY2hlY2tVc2VyJywgXG4gICAgICB0eXBlOiAnR0VUJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc0xvZ2dlZEluOiB0cnVlLFxuICAgICAgICAgICAgdXNlcjogZGF0YVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkIEdFVCAvY2hlY2tVc2VyOiAnLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTaWduT3V0KCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL3NpZ25vdXRVc2VyJywgXG4gICAgICB0eXBlOiAnR0VUJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgIGlzTG9nZ2VkSW46IGZhbHNlLFxuICAgICAgICAgIHVzZXI6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyb3dzZXJIaXN0b3J5LnB1c2goJy9sb2dpbicpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmYWlsZWQgdG8gc2lnbiBvdXQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXRlQWZ0ZXJMb2dpbih1c2VyKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dXNlcjogdXNlciwgaXNMb2dnZWRJbjogdHJ1ZX0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBjaGlsZCA9IFJlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuLCB7XG4gICAgICBpc0xvZ2dlZEluOiB0aGlzLnN0YXRlLmlzTG9nZ2VkSW4sXG4gICAgICB1c2VyOiB0aGlzLnN0YXRlLnVzZXIsXG4gICAgICB1cGRhdGVTdGF0ZUFmdGVyTG9naW46IHRoaXMudXBkYXRlU3RhdGVBZnRlckxvZ2luLmJpbmQodGhpcylcbiAgICB9KTtcblxuICAgIHZhciB0b2dnbGVOYXZCYXI7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNMb2dnZWRJbikge1xuICAgICAgdG9nZ2xlTmF2QmFyID0gXG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93blwiPlxuICAgICAgICAgIDxMaW5rIHRvPVwiL3Byb2dyZXNzXCI+e3RoaXMuc3RhdGUudXNlci51c2VybmFtZX0ncyBQcm9ncmVzczwvTGluaz5cbiAgICAgICAgICA8YSBvbkNsaWNrPXt0aGlzLmhhbmRsZVNpZ25PdXQuYmluZCh0aGlzKX0+TG9nb3V0PC9hPlxuICAgICAgICA8L3VsPlxuICAgIH0gZWxzZSB7XG4gICAgICB0b2dnbGVOYXZCYXIgPSBcbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cInJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXCI+XG4gICAgICAgICAgPExpbmsgdG89XCIvbG9naW5cIj5Mb2dpbjwvTGluaz5cbiAgICAgICAgICA8TGluayB0bz1cIi9zaWdudXBcIj5TaWduIFVwPC9MaW5rPlxuICAgICAgICA8L3VsPlxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1maXhlZFwiPlxuICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwiZmxvdy10ZXh0IGdyZXkgZGFya2VuLTMgXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICZuYnNwOyAmbmJzcDsgJm5ic3A7XG4gICAgICAgICAgICAgIDxMaW5rIHRvPVwiL1wiPlBlcmZlY3QgUGl0Y2g8L0xpbms+XG4gICAgICAgICAgICAgIHt0b2dnbGVOYXZCYXJ9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25hdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge2NoaWxkfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxud2luZG93LkhvbWUgPSBIb21lO1xuXG4iXX0=