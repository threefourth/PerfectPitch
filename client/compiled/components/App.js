'use strict';

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
    key: 'onChooseSongClick',
    value: function onChooseSongClick(event) {
      var title = event.target.textContent;
      var that = this;
      console.log('this.state.songs is', this.state.songs);
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
      console.log('this.state.selectedSong is', this.state.selectedSong);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Main, { selectedSong: this.state.selectedSong, score: this.state.score, userInput: this.state.userInput }),
        React.createElement(PlayList, { songs: this.props.songs, onChooseSongClick: this.onChooseSongClick.bind(this), selectedSong: this.state.selectedSong })
      );
    }
  }]);

  return App;
}(React.Component);

window.App = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvQXBwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sRzs7O0FBQ0osZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxhQUFPLE1BQUssS0FBTCxDQUFXLEtBRFA7QUFFWCxvQkFBYyxNQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLENBQWpCLENBRkg7QUFHWCxhQUFPLEdBSEk7QUFJWCxpQkFBVztBQUpBLEtBQWI7QUFIaUI7QUFTbEI7Ozs7c0NBRWlCLEssRUFBTztBQUN2QixVQUFJLFFBQVEsTUFBTSxNQUFOLENBQWEsV0FBekI7QUFDQSxVQUFJLE9BQU8sSUFBWDtBQUNBLGNBQVEsR0FBUixDQUFZLHFCQUFaLEVBQW1DLEtBQUssS0FBTCxDQUFXLEtBQTlDO0FBQ0EsV0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixVQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCO0FBQzdDLFlBQUksS0FBSyxLQUFMLEtBQWUsS0FBbkIsRUFBMEI7QUFDeEIsZUFBSyxRQUFMLENBQWM7QUFDWiwwQkFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQWpCO0FBREYsV0FBZDtBQUdEOztBQUVELFlBQUksVUFBVSxZQUFkLEVBQTRCO0FBQzFCLGVBQUssUUFBTCxDQUFjO0FBQ1osdUJBQVc7QUFEQyxXQUFkO0FBR0QsU0FKRCxNQUlPO0FBQ0wsZUFBSyxRQUFMLENBQWM7QUFDWix1QkFBVztBQURDLFdBQWQ7QUFHRDtBQUNGLE9BaEJEO0FBaUJBLGNBQVEsR0FBUixDQUFZLDRCQUFaLEVBQTBDLEtBQUssS0FBTCxDQUFXLFlBQXJEO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0UsNEJBQUMsSUFBRCxJQUFNLGNBQWMsS0FBSyxLQUFMLENBQVcsWUFBL0IsRUFBNkMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUEvRCxFQUFzRSxXQUFXLEtBQUssS0FBTCxDQUFXLFNBQTVGLEdBREY7QUFFRSw0QkFBQyxRQUFELElBQVUsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUE1QixFQUFtQyxtQkFBbUIsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUF0RCxFQUF5RixjQUFjLEtBQUssS0FBTCxDQUFXLFlBQWxIO0FBRkYsT0FERjtBQU1EOzs7O0VBM0NlLE1BQU0sUzs7QUE4Q3hCLE9BQU8sR0FBUCxHQUFhLEdBQWIiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc29uZ3M6IHRoaXMucHJvcHMuc29uZ3MsXG4gICAgICBzZWxlY3RlZFNvbmc6IHRoaXMucHJvcHMuc29uZ3NbMF0sXG4gICAgICBzY29yZTogMTAwLFxuICAgICAgdXNlcklucHV0OiBmYWxzZVxuICAgIH07XG4gIH1cblxuICBvbkNob29zZVNvbmdDbGljayhldmVudCkge1xuICAgIHZhciB0aXRsZSA9IGV2ZW50LnRhcmdldC50ZXh0Q29udGVudDtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgY29uc29sZS5sb2coJ3RoaXMuc3RhdGUuc29uZ3MgaXMnLCB0aGlzLnN0YXRlLnNvbmdzKTtcbiAgICB0aGlzLnN0YXRlLnNvbmdzLmZvckVhY2goZnVuY3Rpb24oc29uZywgaW5kZXgpIHtcbiAgICAgIGlmIChzb25nLnRpdGxlID09PSB0aXRsZSkge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICBzZWxlY3RlZFNvbmc6IHRoYXQucHJvcHMuc29uZ3NbaW5kZXhdXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGl0bGUgPT09ICdZb3VyIFZvaWNlJykge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VySW5wdXQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VySW5wdXQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKCd0aGlzLnN0YXRlLnNlbGVjdGVkU29uZyBpcycsIHRoaXMuc3RhdGUuc2VsZWN0ZWRTb25nKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPE1haW4gc2VsZWN0ZWRTb25nPXt0aGlzLnN0YXRlLnNlbGVjdGVkU29uZ30gc2NvcmU9e3RoaXMuc3RhdGUuc2NvcmV9IHVzZXJJbnB1dD17dGhpcy5zdGF0ZS51c2VySW5wdXR9Lz5cbiAgICAgICAgPFBsYXlMaXN0IHNvbmdzPXt0aGlzLnByb3BzLnNvbmdzfSBvbkNob29zZVNvbmdDbGljaz17dGhpcy5vbkNob29zZVNvbmdDbGljay5iaW5kKHRoaXMpfSBzZWxlY3RlZFNvbmc9e3RoaXMuc3RhdGUuc2VsZWN0ZWRTb25nfS8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbndpbmRvdy5BcHAgPSBBcHA7Il19