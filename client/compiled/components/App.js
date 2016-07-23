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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvQXBwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sRzs7O0FBQ0osZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxhQUFPLE1BQUssS0FBTCxDQUFXLEtBRFA7QUFFWCxvQkFBYyxNQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLENBQWpCLENBRkg7QUFHWCxhQUFPLEdBSEk7QUFJWCxpQkFBVztBQUpBLEtBQWI7QUFIaUI7QUFTbEI7Ozs7c0NBRWlCLEssRUFBTztBQUN2QixVQUFJLFFBQVEsTUFBTSxNQUFOLENBQWEsV0FBekI7QUFDQSxVQUFJLE9BQU8sSUFBWDtBQUNBLFdBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsT0FBakIsQ0FBeUIsVUFBUyxJQUFULEVBQWUsS0FBZixFQUFzQjtBQUM3QyxZQUFJLEtBQUssS0FBTCxLQUFlLEtBQW5CLEVBQTBCO0FBQ3hCLGVBQUssUUFBTCxDQUFjO0FBQ1osMEJBQWMsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixLQUFqQjtBQURGLFdBQWQ7QUFHRDs7QUFFRCxZQUFJLFVBQVUsWUFBZCxFQUE0QjtBQUMxQixlQUFLLFFBQUwsQ0FBYztBQUNaLHVCQUFXO0FBREMsV0FBZDtBQUdELFNBSkQsTUFJTztBQUNMLGVBQUssUUFBTCxDQUFjO0FBQ1osdUJBQVc7QUFEQyxXQUFkO0FBR0Q7QUFDRixPQWhCRDtBQWlCRDs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRSw0QkFBQyxJQUFELElBQU0sY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUEvQixFQUE2QyxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQS9ELEVBQXNFLFdBQVcsS0FBSyxLQUFMLENBQVcsU0FBNUYsR0FERjtBQUVFLDRCQUFDLFFBQUQsSUFBVSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQTVCLEVBQW1DLG1CQUFtQixLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBQXRELEVBQXlGLGNBQWMsS0FBSyxLQUFMLENBQVcsWUFBbEg7QUFGRixPQURGO0FBTUQ7Ozs7RUF6Q2UsTUFBTSxTOztBQTRDeEIsT0FBTyxHQUFQLEdBQWEsR0FBYiIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzb25nczogdGhpcy5wcm9wcy5zb25ncyxcbiAgICAgIHNlbGVjdGVkU29uZzogdGhpcy5wcm9wcy5zb25nc1swXSxcbiAgICAgIHNjb3JlOiAxMDAsXG4gICAgICB1c2VySW5wdXQ6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIG9uQ2hvb3NlU29uZ0NsaWNrKGV2ZW50KSB7XG4gICAgdmFyIHRpdGxlID0gZXZlbnQudGFyZ2V0LnRleHRDb250ZW50O1xuICAgIHZhciB0aGF0ID0gdGhpczsgIFxuICAgIHRoaXMuc3RhdGUuc29uZ3MuZm9yRWFjaChmdW5jdGlvbihzb25nLCBpbmRleCkge1xuICAgICAgaWYgKHNvbmcudGl0bGUgPT09IHRpdGxlKSB7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgIHNlbGVjdGVkU29uZzogdGhhdC5wcm9wcy5zb25nc1tpbmRleF1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aXRsZSA9PT0gJ1lvdXIgVm9pY2UnKSB7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJJbnB1dDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJJbnB1dDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxNYWluIHNlbGVjdGVkU29uZz17dGhpcy5zdGF0ZS5zZWxlY3RlZFNvbmd9IHNjb3JlPXt0aGlzLnN0YXRlLnNjb3JlfSB1c2VySW5wdXQ9e3RoaXMuc3RhdGUudXNlcklucHV0fS8+XG4gICAgICAgIDxQbGF5TGlzdCBzb25ncz17dGhpcy5wcm9wcy5zb25nc30gb25DaG9vc2VTb25nQ2xpY2s9e3RoaXMub25DaG9vc2VTb25nQ2xpY2suYmluZCh0aGlzKX0gc2VsZWN0ZWRTb25nPXt0aGlzLnN0YXRlLnNlbGVjdGVkU29uZ30vPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG53aW5kb3cuQXBwID0gQXBwOyJdfQ==