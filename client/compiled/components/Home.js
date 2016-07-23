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
          "nav",
          null,
          React.createElement(
            "ul",
            { role: "nav" },
            React.createElement(
              Link,
              { to: "/" },
              "Home"
            ),
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
        ),
        this.props.children
      );
    }
  }]);

  return Home;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvSG9tZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEk7OztBQUNKLGdCQUFhLEtBQWIsRUFBb0I7QUFBQTs7QUFBQSxtRkFDWixLQURZO0FBRW5COzs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBSSxNQUFLLEtBQVQ7QUFDRTtBQUFDLGtCQUFEO0FBQUEsZ0JBQU0sSUFBRyxHQUFUO0FBQUE7QUFBQSxhQURGO0FBRUU7QUFBQyxrQkFBRDtBQUFBLGdCQUFNLElBQUcsUUFBVDtBQUFBO0FBQUEsYUFGRjtBQUdFO0FBQUMsa0JBQUQ7QUFBQSxnQkFBTSxJQUFHLFFBQVQ7QUFBQTtBQUFBLGFBSEY7QUFJRTtBQUFDLGtCQUFEO0FBQUEsZ0JBQU0sSUFBRyxTQUFUO0FBQUE7QUFBQTtBQUpGO0FBREYsU0FERjtBQVVHLGFBQUssS0FBTCxDQUFXO0FBVmQsT0FERjtBQWNEOzs7O0VBcEJnQixNQUFNLFMiLCJmaWxlIjoiSG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxuYXY+XG4gICAgICAgICAgPHVsIHJvbGU9XCJuYXZcIj5cbiAgICAgICAgICAgIDxMaW5rIHRvPVwiL1wiPkhvbWU8L0xpbms+XG4gICAgICAgICAgICA8TGluayB0bz1cIi9sb2dpblwiPkxvZ2luPC9MaW5rPlxuICAgICAgICAgICAgPExpbmsgdG89XCIvbG9naW5cIj5Mb2dvdXQ8L0xpbms+XG4gICAgICAgICAgICA8TGluayB0bz1cIi9zaWdudXBcIj5TaWduIFVwPC9MaW5rPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvbmF2PlxuXG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSJdfQ==