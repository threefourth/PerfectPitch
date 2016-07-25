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
    key: 'onKaraokeVolumeChange',
    value: function onKaraokeVolumeChange(event) {
      var karaoke = document.getElementById('karaoke');
      karaoke.volume = event.target.value;
    }
  }, {
    key: 'onVocalsVolumeChange',
    value: function onVocalsVolumeChange(event) {
      console.log('changing volume on vocals!!!');
      var vocals = document.getElementById('vocals');
      if (vocals) {
        vocals.volume = event.target.value;
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
          React.createElement(Main, { selectedSong: this.state.selectedSong, score: this.state.score, userInput: this.state.userInput, onPlay: this.onPlay.bind(this), onPause: this.onPause.bind(this), onStop: this.onStop.bind(this), onKaraokeVolumeChange: this.onKaraokeVolumeChange.bind(this), onVocalsVolumeChange: this.onVocalsVolumeChange })
        )
      );
    }
  }]);

  return App;
}(React.Component);

window.App = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvQXBwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sRzs7O0FBQ0osZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxhQUFPLE9BQU8sS0FESDtBQUVYLG9CQUFjLE9BQU8sS0FBUCxDQUFhLENBQWIsQ0FGSDtBQUdYLGFBQU8sR0FISTtBQUlYLGlCQUFXO0FBSkEsS0FBYjtBQUhpQjtBQVNsQjs7OztzQ0FFaUIsSyxFQUFPO0FBQ3ZCLFVBQUksUUFBUSxNQUFNLE1BQU4sQ0FBYSxXQUF6QjtBQUNBLFVBQUksT0FBTyxJQUFYO0FBQ0EsV0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixVQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCO0FBQzdDLFlBQUksS0FBSyxLQUFMLEtBQWUsS0FBbkIsRUFBMEI7QUFDeEIsZUFBSyxRQUFMLENBQWM7QUFDWiwwQkFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQWpCO0FBREYsV0FBZDtBQUdEOztBQUVELFlBQUksVUFBVSxZQUFkLEVBQTRCO0FBQzFCLGVBQUssUUFBTCxDQUFjO0FBQ1osdUJBQVc7QUFEQyxXQUFkO0FBR0QsU0FKRCxNQUlPO0FBQ0wsZUFBSyxRQUFMLENBQWM7QUFDWix1QkFBVztBQURDLFdBQWQ7QUFHRDtBQUNGLE9BaEJEO0FBaUJEOzs7MkJBRU0sSyxFQUFPO0FBQ1osVUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsVUFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFkOztBQUVBLFVBQUksTUFBSixFQUFZO0FBQ1YsZUFBTyxJQUFQLEdBQWUsUUFBUSxJQUFSO0FBQ2hCLE9BRkQsTUFFTztBQUNMLGdCQUFRLElBQVI7QUFDRDtBQUNGOzs7NEJBRU8sSyxFQUFPO0FBQ2IsVUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsVUFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFkOztBQUVBLFVBQUksTUFBSixFQUFZO0FBQ1YsZUFBTyxLQUFQLEdBQWdCLFFBQVEsS0FBUjtBQUNqQixPQUZELE1BRU87QUFDTCxnQkFBUSxLQUFSO0FBQ0Q7QUFDRjs7OzJCQUVNLEssRUFBTztBQUNaLFVBQUksU0FBUyxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLFVBQUksVUFBVSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBZDs7QUFFQSxVQUFJLE1BQUosRUFBWTtBQUNWLGVBQU8sS0FBUCxHQUFnQixRQUFRLEtBQVI7QUFDaEIsZUFBTyxXQUFQLEdBQXFCLENBQXJCO0FBQ0EsZ0JBQVEsV0FBUixHQUFzQixDQUF0QjtBQUNELE9BSkQsTUFJTztBQUNMLGdCQUFRLEtBQVI7QUFDQSxnQkFBUSxXQUFSLEdBQXNCLENBQXRCO0FBQ0Q7QUFDRjs7OzBDQUVxQixLLEVBQU87QUFDM0IsVUFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFkO0FBQ0EsY0FBUSxNQUFSLEdBQWlCLE1BQU0sTUFBTixDQUFhLEtBQTlCO0FBQ0Q7Ozt5Q0FFb0IsSyxFQUFPO0FBQzFCLGNBQVEsR0FBUixDQUFZLDhCQUFaO0FBQ0EsVUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsVUFBSSxNQUFKLEVBQVk7QUFDVixlQUFPLE1BQVAsR0FBZ0IsTUFBTSxNQUFOLENBQWEsS0FBN0I7QUFDRDtBQUNGOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsS0FBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsUUFBZjtBQUNFLDhCQUFDLFFBQUQsSUFBVSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQTVCLEVBQW1DLG1CQUFtQixLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBQXRELEVBQXlGLGNBQWMsS0FBSyxLQUFMLENBQVcsWUFBbEg7QUFERixTQURGO0FBSUU7QUFBQTtBQUFBLFlBQUssV0FBVSxTQUFmLEVBQXlCLE9BQU8sRUFBQyxZQUFZLFNBQVMsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixVQUFqQyxHQUE4QyxrQkFBM0QsRUFBK0UsUUFBUSxPQUF2RixFQUFoQztBQUNFLDhCQUFDLElBQUQsSUFBTSxjQUFjLEtBQUssS0FBTCxDQUFXLFlBQS9CLEVBQTZDLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBL0QsRUFBc0UsV0FBVyxLQUFLLEtBQUwsQ0FBVyxTQUE1RixFQUF1RyxRQUFRLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsSUFBakIsQ0FBL0csRUFBdUksU0FBUyxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWhKLEVBQXlLLFFBQVEsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFqTCxFQUF5TSx1QkFBdUIsS0FBSyxxQkFBTCxDQUEyQixJQUEzQixDQUFnQyxJQUFoQyxDQUFoTyxFQUF1USxzQkFBc0IsS0FBSyxvQkFBbFM7QUFERjtBQUpGLE9BREY7QUFVRDs7OztFQTlGZSxNQUFNLFM7O0FBaUd4QixPQUFPLEdBQVAsR0FBYSxHQUFiIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNvbmdzOiB3aW5kb3cuc29uZ3MsXG4gICAgICBzZWxlY3RlZFNvbmc6IHdpbmRvdy5zb25nc1swXSxcbiAgICAgIHNjb3JlOiAxMDAsXG4gICAgICB1c2VySW5wdXQ6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIG9uQ2hvb3NlU29uZ0NsaWNrKGV2ZW50KSB7XG4gICAgdmFyIHRpdGxlID0gZXZlbnQudGFyZ2V0LnRleHRDb250ZW50O1xuICAgIHZhciB0aGF0ID0gdGhpczsgIFxuICAgIHRoaXMuc3RhdGUuc29uZ3MuZm9yRWFjaChmdW5jdGlvbihzb25nLCBpbmRleCkge1xuICAgICAgaWYgKHNvbmcudGl0bGUgPT09IHRpdGxlKSB7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgIHNlbGVjdGVkU29uZzogdGhhdC5zdGF0ZS5zb25nc1tpbmRleF1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aXRsZSA9PT0gJ1lvdXIgVm9pY2UnKSB7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJJbnB1dDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJJbnB1dDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvblBsYXkoZXZlbnQpIHtcbiAgICB2YXIgdm9jYWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvY2FscycpO1xuICAgIHZhciBrYXJhb2tlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2thcmFva2UnKTtcblxuICAgIGlmICh2b2NhbHMpIHtcbiAgICAgIHZvY2Fscy5wbGF5KCk7IGthcmFva2UucGxheSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrYXJhb2tlLnBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBvblBhdXNlKGV2ZW50KSB7XG4gICAgdmFyIHZvY2FscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2NhbHMnKTtcbiAgICB2YXIga2FyYW9rZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrYXJhb2tlJyk7XG5cbiAgICBpZiAodm9jYWxzKSB7XG4gICAgICB2b2NhbHMucGF1c2UoKTsga2FyYW9rZS5wYXVzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrYXJhb2tlLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgb25TdG9wKGV2ZW50KSB7XG4gICAgdmFyIHZvY2FscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2NhbHMnKTtcbiAgICB2YXIga2FyYW9rZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrYXJhb2tlJyk7XG4gICAgXG4gICAgaWYgKHZvY2Fscykge1xuICAgICAgdm9jYWxzLnBhdXNlKCk7IGthcmFva2UucGF1c2UoKTtcbiAgICAgIHZvY2Fscy5jdXJyZW50VGltZSA9IDA7XG4gICAgICBrYXJhb2tlLmN1cnJlbnRUaW1lID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAga2FyYW9rZS5wYXVzZSgpO1xuICAgICAga2FyYW9rZS5jdXJyZW50VGltZSA9IDA7XG4gICAgfVxuICB9XG5cbiAgb25LYXJhb2tlVm9sdW1lQ2hhbmdlKGV2ZW50KSB7XG4gICAgdmFyIGthcmFva2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2FyYW9rZScpO1xuICAgIGthcmFva2Uudm9sdW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICB9XG5cbiAgb25Wb2NhbHNWb2x1bWVDaGFuZ2UoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnY2hhbmdpbmcgdm9sdW1lIG9uIHZvY2FscyEhIScpO1xuICAgIHZhciB2b2NhbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9jYWxzJyk7XG4gICAgaWYgKHZvY2Fscykge1xuICAgICAgdm9jYWxzLnZvbHVtZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGwyXCI+XG4gICAgICAgICAgPFBsYXlMaXN0IHNvbmdzPXt0aGlzLnN0YXRlLnNvbmdzfSBvbkNob29zZVNvbmdDbGljaz17dGhpcy5vbkNob29zZVNvbmdDbGljay5iaW5kKHRoaXMpfSBzZWxlY3RlZFNvbmc9e3RoaXMuc3RhdGUuc2VsZWN0ZWRTb25nfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsMTBcIiBzdHlsZT17e2JhY2tncm91bmQ6ICd1cmwoJyArIHRoaXMuc3RhdGUuc2VsZWN0ZWRTb25nLmJhY2tncm91bmQgKyAnKSBjZW50ZXIgLyBjb3ZlcicsIGhlaWdodDogJzcyMHB4JyB9fSA+XG4gICAgICAgICAgPE1haW4gc2VsZWN0ZWRTb25nPXt0aGlzLnN0YXRlLnNlbGVjdGVkU29uZ30gc2NvcmU9e3RoaXMuc3RhdGUuc2NvcmV9IHVzZXJJbnB1dD17dGhpcy5zdGF0ZS51c2VySW5wdXR9IG9uUGxheT17dGhpcy5vblBsYXkuYmluZCh0aGlzKX0gb25QYXVzZT17dGhpcy5vblBhdXNlLmJpbmQodGhpcyl9IG9uU3RvcD17dGhpcy5vblN0b3AuYmluZCh0aGlzKX0gb25LYXJhb2tlVm9sdW1lQ2hhbmdlPXt0aGlzLm9uS2FyYW9rZVZvbHVtZUNoYW5nZS5iaW5kKHRoaXMpfSBvblZvY2Fsc1ZvbHVtZUNoYW5nZT17dGhpcy5vblZvY2Fsc1ZvbHVtZUNoYW5nZX0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxud2luZG93LkFwcCA9IEFwcDtcblxuIl19