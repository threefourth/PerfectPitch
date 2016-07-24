"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    _this.state = {
      songs: window.songs,
      selectedSong: window.songs[0],
      score: 100,
      userInput: false
    };
    return _this;
  }

  _createClass(App, [{
    key: "onChooseSongClick",
    value: function onChooseSongClick(event) {
      var title = event.target.textContent;
      var that = this;
      this.state.songs.forEach(function (song, index) {
        if (song.title === title) {
          that.setState({
            selectedSong: that.state.songs[index]
          });
        }

        if (title === 'Your Voice') {
          that.setState({
            userInput: true
          });
        } else {
          that.setState({
            userInput: false
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col l2" },
          React.createElement(PlayList, { songs: this.props.songs, onChooseSongClick: this.onChooseSongClick.bind(this), selectedSong: this.state.selectedSong })
        ),
        React.createElement(
          "div",
          { className: "col l10", style: { background: 'url(' + this.state.selectedSong.background + ') center / cover', height: '720px' } },
          React.createElement(Main, { selectedSong: this.state.selectedSong, score: this.state.score, userInput: this.state.userInput })
        )
      );
    }
  }]);

  return App;
}(React.Component);

window.App = App;

// 'url(' + this.state.selectedSong.background + ') center / cover'
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvQXBwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sRzs7O0FBQ0osZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxhQUFPLE9BQU8sS0FESDtBQUVYLG9CQUFjLE9BQU8sS0FBUCxDQUFhLENBQWIsQ0FGSDtBQUdYLGFBQU8sR0FISTtBQUlYLGlCQUFXO0FBSkEsS0FBYjtBQUhpQjtBQVNsQjs7OztzQ0FFaUIsSyxFQUFPO0FBQ3ZCLFVBQUksUUFBUSxNQUFNLE1BQU4sQ0FBYSxXQUF6QjtBQUNBLFVBQUksT0FBTyxJQUFYO0FBQ0EsV0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixVQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCO0FBQzdDLFlBQUksS0FBSyxLQUFMLEtBQWUsS0FBbkIsRUFBMEI7QUFDeEIsZUFBSyxRQUFMLENBQWM7QUFDWiwwQkFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQWpCO0FBREYsV0FBZDtBQUdEOztBQUVELFlBQUksVUFBVSxZQUFkLEVBQTRCO0FBQzFCLGVBQUssUUFBTCxDQUFjO0FBQ1osdUJBQVc7QUFEQyxXQUFkO0FBR0QsU0FKRCxNQUlPO0FBQ0wsZUFBSyxRQUFMLENBQWM7QUFDWix1QkFBVztBQURDLFdBQWQ7QUFHRDtBQUNGLE9BaEJEO0FBaUJEOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsS0FBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsUUFBZjtBQUNFLDhCQUFDLFFBQUQsSUFBVSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQTVCLEVBQW1DLG1CQUFtQixLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBQXRELEVBQXlGLGNBQWMsS0FBSyxLQUFMLENBQVcsWUFBbEg7QUFERixTQURGO0FBSUU7QUFBQTtBQUFBLFlBQUssV0FBVSxTQUFmLEVBQXlCLE9BQU8sRUFBQyxZQUFZLFNBQVMsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixVQUFqQyxHQUE4QyxrQkFBM0QsRUFBK0UsUUFBUSxPQUF2RixFQUFoQztBQUNFLDhCQUFDLElBQUQsSUFBTSxjQUFjLEtBQUssS0FBTCxDQUFXLFlBQS9CLEVBQTZDLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBL0QsRUFBc0UsV0FBVyxLQUFLLEtBQUwsQ0FBVyxTQUE1RjtBQURGO0FBSkYsT0FERjtBQVVEOzs7O0VBN0NlLE1BQU0sUzs7QUFnRHhCLE9BQU8sR0FBUCxHQUFhLEdBQWI7O0FBRUEiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc29uZ3M6IHdpbmRvdy5zb25ncyxcbiAgICAgIHNlbGVjdGVkU29uZzogd2luZG93LnNvbmdzWzBdLFxuICAgICAgc2NvcmU6IDEwMCxcbiAgICAgIHVzZXJJbnB1dDogZmFsc2VcbiAgICB9O1xuICB9XG5cbiAgb25DaG9vc2VTb25nQ2xpY2soZXZlbnQpIHtcbiAgICB2YXIgdGl0bGUgPSBldmVudC50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgdmFyIHRoYXQgPSB0aGlzOyAgXG4gICAgdGhpcy5zdGF0ZS5zb25ncy5mb3JFYWNoKGZ1bmN0aW9uKHNvbmcsIGluZGV4KSB7XG4gICAgICBpZiAoc29uZy50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgc2VsZWN0ZWRTb25nOiB0aGF0LnN0YXRlLnNvbmdzW2luZGV4XVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRpdGxlID09PSAnWW91ciBWb2ljZScpIHtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcklucHV0OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcklucHV0OiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbDJcIj5cbiAgICAgICAgICA8UGxheUxpc3Qgc29uZ3M9e3RoaXMucHJvcHMuc29uZ3N9IG9uQ2hvb3NlU29uZ0NsaWNrPXt0aGlzLm9uQ2hvb3NlU29uZ0NsaWNrLmJpbmQodGhpcyl9IHNlbGVjdGVkU29uZz17dGhpcy5zdGF0ZS5zZWxlY3RlZFNvbmd9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGwxMFwiIHN0eWxlPXt7YmFja2dyb3VuZDogJ3VybCgnICsgdGhpcy5zdGF0ZS5zZWxlY3RlZFNvbmcuYmFja2dyb3VuZCArICcpIGNlbnRlciAvIGNvdmVyJywgaGVpZ2h0OiAnNzIwcHgnIH19ID5cbiAgICAgICAgICA8TWFpbiBzZWxlY3RlZFNvbmc9e3RoaXMuc3RhdGUuc2VsZWN0ZWRTb25nfSBzY29yZT17dGhpcy5zdGF0ZS5zY29yZX0gdXNlcklucHV0PXt0aGlzLnN0YXRlLnVzZXJJbnB1dH0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxud2luZG93LkFwcCA9IEFwcDtcblxuLy8gJ3VybCgnICsgdGhpcy5zdGF0ZS5zZWxlY3RlZFNvbmcuYmFja2dyb3VuZCArICcpIGNlbnRlciAvIGNvdmVyJyJdfQ==