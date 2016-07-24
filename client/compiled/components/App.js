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

// 'url(' + this.state.selectedSong.background + ') center / cover'
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvQXBwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sRzs7O0FBQ0osZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxhQUFPLE9BQU8sS0FESDtBQUVYLG9CQUFjLE9BQU8sS0FBUCxDQUFhLENBQWIsQ0FGSDtBQUdYLGFBQU8sR0FISTtBQUlYLGlCQUFXO0FBSkEsS0FBYjtBQUhpQjtBQVNsQjs7OztzQ0FFaUIsSyxFQUFPO0FBQ3ZCLFVBQUksUUFBUSxNQUFNLE1BQU4sQ0FBYSxXQUF6QjtBQUNBLFVBQUksT0FBTyxJQUFYO0FBQ0EsV0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixVQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCO0FBQzdDLFlBQUksS0FBSyxLQUFMLEtBQWUsS0FBbkIsRUFBMEI7QUFDeEIsZUFBSyxRQUFMLENBQWM7QUFDWiwwQkFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQWpCO0FBREYsV0FBZDtBQUdEOztBQUVELFlBQUksVUFBVSxZQUFkLEVBQTRCO0FBQzFCLGVBQUssUUFBTCxDQUFjO0FBQ1osdUJBQVc7QUFEQyxXQUFkO0FBR0QsU0FKRCxNQUlPO0FBQ0wsZUFBSyxRQUFMLENBQWM7QUFDWix1QkFBVztBQURDLFdBQWQ7QUFHRDtBQUNGLE9BaEJEO0FBaUJEOzs7MkJBRU0sSyxFQUFPO0FBQ1osVUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsVUFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFkOztBQUVBLFVBQUksTUFBSixFQUFZO0FBQ1YsZUFBTyxJQUFQLEdBQWUsUUFBUSxJQUFSO0FBQ2hCLE9BRkQsTUFFTztBQUNMLGdCQUFRLElBQVI7QUFDRDtBQUNGOzs7NEJBRU8sSyxFQUFPO0FBQ2IsVUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsVUFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFkOztBQUVBLFVBQUksTUFBSixFQUFZO0FBQ1YsZUFBTyxLQUFQLEdBQWdCLFFBQVEsS0FBUjtBQUNqQixPQUZELE1BRU87QUFDTCxnQkFBUSxLQUFSO0FBQ0Q7QUFDRjs7OzJCQUVNLEssRUFBTztBQUNaLGNBQVEsR0FBUixDQUFZLGNBQVo7QUFDQSxVQUFJLFNBQVMsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQWI7QUFDQSxVQUFJLFVBQVUsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBQWQ7O0FBRUEsVUFBSSxNQUFKLEVBQVk7QUFDVixlQUFPLEtBQVAsR0FBZ0IsUUFBUSxLQUFSO0FBQ2hCLGVBQU8sV0FBUCxHQUFxQixDQUFyQjtBQUNBLGdCQUFRLFdBQVIsR0FBc0IsQ0FBdEI7QUFDRCxPQUpELE1BSU87QUFDTCxnQkFBUSxLQUFSO0FBQ0EsZ0JBQVEsV0FBUixHQUFzQixDQUF0QjtBQUNEO0FBQ0Y7OzswQ0FFcUIsSyxFQUFPO0FBQzNCLFVBQUksVUFBVSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBZDtBQUNBLGNBQVEsTUFBUixHQUFpQixNQUFNLE1BQU4sQ0FBYSxLQUE5QjtBQUNEOzs7eUNBRW9CLEssRUFBTztBQUMxQixjQUFRLEdBQVIsQ0FBWSw4QkFBWjtBQUNBLFVBQUksU0FBUyxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLFVBQUksTUFBSixFQUFZO0FBQ1YsZUFBTyxNQUFQLEdBQWdCLE1BQU0sTUFBTixDQUFhLEtBQTdCO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFFBQWY7QUFDRSw4QkFBQyxRQUFELElBQVUsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUE1QixFQUFtQyxtQkFBbUIsS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUF0RCxFQUF5RixjQUFjLEtBQUssS0FBTCxDQUFXLFlBQWxIO0FBREYsU0FERjtBQUlFO0FBQUE7QUFBQSxZQUFLLFdBQVUsU0FBZixFQUF5QixPQUFPLEVBQUMsWUFBWSxTQUFTLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsVUFBakMsR0FBOEMsa0JBQTNELEVBQStFLFFBQVEsT0FBdkYsRUFBaEM7QUFDRSw4QkFBQyxJQUFELElBQU0sY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUEvQixFQUE2QyxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQS9ELEVBQXNFLFdBQVcsS0FBSyxLQUFMLENBQVcsU0FBNUYsRUFBdUcsUUFBUSxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQS9HLEVBQXVJLFNBQVMsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixDQUFoSixFQUF5SyxRQUFRLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsSUFBakIsQ0FBakwsRUFBeU0sdUJBQXVCLEtBQUsscUJBQUwsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBaEMsQ0FBaE8sRUFBdVEsc0JBQXNCLEtBQUssb0JBQWxTO0FBREY7QUFKRixPQURGO0FBVUQ7Ozs7RUEvRmUsTUFBTSxTOztBQWtHeEIsT0FBTyxHQUFQLEdBQWEsR0FBYjs7QUFFQSIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzb25nczogd2luZG93LnNvbmdzLFxuICAgICAgc2VsZWN0ZWRTb25nOiB3aW5kb3cuc29uZ3NbMF0sXG4gICAgICBzY29yZTogMTAwLFxuICAgICAgdXNlcklucHV0OiBmYWxzZVxuICAgIH07XG4gIH1cblxuICBvbkNob29zZVNvbmdDbGljayhldmVudCkge1xuICAgIHZhciB0aXRsZSA9IGV2ZW50LnRhcmdldC50ZXh0Q29udGVudDtcbiAgICB2YXIgdGhhdCA9IHRoaXM7ICBcbiAgICB0aGlzLnN0YXRlLnNvbmdzLmZvckVhY2goZnVuY3Rpb24oc29uZywgaW5kZXgpIHtcbiAgICAgIGlmIChzb25nLnRpdGxlID09PSB0aXRsZSkge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICBzZWxlY3RlZFNvbmc6IHRoYXQuc3RhdGUuc29uZ3NbaW5kZXhdXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGl0bGUgPT09ICdZb3VyIFZvaWNlJykge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VySW5wdXQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VySW5wdXQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25QbGF5KGV2ZW50KSB7XG4gICAgdmFyIHZvY2FscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2NhbHMnKTtcbiAgICB2YXIga2FyYW9rZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrYXJhb2tlJyk7XG5cbiAgICBpZiAodm9jYWxzKSB7XG4gICAgICB2b2NhbHMucGxheSgpOyBrYXJhb2tlLnBsYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAga2FyYW9rZS5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgb25QYXVzZShldmVudCkge1xuICAgIHZhciB2b2NhbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9jYWxzJyk7XG4gICAgdmFyIGthcmFva2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2FyYW9rZScpO1xuXG4gICAgaWYgKHZvY2Fscykge1xuICAgICAgdm9jYWxzLnBhdXNlKCk7IGthcmFva2UucGF1c2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAga2FyYW9rZS5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIG9uU3RvcChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdzdG9wcGluZyEhISEnKVxuICAgIHZhciB2b2NhbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9jYWxzJyk7XG4gICAgdmFyIGthcmFva2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2FyYW9rZScpO1xuICAgIFxuICAgIGlmICh2b2NhbHMpIHtcbiAgICAgIHZvY2Fscy5wYXVzZSgpOyBrYXJhb2tlLnBhdXNlKCk7XG4gICAgICB2b2NhbHMuY3VycmVudFRpbWUgPSAwO1xuICAgICAga2FyYW9rZS5jdXJyZW50VGltZSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGthcmFva2UucGF1c2UoKTtcbiAgICAgIGthcmFva2UuY3VycmVudFRpbWUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIG9uS2FyYW9rZVZvbHVtZUNoYW5nZShldmVudCkge1xuICAgIHZhciBrYXJhb2tlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2thcmFva2UnKTtcbiAgICBrYXJhb2tlLnZvbHVtZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgfVxuXG4gIG9uVm9jYWxzVm9sdW1lQ2hhbmdlKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ2NoYW5naW5nIHZvbHVtZSBvbiB2b2NhbHMhISEnKTtcbiAgICB2YXIgdm9jYWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvY2FscycpO1xuICAgIGlmICh2b2NhbHMpIHtcbiAgICAgIHZvY2Fscy52b2x1bWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsMlwiPlxuICAgICAgICAgIDxQbGF5TGlzdCBzb25ncz17dGhpcy5zdGF0ZS5zb25nc30gb25DaG9vc2VTb25nQ2xpY2s9e3RoaXMub25DaG9vc2VTb25nQ2xpY2suYmluZCh0aGlzKX0gc2VsZWN0ZWRTb25nPXt0aGlzLnN0YXRlLnNlbGVjdGVkU29uZ30vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbDEwXCIgc3R5bGU9e3tiYWNrZ3JvdW5kOiAndXJsKCcgKyB0aGlzLnN0YXRlLnNlbGVjdGVkU29uZy5iYWNrZ3JvdW5kICsgJykgY2VudGVyIC8gY292ZXInLCBoZWlnaHQ6ICc3MjBweCcgfX0gPlxuICAgICAgICAgIDxNYWluIHNlbGVjdGVkU29uZz17dGhpcy5zdGF0ZS5zZWxlY3RlZFNvbmd9IHNjb3JlPXt0aGlzLnN0YXRlLnNjb3JlfSB1c2VySW5wdXQ9e3RoaXMuc3RhdGUudXNlcklucHV0fSBvblBsYXk9e3RoaXMub25QbGF5LmJpbmQodGhpcyl9IG9uUGF1c2U9e3RoaXMub25QYXVzZS5iaW5kKHRoaXMpfSBvblN0b3A9e3RoaXMub25TdG9wLmJpbmQodGhpcyl9IG9uS2FyYW9rZVZvbHVtZUNoYW5nZT17dGhpcy5vbkthcmFva2VWb2x1bWVDaGFuZ2UuYmluZCh0aGlzKX0gb25Wb2NhbHNWb2x1bWVDaGFuZ2U9e3RoaXMub25Wb2NhbHNWb2x1bWVDaGFuZ2V9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbndpbmRvdy5BcHAgPSBBcHA7XG5cbi8vICd1cmwoJyArIHRoaXMuc3RhdGUuc2VsZWN0ZWRTb25nLmJhY2tncm91bmQgKyAnKSBjZW50ZXIgLyBjb3ZlciciXX0=