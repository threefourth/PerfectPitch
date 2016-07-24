'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).call(this, props));
  }

  _createClass(Home, [{
    key: 'handleSignOut',
    value: function handleSignOut() {
      $.ajax({
        url: '/signoutUser',
        type: 'GET',
        dataType: 'json',
        success: function success(data) {
          browserHistory.push('/login');
          console.log('successfully signed out');
        },
        error: function error(data) {
          console.error('failed to sign out');
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
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
              React.createElement(
                Link,
                { to: '/' },
                'Home'
              ),
              React.createElement(
                'ul',
                { className: 'right hide-on-med-and-down' },
                React.createElement(
                  Link,
                  { to: '/login' },
                  'Login'
                ),
                React.createElement(
                  'a',
                  { href: '/login', onClick: this.handleSignOut.bind(this) },
                  'Logout'
                ),
                React.createElement(
                  Link,
                  { to: '/signup' },
                  'Sign Up'
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          null,
          this.props.children
        )
      );
    }
  }]);

  return Home;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvSG9tZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEk7OztBQUNKLGdCQUFhLEtBQWIsRUFBb0I7QUFBQTs7QUFBQSxtRkFDWixLQURZO0FBRW5COzs7O29DQUVlO0FBQ2QsUUFBRSxJQUFGLENBQU87QUFDTCxhQUFLLGNBREE7QUFFTCxjQUFNLEtBRkQ7QUFHTCxrQkFBVSxNQUhMO0FBSUwsaUJBQVMsaUJBQVMsSUFBVCxFQUFlO0FBQ3RCLHlCQUFlLElBQWYsQ0FBb0IsUUFBcEI7QUFDQSxrQkFBUSxHQUFSLENBQVkseUJBQVo7QUFDRCxTQVBJO0FBUUwsZUFBTyxlQUFTLElBQVQsRUFBZTtBQUNwQixrQkFBUSxLQUFSLENBQWMsb0JBQWQ7QUFDRDtBQVZJLE9BQVA7QUFZRDs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGNBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLDBCQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUMsb0JBQUQ7QUFBQSxrQkFBTSxJQUFHLEdBQVQ7QUFBQTtBQUFBLGVBREY7QUFFRTtBQUFBO0FBQUEsa0JBQUksV0FBVSw0QkFBZDtBQUNFO0FBQUMsc0JBQUQ7QUFBQSxvQkFBTSxJQUFHLFFBQVQ7QUFBQTtBQUFBLGlCQURGO0FBRUU7QUFBQTtBQUFBLG9CQUFHLE1BQUssUUFBUixFQUFpQixTQUFTLEtBQUssYUFBTCxDQUFtQixJQUFuQixDQUF3QixJQUF4QixDQUExQjtBQUFBO0FBQUEsaUJBRkY7QUFHRTtBQUFDLHNCQUFEO0FBQUEsb0JBQU0sSUFBRyxTQUFUO0FBQUE7QUFBQTtBQUhGO0FBRkY7QUFERjtBQURGLFNBREY7QUFhRTtBQUFBO0FBQUE7QUFDRyxlQUFLLEtBQUwsQ0FBVztBQURkO0FBYkYsT0FERjtBQW1CRDs7OztFQXhDZ0IsTUFBTSxTIiwiZmlsZSI6IkhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgaGFuZGxlU2lnbk91dCgpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL3NpZ25vdXRVc2VyJywgXG4gICAgICB0eXBlOiAnR0VUJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGJyb3dzZXJIaXN0b3J5LnB1c2goJy9sb2dpbicpO1xuICAgICAgICBjb25zb2xlLmxvZygnc3VjY2Vzc2Z1bGx5IHNpZ25lZCBvdXQnKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdmYWlsZWQgdG8gc2lnbiBvdXQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItZml4ZWRcIj5cbiAgICAgICAgICA8bmF2IGNsYXNzTmFtZT1cImZsb3ctdGV4dCBncmV5IGRhcmtlbi0zIFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYtd3JhcHBlclwiPlxuICAgICAgICAgICAgICA8TGluayB0bz1cIi9cIj5Ib21lPC9MaW5rPlxuICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cIj5cbiAgICAgICAgICAgICAgICA8TGluayB0bz1cIi9sb2dpblwiPkxvZ2luPC9MaW5rPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvbG9naW5cIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVNpZ25PdXQuYmluZCh0aGlzKX0+TG9nb3V0PC9hPlxuICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL3NpZ251cFwiPlNpZ24gVXA8L0xpbms+XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25hdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSJdfQ==