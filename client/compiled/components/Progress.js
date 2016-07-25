"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Progress = function (_React$Component) {
  _inherits(Progress, _React$Component);

  function Progress(props) {
    _classCallCheck(this, Progress);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Progress).call(this, props));
  }

  _createClass(Progress, [{
    key: "render",
    value: function render() {
      var username = '';
      var scores = [];

      if (this.props.user) {
        username = this.props.user.username;
        scores = this.props.user.scores;
      }

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "h3",
          null,
          " Hello, ",
          username,
          "!"
        ),
        React.createElement("br", null),
        React.createElement(
          "h6",
          null,
          " here is a table of all the songs you have sang so far with your best scores to date"
        ),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(
          "table",
          null,
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                null,
                "Song"
              ),
              React.createElement(
                "th",
                null,
                "Best Score"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            scores.map(function (obj, index) {
              return React.createElement(
                "tr",
                { key: index },
                React.createElement(
                  "td",
                  null,
                  obj.title
                ),
                React.createElement(
                  "td",
                  null,
                  obj.score
                )
              );
            })
          )
        )
      );
    }
  }]);

  return Progress;
}(React.Component);

window.Progress = Progress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUHJvZ3Jlc3MuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxROzs7QUFDSixvQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVztBQUVsQjs7Ozs2QkFFUTtBQUNQLFVBQUksV0FBVyxFQUFmO0FBQ0EsVUFBSSxTQUFTLEVBQWI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFmLEVBQXFCO0FBQ25CLG1CQUFXLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsUUFBM0I7QUFDQSxpQkFBUyxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLE1BQXpCO0FBQ0Q7O0FBRUQsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLFdBQWY7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFhLGtCQUFiO0FBQUE7QUFBQSxTQURGO0FBRUUsdUNBRkY7QUFHRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSEY7QUFJRSx1Q0FKRjtBQUtFLHVDQUxGO0FBTUU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZGO0FBREYsV0FERjtBQU9FO0FBQUE7QUFBQTtBQUNHLG1CQUFPLEdBQVAsQ0FBVyxVQUFDLEdBQUQsRUFBTSxLQUFOO0FBQUEscUJBQ1Y7QUFBQTtBQUFBLGtCQUFJLEtBQUssS0FBVDtBQUNFO0FBQUE7QUFBQTtBQUFLLHNCQUFJO0FBQVQsaUJBREY7QUFFRTtBQUFBO0FBQUE7QUFBSyxzQkFBSTtBQUFUO0FBRkYsZUFEVTtBQUFBLGFBQVg7QUFESDtBQVBGO0FBTkYsT0FERjtBQXlCRDs7OztFQXZDb0IsTUFBTSxTOztBQTBDN0IsT0FBTyxRQUFQLEdBQWtCLFFBQWxCIiwiZmlsZSI6IlByb2dyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUHJvZ3Jlc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgdXNlcm5hbWUgPSAnJztcbiAgICB2YXIgc2NvcmVzID0gW107XG5cbiAgICBpZiAodGhpcy5wcm9wcy51c2VyKSB7XG4gICAgICB1c2VybmFtZSA9IHRoaXMucHJvcHMudXNlci51c2VybmFtZTtcbiAgICAgIHNjb3JlcyA9IHRoaXMucHJvcHMudXNlci5zY29yZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxoMz4gSGVsbG8sIHt1c2VybmFtZX0hPC9oMz5cbiAgICAgICAgPGJyPjwvYnI+XG4gICAgICAgIDxoNj4gaGVyZSBpcyBhIHRhYmxlIG9mIGFsbCB0aGUgc29uZ3MgeW91IGhhdmUgc2FuZyBzbyBmYXIgd2l0aCB5b3VyIGJlc3Qgc2NvcmVzIHRvIGRhdGU8L2g2PlxuICAgICAgICA8YnI+PC9icj5cbiAgICAgICAgPGJyPjwvYnI+XG4gICAgICAgIDx0YWJsZT5cbiAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0aD5Tb25nPC90aD5cbiAgICAgICAgICAgICAgPHRoPkJlc3QgU2NvcmU8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgIHtzY29yZXMubWFwKChvYmosIGluZGV4KSA9PlxuICAgICAgICAgICAgICA8dHIga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgICAgPHRkPntvYmoudGl0bGV9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+e29iai5zY29yZX08L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG53aW5kb3cuUHJvZ3Jlc3MgPSBQcm9ncmVzcztcblxuIl19