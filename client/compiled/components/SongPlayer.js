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
          React.createElement(PitchVisualizer, { audioPlayer: audioPlayer, score: this.props.score, onPlay: this.props.onPlay, onPause: this.props.onPause })
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
          React.createElement(PitchVisualizer, { audioPlayer: audioPlayer, score: this.props.score, onPlay: this.props.onPlay, onPause: this.props.onPause })
        );
      }
    }
  }]);

  return SongPlayer;
}(React.Component);

;

window.SongPlayer = SongPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvU29uZ1BsYXllci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFU7OztBQUNKLHNCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx5RkFDWCxLQURXO0FBRWxCOzs7OzZCQUVRO0FBQ1AsVUFBSSxXQUFKO0FBQ0EsVUFBSSxLQUFLLEtBQUwsQ0FBVyxjQUFmLEVBQStCO0FBQzdCLHNCQUFjO0FBQUE7QUFBQTtBQUFLLDhCQUFDLGdCQUFELElBQWtCLElBQUksU0FBdEI7QUFDYixpQkFBSyxLQUFLLEtBQUwsQ0FBVztBQURILFlBQUw7QUFHViw4QkFBQyxnQkFBRCxJQUFrQixJQUFJLFFBQXRCO0FBQ0UsaUJBQUssS0FBSyxLQUFMLENBQVcsY0FEbEI7QUFFRSxvQkFBUTtBQUZWO0FBSFUsU0FBZDtBQU9BLGVBQ0U7QUFBQTtBQUFBO0FBQ0UsOEJBQUMsZUFBRCxJQUFpQixhQUFhLFdBQTlCLEVBQTJDLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBN0QsRUFBb0UsUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUF2RixFQUErRixTQUFTLEtBQUssS0FBTCxDQUFXLE9BQW5IO0FBREYsU0FERjtBQUlELE9BWkQsTUFZTztBQUNMLHNCQUFjO0FBQUE7QUFBQTtBQUFLLDhCQUFDLGdCQUFELElBQWtCLElBQUksU0FBdEI7QUFDZixpQkFBSyxLQUFLLEtBQUwsQ0FBVztBQUREO0FBQUwsU0FBZDtBQUdBLGVBQ0U7QUFBQTtBQUFBO0FBQ0UsOEJBQUMsZUFBRCxJQUFpQixhQUFhLFdBQTlCLEVBQTJDLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBN0QsRUFBb0UsUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUF2RixFQUErRixTQUFTLEtBQUssS0FBTCxDQUFXLE9BQW5IO0FBREYsU0FERjtBQUlEO0FBQ0Y7Ozs7RUE1QnNCLE1BQU0sUzs7QUE2QjlCOztBQUVELE9BQU8sVUFBUCxHQUFvQixVQUFwQiIsImZpbGUiOiJTb25nUGxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU29uZ1BsYXllciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBhdWRpb1BsYXllcjtcbiAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZFZvY2Fscykge1xuICAgICAgYXVkaW9QbGF5ZXIgPSA8ZGl2PjxSZWFjdEF1ZGlvUGxheWVyIGlkPXsna2FyYW9rZSd9XG4gICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc2VsZWN0ZWRBdWRpb31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxSZWFjdEF1ZGlvUGxheWVyIGlkPXsndm9jYWxzJ31cbiAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zZWxlY3RlZFZvY2Fsc31cbiAgICAgICAgICAgIHZvbHVtZT17JzAuMCd9XG4gICAgICAgICAgLz48L2Rpdj5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFBpdGNoVmlzdWFsaXplciBhdWRpb1BsYXllcj17YXVkaW9QbGF5ZXJ9IHNjb3JlPXt0aGlzLnByb3BzLnNjb3JlfSBvblBsYXk9e3RoaXMucHJvcHMub25QbGF5fSBvblBhdXNlPXt0aGlzLnByb3BzLm9uUGF1c2V9IC8+XG4gICAgICAgIDwvZGl2PilcbiAgICB9IGVsc2Uge1xuICAgICAgYXVkaW9QbGF5ZXIgPSA8ZGl2PjxSZWFjdEF1ZGlvUGxheWVyIGlkPXsna2FyYW9rZSd9XG4gICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNlbGVjdGVkQXVkaW99XG4gICAgICAgIC8+PC9kaXY+XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxQaXRjaFZpc3VhbGl6ZXIgYXVkaW9QbGF5ZXI9e2F1ZGlvUGxheWVyfSBzY29yZT17dGhpcy5wcm9wcy5zY29yZX0gb25QbGF5PXt0aGlzLnByb3BzLm9uUGxheX0gb25QYXVzZT17dGhpcy5wcm9wcy5vblBhdXNlfS8+XG4gICAgICAgIDwvZGl2PilcbiAgICB9ICAgIFxuICB9XG59O1xuXG53aW5kb3cuU29uZ1BsYXllciA9IFNvbmdQbGF5ZXI7Il19