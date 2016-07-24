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
      songs: window.songs,
      selectedSong: window.songs[0],
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
    key: 'onPlay',
    value: function onPlay(event) {
      var vocals = document.getElementById('vocals');
      var karaoke = document.getElementById('karaoke');

      if (vocals) {
        vocals.play();karaoke.play();
      } else {
        karaoke.play();
      }
    }
  }, {
    key: 'onPause',
    value: function onPause(event) {
      var vocals = document.getElementById('vocals');
      var karaoke = document.getElementById('karaoke');

      if (vocals) {
        vocals.pause();karaoke.pause();
      } else {
        karaoke.pause();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col l2' },
          React.createElement(PlayList, { songs: this.state.songs, onChooseSongClick: this.onChooseSongClick.bind(this), selectedSong: this.state.selectedSong })
        ),
        React.createElement(
          'div',
          { className: 'col l10', style: { background: 'url(' + this.state.selectedSong.background + ') center / cover', height: '720px' } },
          React.createElement(Main, { selectedSong: this.state.selectedSong, score: this.state.score, userInput: this.state.userInput, onPlay: this.onPlay.bind(this), onPause: this.onPause.bind(this) })
        )
      );
    }
  }]);

  return App;
}(React.Component);

window.App = App;

// 'url(' + this.state.selectedSong.background + ') center / cover'
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvQXBwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sRzs7O0FBQ0osZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxhQUFPLE9BQU8sS0FESDtBQUVYLG9CQUFjLE9BQU8sS0FBUCxDQUFhLENBQWIsQ0FGSDtBQUdYLGFBQU8sR0FISTtBQUlYLGlCQUFXO0FBSkEsS0FBYjtBQUhpQjtBQVNsQjs7OztzQ0FFaUIsSyxFQUFPO0FBQ3ZCLFVBQUksUUFBUSxNQUFNLE1BQU4sQ0FBYSxXQUF6QjtBQUNBLFVBQUksT0FBTyxJQUFYO0FBQ0EsV0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixVQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCO0FBQzdDLFlBQUksS0FBSyxLQUFMLEtBQWUsS0FBbkIsRUFBMEI7QUFDeEIsZUFBSyxRQUFMLENBQWM7QUFDWiwwQkFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQWpCO0FBREYsV0FBZDtBQUdEOztBQUVELFlBQUksVUFBVSxZQUFkLEVBQTRCO0FBQzFCLGVBQUssUUFBTCxDQUFjO0FBQ1osdUJBQVc7QUFEQyxXQUFkO0FBR0QsU0FKRCxNQUlPO0FBQ0wsZUFBSyxRQUFMLENBQWM7QUFDWix1QkFBVztBQURDLFdBQWQ7QUFHRDtBQUNGLE9BaEJEO0FBaUJEOzs7MkJBRU0sSyxFQUFPO0FBQ1osVUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsVUFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFkOztBQUVBLFVBQUksTUFBSixFQUFZO0FBQ1YsZUFBTyxJQUFQLEdBQWUsUUFBUSxJQUFSO0FBQ2hCLE9BRkQsTUFFTztBQUNMLGdCQUFRLElBQVI7QUFDRDtBQUNGOzs7NEJBRU8sSyxFQUFPO0FBQ2IsVUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsVUFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFkOztBQUVBLFVBQUksTUFBSixFQUFZO0FBQ1YsZUFBTyxLQUFQLEdBQWdCLFFBQVEsS0FBUjtBQUNqQixPQUZELE1BRU87QUFDTCxnQkFBUSxLQUFSO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFFBQWY7QUFDRSw4QkFBQyxRQUFELElBQVUsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUE1QixFQUFtQyxtQkFBbUIsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUF0RCxFQUF5RixjQUFjLEtBQUssS0FBTCxDQUFXLFlBQWxIO0FBREYsU0FERjtBQUlFO0FBQUE7QUFBQSxZQUFLLFdBQVUsU0FBZixFQUF5QixPQUFPLEVBQUMsWUFBWSxTQUFTLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsVUFBakMsR0FBOEMsa0JBQTNELEVBQStFLFFBQVEsT0FBdkYsRUFBaEM7QUFDRSw4QkFBQyxJQUFELElBQU0sY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUEvQixFQUE2QyxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQS9ELEVBQXNFLFdBQVcsS0FBSyxLQUFMLENBQVcsU0FBNUYsRUFBdUcsUUFBUSxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQS9HLEVBQXVJLFNBQVMsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixDQUFoSjtBQURGO0FBSkYsT0FERjtBQVVEOzs7O0VBbkVlLE1BQU0sUzs7QUFzRXhCLE9BQU8sR0FBUCxHQUFhLEdBQWI7O0FBRUEiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc29uZ3M6IHdpbmRvdy5zb25ncyxcbiAgICAgIHNlbGVjdGVkU29uZzogd2luZG93LnNvbmdzWzBdLFxuICAgICAgc2NvcmU6IDEwMCxcbiAgICAgIHVzZXJJbnB1dDogZmFsc2VcbiAgICB9O1xuICB9XG5cbiAgb25DaG9vc2VTb25nQ2xpY2soZXZlbnQpIHtcbiAgICB2YXIgdGl0bGUgPSBldmVudC50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgdmFyIHRoYXQgPSB0aGlzOyAgXG4gICAgdGhpcy5zdGF0ZS5zb25ncy5mb3JFYWNoKGZ1bmN0aW9uKHNvbmcsIGluZGV4KSB7XG4gICAgICBpZiAoc29uZy50aXRsZSA9PT0gdGl0bGUpIHtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgc2VsZWN0ZWRTb25nOiB0aGF0LnN0YXRlLnNvbmdzW2luZGV4XVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRpdGxlID09PSAnWW91ciBWb2ljZScpIHtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcklucHV0OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcklucHV0OiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uUGxheShldmVudCkge1xuICAgIHZhciB2b2NhbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9jYWxzJyk7XG4gICAgdmFyIGthcmFva2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2FyYW9rZScpO1xuXG4gICAgaWYgKHZvY2Fscykge1xuICAgICAgdm9jYWxzLnBsYXkoKTsga2FyYW9rZS5wbGF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGthcmFva2UucGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGF1c2UoZXZlbnQpIHtcbiAgICB2YXIgdm9jYWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvY2FscycpO1xuICAgIHZhciBrYXJhb2tlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2thcmFva2UnKTtcblxuICAgIGlmICh2b2NhbHMpIHtcbiAgICAgIHZvY2Fscy5wYXVzZSgpOyBrYXJhb2tlLnBhdXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGthcmFva2UucGF1c2UoKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGwyXCI+XG4gICAgICAgICAgPFBsYXlMaXN0IHNvbmdzPXt0aGlzLnN0YXRlLnNvbmdzfSBvbkNob29zZVNvbmdDbGljaz17dGhpcy5vbkNob29zZVNvbmdDbGljay5iaW5kKHRoaXMpfSBzZWxlY3RlZFNvbmc9e3RoaXMuc3RhdGUuc2VsZWN0ZWRTb25nfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsMTBcIiBzdHlsZT17e2JhY2tncm91bmQ6ICd1cmwoJyArIHRoaXMuc3RhdGUuc2VsZWN0ZWRTb25nLmJhY2tncm91bmQgKyAnKSBjZW50ZXIgLyBjb3ZlcicsIGhlaWdodDogJzcyMHB4JyB9fSA+XG4gICAgICAgICAgPE1haW4gc2VsZWN0ZWRTb25nPXt0aGlzLnN0YXRlLnNlbGVjdGVkU29uZ30gc2NvcmU9e3RoaXMuc3RhdGUuc2NvcmV9IHVzZXJJbnB1dD17dGhpcy5zdGF0ZS51c2VySW5wdXR9IG9uUGxheT17dGhpcy5vblBsYXkuYmluZCh0aGlzKX0gb25QYXVzZT17dGhpcy5vblBhdXNlLmJpbmQodGhpcyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG53aW5kb3cuQXBwID0gQXBwO1xuXG4vLyAndXJsKCcgKyB0aGlzLnN0YXRlLnNlbGVjdGVkU29uZy5iYWNrZ3JvdW5kICsgJykgY2VudGVyIC8gY292ZXInIl19