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
      songs: _this.props.songs,
      selectedSong: _this.props.songs[0],
      score: 100,
      userInput: false
    };

    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //get the audio player that is playing only the vocals 
      var vocals = document.getElementById("vocals");
      //sets the volume at 0, so the vocal player starts silent
      vocals.volume = 0.0;
    }
  }, {
    key: "onChooseSongClick",
    value: function onChooseSongClick(event) {
      var title = event.target.textContent;
      var that = this;
      this.state.songs.forEach(function (song, index) {
        if (song.title === title) {
          that.setState({
            selectedSong: that.props.songs[index]
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
        null,
        React.createElement(Main, { selectedSong: this.state.selectedSong, score: this.state.score, userInput: this.state.userInput }),
        React.createElement(PlayList, { songs: this.props.songs, onChooseSongClick: this.onChooseSongClick.bind(this), selectedSong: this.state.selectedSong })
      );
    }
  }]);

  return App;
}(React.Component);

window.App = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvQXBwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sRzs7O0FBQ0osZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxhQUFPLE1BQUssS0FBTCxDQUFXLEtBRFA7QUFFWCxvQkFBYyxNQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLENBQWpCLENBRkg7QUFHWCxhQUFPLEdBSEk7QUFJWCxpQkFBVztBQUpBLEtBQWI7O0FBSGlCO0FBVWxCOzs7O3dDQUVtQjtBQUNsQjtBQUNBLFVBQUksU0FBUyxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBO0FBQ0EsYUFBTyxNQUFQLEdBQWdCLEdBQWhCO0FBQ0Q7OztzQ0FFaUIsSyxFQUFPO0FBQ3ZCLFVBQUksUUFBUSxNQUFNLE1BQU4sQ0FBYSxXQUF6QjtBQUNBLFVBQUksT0FBTyxJQUFYO0FBQ0EsV0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixVQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCO0FBQzdDLFlBQUksS0FBSyxLQUFMLEtBQWUsS0FBbkIsRUFBMEI7QUFDeEIsZUFBSyxRQUFMLENBQWM7QUFDWiwwQkFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQWpCO0FBREYsV0FBZDtBQUdEOztBQUVELFlBQUksVUFBVSxZQUFkLEVBQTRCO0FBQzFCLGVBQUssUUFBTCxDQUFjO0FBQ1osdUJBQVc7QUFEQyxXQUFkO0FBR0QsU0FKRCxNQUlPO0FBQ0wsZUFBSyxRQUFMLENBQWM7QUFDWix1QkFBVztBQURDLFdBQWQ7QUFHRDtBQUNGLE9BaEJEO0FBaUJEOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFLDRCQUFDLElBQUQsSUFBTSxjQUFjLEtBQUssS0FBTCxDQUFXLFlBQS9CLEVBQTZDLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBL0QsRUFBc0UsV0FBVyxLQUFLLEtBQUwsQ0FBVyxTQUE1RixHQURGO0FBRUUsNEJBQUMsUUFBRCxJQUFVLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBNUIsRUFBbUMsbUJBQW1CLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBdEQsRUFBeUYsY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUFsSDtBQUZGLE9BREY7QUFNRDs7OztFQWpEZSxNQUFNLFM7O0FBb0R4QixPQUFPLEdBQVAsR0FBYSxHQUFiIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNvbmdzOiB0aGlzLnByb3BzLnNvbmdzLFxuICAgICAgc2VsZWN0ZWRTb25nOiB0aGlzLnByb3BzLnNvbmdzWzBdLFxuICAgICAgc2NvcmU6IDEwMCxcbiAgICAgIHVzZXJJbnB1dDogZmFsc2VcbiAgICB9O1xuXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvL2dldCB0aGUgYXVkaW8gcGxheWVyIHRoYXQgaXMgcGxheWluZyBvbmx5IHRoZSB2b2NhbHMgXG4gICAgdmFyIHZvY2FscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidm9jYWxzXCIpO1xuICAgIC8vc2V0cyB0aGUgdm9sdW1lIGF0IDAsIHNvIHRoZSB2b2NhbCBwbGF5ZXIgc3RhcnRzIHNpbGVudFxuICAgIHZvY2Fscy52b2x1bWUgPSAwLjA7XG4gIH1cblxuICBvbkNob29zZVNvbmdDbGljayhldmVudCkge1xuICAgIHZhciB0aXRsZSA9IGV2ZW50LnRhcmdldC50ZXh0Q29udGVudDtcbiAgICB2YXIgdGhhdCA9IHRoaXM7ICBcbiAgICB0aGlzLnN0YXRlLnNvbmdzLmZvckVhY2goZnVuY3Rpb24oc29uZywgaW5kZXgpIHtcbiAgICAgIGlmIChzb25nLnRpdGxlID09PSB0aXRsZSkge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICBzZWxlY3RlZFNvbmc6IHRoYXQucHJvcHMuc29uZ3NbaW5kZXhdXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGl0bGUgPT09ICdZb3VyIFZvaWNlJykge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VySW5wdXQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VySW5wdXQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TWFpbiBzZWxlY3RlZFNvbmc9e3RoaXMuc3RhdGUuc2VsZWN0ZWRTb25nfSBzY29yZT17dGhpcy5zdGF0ZS5zY29yZX0gdXNlcklucHV0PXt0aGlzLnN0YXRlLnVzZXJJbnB1dH0vPlxuICAgICAgICA8UGxheUxpc3Qgc29uZ3M9e3RoaXMucHJvcHMuc29uZ3N9IG9uQ2hvb3NlU29uZ0NsaWNrPXt0aGlzLm9uQ2hvb3NlU29uZ0NsaWNrLmJpbmQodGhpcyl9IHNlbGVjdGVkU29uZz17dGhpcy5zdGF0ZS5zZWxlY3RlZFNvbmd9Lz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxud2luZG93LkFwcCA9IEFwcDsiXX0=