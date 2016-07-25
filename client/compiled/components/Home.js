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
      user: {}
    };
    return _this;
  }

  _createClass(Home, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvSG9tZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEk7OztBQUNKLGdCQUFhLEtBQWIsRUFBb0I7QUFBQTs7QUFBQSx3RkFDWixLQURZOztBQUVsQixVQUFLLEtBQUwsR0FBYTtBQUNYLGtCQUFZLEtBREQ7QUFFWCxZQUFNO0FBRkssS0FBYjtBQUZrQjtBQU1uQjs7OztvQ0FFZTtBQUNkLFVBQUksT0FBTyxJQUFYO0FBQ0EsUUFBRSxJQUFGLENBQU87QUFDTCxhQUFLLGNBREE7QUFFTCxjQUFNLEtBRkQ7QUFHTCxrQkFBVSxNQUhMO0FBSUwsaUJBQVMsaUJBQVMsSUFBVCxFQUFlO0FBQ3RCLGVBQUssUUFBTCxDQUFjO0FBQ1osd0JBQVksS0FEQTtBQUVaLGtCQUFNO0FBRk0sV0FBZDtBQUlBLHlCQUFlLElBQWYsQ0FBb0IsUUFBcEI7QUFDQSxrQkFBUSxHQUFSLENBQVkseUJBQVo7QUFDRCxTQVhJO0FBWUwsZUFBTyxlQUFTLElBQVQsRUFBZTtBQUNwQixrQkFBUSxHQUFSLENBQVksb0JBQVo7QUFDRDtBQWRJLE9BQVA7QUFnQkQ7OzswQ0FFcUIsSSxFQUFNO0FBQzFCLFdBQUssUUFBTCxDQUFjLEVBQUMsTUFBTSxJQUFQLEVBQWEsWUFBWSxJQUF6QixFQUFkO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQUksUUFBUSxNQUFNLFlBQU4sQ0FBbUIsS0FBSyxLQUFMLENBQVcsUUFBOUIsRUFBd0M7QUFDbEQsb0JBQVksS0FBSyxLQUFMLENBQVcsVUFEMkI7QUFFbEQsY0FBTSxLQUFLLEtBQUwsQ0FBVyxJQUZpQztBQUdsRCwrQkFBdUIsS0FBSyxxQkFBTCxDQUEyQixJQUEzQixDQUFnQyxJQUFoQztBQUgyQixPQUF4QyxDQUFaOztBQU1BLFVBQUksWUFBSjtBQUNBLFVBQUksS0FBSyxLQUFMLENBQVcsVUFBZixFQUEyQjtBQUN6Qix1QkFDRTtBQUFBO0FBQUEsWUFBSSxXQUFVLDRCQUFkO0FBQ0U7QUFBQyxnQkFBRDtBQUFBLGNBQU0sSUFBRyxXQUFUO0FBQXNCLGlCQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFFBQXRDO0FBQUE7QUFBQSxXQURGO0FBRUU7QUFBQTtBQUFBLGNBQUcsU0FBUyxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBWjtBQUFBO0FBQUE7QUFGRixTQURGO0FBS0QsT0FORCxNQU1PO0FBQ0wsdUJBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSw0QkFBZDtBQUNFO0FBQUMsZ0JBQUQ7QUFBQSxjQUFNLElBQUcsUUFBVDtBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUMsZ0JBQUQ7QUFBQSxjQUFNLElBQUcsU0FBVDtBQUFBO0FBQUE7QUFGRixTQURGO0FBS0Q7O0FBRUQsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGNBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLDBCQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsYUFBZjtBQUFBO0FBRUU7QUFBQyxvQkFBRDtBQUFBLGtCQUFNLElBQUcsR0FBVDtBQUFBO0FBQUEsZUFGRjtBQUdHO0FBSEg7QUFERjtBQURGLFNBREY7QUFVRTtBQUFBO0FBQUE7QUFDRztBQURIO0FBVkYsT0FERjtBQWdCRDs7OztFQXZFZ0IsTUFBTSxTOztBQTBFekIsT0FBTyxJQUFQLEdBQWMsSUFBZCIsImZpbGUiOiJIb21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgSG9tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNMb2dnZWRJbjogZmFsc2UsXG4gICAgICB1c2VyOiB7fVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNpZ25PdXQoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvc2lnbm91dFVzZXInLCBcbiAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgaXNMb2dnZWRJbjogZmFsc2UsXG4gICAgICAgICAgdXNlcjoge31cbiAgICAgICAgfSk7XG4gICAgICAgIGJyb3dzZXJIaXN0b3J5LnB1c2goJy9sb2dpbicpO1xuICAgICAgICBjb25zb2xlLmxvZygnc3VjY2Vzc2Z1bGx5IHNpZ25lZCBvdXQnKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIHNpZ24gb3V0Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTdGF0ZUFmdGVyTG9naW4odXNlcikge1xuICAgIHRoaXMuc2V0U3RhdGUoe3VzZXI6IHVzZXIsIGlzTG9nZ2VkSW46IHRydWV9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgY2hpbGQgPSBSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbiwge1xuICAgICAgaXNMb2dnZWRJbjogdGhpcy5zdGF0ZS5pc0xvZ2dlZEluLFxuICAgICAgdXNlcjogdGhpcy5zdGF0ZS51c2VyLFxuICAgICAgdXBkYXRlU3RhdGVBZnRlckxvZ2luOiB0aGlzLnVwZGF0ZVN0YXRlQWZ0ZXJMb2dpbi5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgICB2YXIgdG9nZ2xlTmF2QmFyO1xuICAgIGlmICh0aGlzLnN0YXRlLmlzTG9nZ2VkSW4pIHtcbiAgICAgIHRvZ2dsZU5hdkJhciA9IFxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cIj5cbiAgICAgICAgICA8TGluayB0bz1cIi9wcm9ncmVzc1wiPnt0aGlzLnN0YXRlLnVzZXIudXNlcm5hbWV9J3MgUHJvZ3Jlc3M8L0xpbms+XG4gICAgICAgICAgPGEgb25DbGljaz17dGhpcy5oYW5kbGVTaWduT3V0LmJpbmQodGhpcyl9PkxvZ291dDwvYT5cbiAgICAgICAgPC91bD5cbiAgICB9IGVsc2Uge1xuICAgICAgdG9nZ2xlTmF2QmFyID0gXG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93blwiPlxuICAgICAgICAgIDxMaW5rIHRvPVwiL2xvZ2luXCI+TG9naW48L0xpbms+XG4gICAgICAgICAgPExpbmsgdG89XCIvc2lnbnVwXCI+U2lnbiBVcDwvTGluaz5cbiAgICAgICAgPC91bD5cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItZml4ZWRcIj5cbiAgICAgICAgICA8bmF2IGNsYXNzTmFtZT1cImZsb3ctdGV4dCBncmV5IGRhcmtlbi0zIFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAmbmJzcDsgJm5ic3A7ICZuYnNwO1xuICAgICAgICAgICAgICA8TGluayB0bz1cIi9cIj5QZXJmZWN0IFBpdGNoPC9MaW5rPlxuICAgICAgICAgICAgICB7dG9nZ2xlTmF2QmFyfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9uYXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHtjaGlsZH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbndpbmRvdy5Ib21lID0gSG9tZTsiXX0=