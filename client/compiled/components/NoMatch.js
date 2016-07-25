"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoMatch = function (_React$Component) {
  _inherits(NoMatch, _React$Component);

  function NoMatch(props) {
    _classCallCheck(this, NoMatch);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NoMatch).call(this, props));
  }

  _createClass(NoMatch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      browserHistory.push('/');
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "h3",
          null,
          "It seems you are lost, we will take you back home!"
        )
      );
    }
  }]);

  return NoMatch;
}(React.Component);

window.NoMatch = NoMatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvTm9NYXRjaC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLE87OztBQUNKLG1CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxzRkFDWCxLQURXO0FBRWxCOzs7O3dDQUVtQjtBQUNsQixxQkFBZSxJQUFmLENBQW9CLEdBQXBCO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxXQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLE9BREY7QUFLRDs7OztFQWZtQixNQUFNLFM7O0FBa0I1QixPQUFPLE9BQVAsR0FBaUIsT0FBakIiLCJmaWxlIjoiTm9NYXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5vTWF0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGJyb3dzZXJIaXN0b3J5LnB1c2goJy8nKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGgzPkl0IHNlZW1zIHlvdSBhcmUgbG9zdCwgd2Ugd2lsbCB0YWtlIHlvdSBiYWNrIGhvbWUhPC9oMz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxud2luZG93Lk5vTWF0Y2ggPSBOb01hdGNoOyJdfQ==