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
    key: 'onStop',
    value: function onStop(event) {
      console.log('stopping!!!!');
      var vocals = document.getElementById('vocals');
      var karaoke = document.getElementById('karaoke');

      if (vocals) {
        vocals.pause();karaoke.pause();
        vocals.currentTime = 0;
        karaoke.currentTime = 0;
      } else {
        karaoke.pause();
        karaoke.currentTime = 0;
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
          React.createElement(Main, { selectedSong: this.state.selectedSong, score: this.state.score, userInput: this.state.userInput, onPlay: this.onPlay.bind(this), onPause: this.onPause.bind(this), onStop: this.onStop.bind(this) })
        )
      );
    }
  }]);

  return App;
}(React.Component);

window.App = App;

// 'url(' + this.state.selectedSong.background + ') center / cover'
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvQXBwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sRzs7O0FBQ0osZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxhQUFPLE9BQU8sS0FESDtBQUVYLG9CQUFjLE9BQU8sS0FBUCxDQUFhLENBQWIsQ0FGSDtBQUdYLGFBQU8sR0FISTtBQUlYLGlCQUFXO0FBSkEsS0FBYjtBQUhpQjtBQVNsQjs7OztzQ0FFaUIsSyxFQUFPO0FBQ3ZCLFVBQUksUUFBUSxNQUFNLE1BQU4sQ0FBYSxXQUF6QjtBQUNBLFVBQUksT0FBTyxJQUFYO0FBQ0EsV0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixVQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCO0FBQzdDLFlBQUksS0FBSyxLQUFMLEtBQWUsS0FBbkIsRUFBMEI7QUFDeEIsZUFBSyxRQUFMLENBQWM7QUFDWiwwQkFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQWpCO0FBREYsV0FBZDtBQUdEOztBQUVELFlBQUksVUFBVSxZQUFkLEVBQTRCO0FBQzFCLGVBQUssUUFBTCxDQUFjO0FBQ1osdUJBQVc7QUFEQyxXQUFkO0FBR0QsU0FKRCxNQUlPO0FBQ0wsZUFBSyxRQUFMLENBQWM7QUFDWix1QkFBVztBQURDLFdBQWQ7QUFHRDtBQUNGLE9BaEJEO0FBaUJEOzs7MkJBRU0sSyxFQUFPO0FBQ1osVUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsVUFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFkOztBQUVBLFVBQUksTUFBSixFQUFZO0FBQ1YsZUFBTyxJQUFQLEdBQWUsUUFBUSxJQUFSO0FBQ2hCLE9BRkQsTUFFTztBQUNMLGdCQUFRLElBQVI7QUFDRDtBQUNGOzs7NEJBRU8sSyxFQUFPO0FBQ2IsVUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsVUFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFkOztBQUVBLFVBQUksTUFBSixFQUFZO0FBQ1YsZUFBTyxLQUFQLEdBQWdCLFFBQVEsS0FBUjtBQUNqQixPQUZELE1BRU87QUFDTCxnQkFBUSxLQUFSO0FBQ0Q7QUFDRjs7OzJCQUVNLEssRUFBTztBQUNaLGNBQVEsR0FBUixDQUFZLGNBQVo7QUFDQSxVQUFJLFNBQVMsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQWI7QUFDQSxVQUFJLFVBQVUsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBQWQ7O0FBRUEsVUFBSSxNQUFKLEVBQVk7QUFDVixlQUFPLEtBQVAsR0FBZ0IsUUFBUSxLQUFSO0FBQ2hCLGVBQU8sV0FBUCxHQUFxQixDQUFyQjtBQUNBLGdCQUFRLFdBQVIsR0FBc0IsQ0FBdEI7QUFDRCxPQUpELE1BSU87QUFDTCxnQkFBUSxLQUFSO0FBQ0EsZ0JBQVEsV0FBUixHQUFzQixDQUF0QjtBQUNEO0FBQ0Y7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxLQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxRQUFmO0FBQ0UsOEJBQUMsUUFBRCxJQUFVLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBNUIsRUFBbUMsbUJBQW1CLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBdEQsRUFBeUYsY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUFsSDtBQURGLFNBREY7QUFJRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFNBQWYsRUFBeUIsT0FBTyxFQUFDLFlBQVksU0FBUyxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLFVBQWpDLEdBQThDLGtCQUEzRCxFQUErRSxRQUFRLE9BQXZGLEVBQWhDO0FBQ0UsOEJBQUMsSUFBRCxJQUFNLGNBQWMsS0FBSyxLQUFMLENBQVcsWUFBL0IsRUFBNkMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUEvRCxFQUFzRSxXQUFXLEtBQUssS0FBTCxDQUFXLFNBQTVGLEVBQXVHLFFBQVEsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUEvRyxFQUF1SSxTQUFTLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FBaEosRUFBeUssUUFBUSxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQWpMO0FBREY7QUFKRixPQURGO0FBVUQ7Ozs7RUFsRmUsTUFBTSxTOztBQXFGeEIsT0FBTyxHQUFQLEdBQWEsR0FBYjs7QUFFQSIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzb25nczogd2luZG93LnNvbmdzLFxuICAgICAgc2VsZWN0ZWRTb25nOiB3aW5kb3cuc29uZ3NbMF0sXG4gICAgICBzY29yZTogMTAwLFxuICAgICAgdXNlcklucHV0OiBmYWxzZVxuICAgIH07XG4gIH1cblxuICBvbkNob29zZVNvbmdDbGljayhldmVudCkge1xuICAgIHZhciB0aXRsZSA9IGV2ZW50LnRhcmdldC50ZXh0Q29udGVudDtcbiAgICB2YXIgdGhhdCA9IHRoaXM7ICBcbiAgICB0aGlzLnN0YXRlLnNvbmdzLmZvckVhY2goZnVuY3Rpb24oc29uZywgaW5kZXgpIHtcbiAgICAgIGlmIChzb25nLnRpdGxlID09PSB0aXRsZSkge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICBzZWxlY3RlZFNvbmc6IHRoYXQuc3RhdGUuc29uZ3NbaW5kZXhdXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGl0bGUgPT09ICdZb3VyIFZvaWNlJykge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VySW5wdXQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VySW5wdXQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25QbGF5KGV2ZW50KSB7XG4gICAgdmFyIHZvY2FscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2NhbHMnKTtcbiAgICB2YXIga2FyYW9rZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrYXJhb2tlJyk7XG5cbiAgICBpZiAodm9jYWxzKSB7XG4gICAgICB2b2NhbHMucGxheSgpOyBrYXJhb2tlLnBsYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAga2FyYW9rZS5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgb25QYXVzZShldmVudCkge1xuICAgIHZhciB2b2NhbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9jYWxzJyk7XG4gICAgdmFyIGthcmFva2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2FyYW9rZScpO1xuXG4gICAgaWYgKHZvY2Fscykge1xuICAgICAgdm9jYWxzLnBhdXNlKCk7IGthcmFva2UucGF1c2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAga2FyYW9rZS5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIG9uU3RvcChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdzdG9wcGluZyEhISEnKVxuICAgIHZhciB2b2NhbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9jYWxzJyk7XG4gICAgdmFyIGthcmFva2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2FyYW9rZScpO1xuICAgIFxuICAgIGlmICh2b2NhbHMpIHtcbiAgICAgIHZvY2Fscy5wYXVzZSgpOyBrYXJhb2tlLnBhdXNlKCk7XG4gICAgICB2b2NhbHMuY3VycmVudFRpbWUgPSAwO1xuICAgICAga2FyYW9rZS5jdXJyZW50VGltZSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGthcmFva2UucGF1c2UoKTtcbiAgICAgIGthcmFva2UuY3VycmVudFRpbWUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbDJcIj5cbiAgICAgICAgICA8UGxheUxpc3Qgc29uZ3M9e3RoaXMuc3RhdGUuc29uZ3N9IG9uQ2hvb3NlU29uZ0NsaWNrPXt0aGlzLm9uQ2hvb3NlU29uZ0NsaWNrLmJpbmQodGhpcyl9IHNlbGVjdGVkU29uZz17dGhpcy5zdGF0ZS5zZWxlY3RlZFNvbmd9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGwxMFwiIHN0eWxlPXt7YmFja2dyb3VuZDogJ3VybCgnICsgdGhpcy5zdGF0ZS5zZWxlY3RlZFNvbmcuYmFja2dyb3VuZCArICcpIGNlbnRlciAvIGNvdmVyJywgaGVpZ2h0OiAnNzIwcHgnIH19ID5cbiAgICAgICAgICA8TWFpbiBzZWxlY3RlZFNvbmc9e3RoaXMuc3RhdGUuc2VsZWN0ZWRTb25nfSBzY29yZT17dGhpcy5zdGF0ZS5zY29yZX0gdXNlcklucHV0PXt0aGlzLnN0YXRlLnVzZXJJbnB1dH0gb25QbGF5PXt0aGlzLm9uUGxheS5iaW5kKHRoaXMpfSBvblBhdXNlPXt0aGlzLm9uUGF1c2UuYmluZCh0aGlzKX0gb25TdG9wPXt0aGlzLm9uU3RvcC5iaW5kKHRoaXMpfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG53aW5kb3cuQXBwID0gQXBwO1xuXG4vLyAndXJsKCcgKyB0aGlzLnN0YXRlLnNlbGVjdGVkU29uZy5iYWNrZ3JvdW5kICsgJykgY2VudGVyIC8gY292ZXInIl19