"use strict";

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
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "navbar-fixed" },
          React.createElement(
            "nav",
            { className: "flow-text grey darken-3 " },
            React.createElement(
              "div",
              { className: "nav-wrapper" },
              React.createElement(
                Link,
                { to: "/" },
                "Home"
              ),
              React.createElement(
                "ul",
                { className: "right hide-on-med-and-down" },
                React.createElement(
                  Link,
                  { to: "/login" },
                  "Login"
                ),
                React.createElement(
                  Link,
                  { to: "/login" },
                  "Logout"
                ),
                React.createElement(
                  Link,
                  { to: "/signup" },
                  "Sign Up"
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          null,
          this.props.children
        )
      );
    }
  }]);

  return Home;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvSG9tZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEk7OztBQUNKLGdCQUFhLEtBQWIsRUFBb0I7QUFBQTs7QUFBQSxtRkFDWixLQURZO0FBRW5COzs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGNBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLDBCQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUMsb0JBQUQ7QUFBQSxrQkFBTSxJQUFHLEdBQVQ7QUFBQTtBQUFBLGVBREY7QUFFRTtBQUFBO0FBQUEsa0JBQUksV0FBVSw0QkFBZDtBQUNFO0FBQUMsc0JBQUQ7QUFBQSxvQkFBTSxJQUFHLFFBQVQ7QUFBQTtBQUFBLGlCQURGO0FBRUU7QUFBQyxzQkFBRDtBQUFBLG9CQUFNLElBQUcsUUFBVDtBQUFBO0FBQUEsaUJBRkY7QUFHRTtBQUFDLHNCQUFEO0FBQUEsb0JBQU0sSUFBRyxTQUFUO0FBQUE7QUFBQTtBQUhGO0FBRkY7QUFERjtBQURGLFNBREY7QUFhRTtBQUFBO0FBQUE7QUFDRyxlQUFLLEtBQUwsQ0FBVztBQURkO0FBYkYsT0FERjtBQW1CRDs7OztFQXpCZ0IsTUFBTSxTIiwiZmlsZSI6IkhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1maXhlZFwiPlxuICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwiZmxvdy10ZXh0IGdyZXkgZGFya2VuLTMgXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgIDxMaW5rIHRvPVwiL1wiPkhvbWU8L0xpbms+XG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93blwiPlxuICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL2xvZ2luXCI+TG9naW48L0xpbms+XG4gICAgICAgICAgICAgICAgPExpbmsgdG89XCIvbG9naW5cIj5Mb2dvdXQ8L0xpbms+XG4gICAgICAgICAgICAgICAgPExpbmsgdG89XCIvc2lnbnVwXCI+U2lnbiBVcDwvTGluaz5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbmF2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59Il19