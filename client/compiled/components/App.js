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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvQXBwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sRzs7O0FBQ0osZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxhQUFPLE1BQUssS0FBTCxDQUFXLEtBRFA7QUFFWCxvQkFBYyxNQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLENBQWpCLENBRkg7QUFHWCxhQUFPLEdBSEk7QUFJWCxpQkFBVztBQUpBLEtBQWI7O0FBSGlCO0FBVWxCOzs7O3dDQUVtQjtBQUNsQjtBQUNBLFVBQUksU0FBUyxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBO0FBQ0EsYUFBTyxNQUFQLEdBQWdCLEdBQWhCO0FBQ0Q7OztzQ0FFaUIsSyxFQUFPO0FBQ3ZCLFVBQUksUUFBUSxNQUFNLE1BQU4sQ0FBYSxXQUF6QjtBQUNBLFVBQUksT0FBTyxJQUFYO0FBQ0EsV0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixVQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCO0FBQzdDLFlBQUksS0FBSyxLQUFMLEtBQWUsS0FBbkIsRUFBMEI7QUFDeEIsZUFBSyxRQUFMLENBQWM7QUFDWiwwQkFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQWpCO0FBREYsV0FBZDtBQUdEOztBQUVELFlBQUksVUFBVSxZQUFkLEVBQTRCO0FBQzFCLGVBQUssUUFBTCxDQUFjO0FBQ1osdUJBQVc7QUFEQyxXQUFkO0FBR0QsU0FKRCxNQUlPO0FBQ0wsZUFBSyxRQUFMLENBQWM7QUFDWix1QkFBVztBQURDLFdBQWQ7QUFHRDtBQUNGLE9BaEJEO0FBaUJEOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFLDRCQUFDLElBQUQsSUFBTSxjQUFjLEtBQUssS0FBTCxDQUFXLFlBQS9CLEVBQTZDLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBL0QsRUFBc0UsV0FBVyxLQUFLLEtBQUwsQ0FBVyxTQUE1RixHQURGO0FBRUUsNEJBQUMsUUFBRCxJQUFVLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBNUIsRUFBbUMsbUJBQW1CLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBdEQsRUFBeUYsY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUFsSDtBQUZGLE9BREY7QUFNRDs7OztFQWpEZSxNQUFNLFM7O0FBb0R4QixPQUFPLEdBQVAsR0FBYSxHQUFiIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBzb25nczogdGhpcy5wcm9wcy5zb25ncyxcclxuICAgICAgc2VsZWN0ZWRTb25nOiB0aGlzLnByb3BzLnNvbmdzWzBdLFxyXG4gICAgICBzY29yZTogMTAwLFxyXG4gICAgICB1c2VySW5wdXQ6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgLy9nZXQgdGhlIGF1ZGlvIHBsYXllciB0aGF0IGlzIHBsYXlpbmcgb25seSB0aGUgdm9jYWxzIFxyXG4gICAgdmFyIHZvY2FscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidm9jYWxzXCIpO1xyXG4gICAgLy9zZXRzIHRoZSB2b2x1bWUgYXQgMCwgc28gdGhlIHZvY2FsIHBsYXllciBzdGFydHMgc2lsZW50XHJcbiAgICB2b2NhbHMudm9sdW1lID0gMC4wO1xyXG4gIH1cclxuXHJcbiAgb25DaG9vc2VTb25nQ2xpY2soZXZlbnQpIHtcclxuICAgIHZhciB0aXRsZSA9IGV2ZW50LnRhcmdldC50ZXh0Q29udGVudDtcclxuICAgIHZhciB0aGF0ID0gdGhpczsgIFxyXG4gICAgdGhpcy5zdGF0ZS5zb25ncy5mb3JFYWNoKGZ1bmN0aW9uKHNvbmcsIGluZGV4KSB7XHJcbiAgICAgIGlmIChzb25nLnRpdGxlID09PSB0aXRsZSkge1xyXG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgc2VsZWN0ZWRTb25nOiB0aGF0LnByb3BzLnNvbmdzW2luZGV4XVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGl0bGUgPT09ICdZb3VyIFZvaWNlJykge1xyXG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgdXNlcklucHV0OiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICB1c2VySW5wdXQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8TWFpbiBzZWxlY3RlZFNvbmc9e3RoaXMuc3RhdGUuc2VsZWN0ZWRTb25nfSBzY29yZT17dGhpcy5zdGF0ZS5zY29yZX0gdXNlcklucHV0PXt0aGlzLnN0YXRlLnVzZXJJbnB1dH0vPlxyXG4gICAgICAgIDxQbGF5TGlzdCBzb25ncz17dGhpcy5wcm9wcy5zb25nc30gb25DaG9vc2VTb25nQ2xpY2s9e3RoaXMub25DaG9vc2VTb25nQ2xpY2suYmluZCh0aGlzKX0gc2VsZWN0ZWRTb25nPXt0aGlzLnN0YXRlLnNlbGVjdGVkU29uZ30vPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG53aW5kb3cuQXBwID0gQXBwOyJdfQ==