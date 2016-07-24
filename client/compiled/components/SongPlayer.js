'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SongPlayer = function (_React$Component) {
  _inherits(SongPlayer, _React$Component);

  function SongPlayer(props) {
    _classCallCheck(this, SongPlayer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SongPlayer).call(this, props));
  }

  _createClass(SongPlayer, [{
    key: 'render',
    value: function render() {
      var audioPlayer;
      if (this.props.selectedVocals) {
        audioPlayer = React.createElement(
          'div',
          null,
          React.createElement(ReactAudioPlayer, { id: 'karaoke',
            src: this.props.selectedAudio
          }),
          React.createElement(ReactAudioPlayer, { id: 'vocals',
            src: this.props.selectedVocals,
            volume: '0.0'
          })
        );
        return React.createElement(
          'div',
          null,
          React.createElement(PitchVisualizer, { selectedData: this.props.selectedData, audioPlayer: audioPlayer, score: this.props.score, onPlay: this.props.onPlay, onPause: this.props.onPause, onStop: this.props.onStop, onKaraokeVolumeChange: this.props.onKaraokeVolumeChange, onVocalsVolumeChange: this.props.onVocalsVolumeChange })
        );
      } else {
        audioPlayer = React.createElement(
          'div',
          null,
          React.createElement(ReactAudioPlayer, { id: 'karaoke',
            src: this.props.selectedAudio
          })
        );
        return React.createElement(
          'div',
          null,
          React.createElement(PitchVisualizer, { selectedData: this.props.selectedData, audioPlayer: audioPlayer, score: this.props.score, onPlay: this.props.onPlay, onPause: this.props.onPause, onStop: this.props.onStop, onKaraokeVolumeChange: this.props.onKaraokeVolumeChange, onVocalsVolumeChange: this.props.onVocalsVolumeChange })
        );
      }
    }
  }]);

  return SongPlayer;
}(React.Component);

;

window.SongPlayer = SongPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvU29uZ1BsYXllci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFU7OztBQUNKLHNCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx5RkFDWCxLQURXO0FBRWxCOzs7OzZCQUVRO0FBQ1AsVUFBSSxXQUFKO0FBQ0EsVUFBSSxLQUFLLEtBQUwsQ0FBVyxjQUFmLEVBQStCO0FBQzdCLHNCQUFjO0FBQUE7QUFBQTtBQUFLLDhCQUFDLGdCQUFELElBQWtCLElBQUksU0FBdEI7QUFDYixpQkFBSyxLQUFLLEtBQUwsQ0FBVztBQURILFlBQUw7QUFHViw4QkFBQyxnQkFBRCxJQUFrQixJQUFJLFFBQXRCO0FBQ0UsaUJBQUssS0FBSyxLQUFMLENBQVcsY0FEbEI7QUFFRSxvQkFBUTtBQUZWO0FBSFUsU0FBZDtBQU9BLGVBQ0U7QUFBQTtBQUFBO0FBQ0UsOEJBQUMsZUFBRCxJQUFpQixjQUFjLEtBQUssS0FBTCxDQUFXLFlBQTFDLEVBQXdELGFBQWEsV0FBckUsRUFBa0YsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFwRyxFQUEyRyxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQTlILEVBQXNJLFNBQVMsS0FBSyxLQUFMLENBQVcsT0FBMUosRUFBbUssUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUF0TCxFQUE4TCx1QkFBdUIsS0FBSyxLQUFMLENBQVcscUJBQWhPLEVBQXVQLHNCQUFzQixLQUFLLEtBQUwsQ0FBVyxvQkFBeFI7QUFERixTQURGO0FBSUQsT0FaRCxNQVlPO0FBQ0wsc0JBQWM7QUFBQTtBQUFBO0FBQUssOEJBQUMsZ0JBQUQsSUFBa0IsSUFBSSxTQUF0QjtBQUNmLGlCQUFLLEtBQUssS0FBTCxDQUFXO0FBREQ7QUFBTCxTQUFkO0FBR0EsZUFDRTtBQUFBO0FBQUE7QUFDRSw4QkFBQyxlQUFELElBQWlCLGNBQWMsS0FBSyxLQUFMLENBQVcsWUFBMUMsRUFBd0QsYUFBYSxXQUFyRSxFQUFrRixPQUFPLEtBQUssS0FBTCxDQUFXLEtBQXBHLEVBQTJHLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBOUgsRUFBc0ksU0FBUyxLQUFLLEtBQUwsQ0FBVyxPQUExSixFQUFtSyxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQXRMLEVBQThMLHVCQUF1QixLQUFLLEtBQUwsQ0FBVyxxQkFBaE8sRUFBdVAsc0JBQXNCLEtBQUssS0FBTCxDQUFXLG9CQUF4UjtBQURGLFNBREY7QUFJRDtBQUNGOzs7O0VBNUJzQixNQUFNLFM7O0FBNkI5Qjs7QUFFRCxPQUFPLFVBQVAsR0FBb0IsVUFBcEIiLCJmaWxlIjoiU29uZ1BsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNvbmdQbGF5ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgYXVkaW9QbGF5ZXI7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRWb2NhbHMpIHtcbiAgICAgIGF1ZGlvUGxheWVyID0gPGRpdj48UmVhY3RBdWRpb1BsYXllciBpZD17J2thcmFva2UnfVxuICAgICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNlbGVjdGVkQXVkaW99XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8UmVhY3RBdWRpb1BsYXllciBpZD17J3ZvY2Fscyd9XG4gICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc2VsZWN0ZWRWb2NhbHN9XG4gICAgICAgICAgICB2b2x1bWU9eycwLjAnfVxuICAgICAgICAgIC8+PC9kaXY+XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxQaXRjaFZpc3VhbGl6ZXIgc2VsZWN0ZWREYXRhPXt0aGlzLnByb3BzLnNlbGVjdGVkRGF0YX0gYXVkaW9QbGF5ZXI9e2F1ZGlvUGxheWVyfSBzY29yZT17dGhpcy5wcm9wcy5zY29yZX0gb25QbGF5PXt0aGlzLnByb3BzLm9uUGxheX0gb25QYXVzZT17dGhpcy5wcm9wcy5vblBhdXNlfSBvblN0b3A9e3RoaXMucHJvcHMub25TdG9wfSBvbkthcmFva2VWb2x1bWVDaGFuZ2U9e3RoaXMucHJvcHMub25LYXJhb2tlVm9sdW1lQ2hhbmdlfSBvblZvY2Fsc1ZvbHVtZUNoYW5nZT17dGhpcy5wcm9wcy5vblZvY2Fsc1ZvbHVtZUNoYW5nZX0vPlxuICAgICAgICA8L2Rpdj4pXG4gICAgfSBlbHNlIHtcbiAgICAgIGF1ZGlvUGxheWVyID0gPGRpdj48UmVhY3RBdWRpb1BsYXllciBpZD17J2thcmFva2UnfVxuICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zZWxlY3RlZEF1ZGlvfVxuICAgICAgICAvPjwvZGl2PlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8UGl0Y2hWaXN1YWxpemVyIHNlbGVjdGVkRGF0YT17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGF9IGF1ZGlvUGxheWVyPXthdWRpb1BsYXllcn0gc2NvcmU9e3RoaXMucHJvcHMuc2NvcmV9IG9uUGxheT17dGhpcy5wcm9wcy5vblBsYXl9IG9uUGF1c2U9e3RoaXMucHJvcHMub25QYXVzZX0gb25TdG9wPXt0aGlzLnByb3BzLm9uU3RvcH0gb25LYXJhb2tlVm9sdW1lQ2hhbmdlPXt0aGlzLnByb3BzLm9uS2FyYW9rZVZvbHVtZUNoYW5nZX0gb25Wb2NhbHNWb2x1bWVDaGFuZ2U9e3RoaXMucHJvcHMub25Wb2NhbHNWb2x1bWVDaGFuZ2V9Lz5cbiAgICAgICAgPC9kaXY+KVxuICAgIH0gICAgXG4gIH1cbn07XG5cbndpbmRvdy5Tb25nUGxheWVyID0gU29uZ1BsYXllcjsiXX0=