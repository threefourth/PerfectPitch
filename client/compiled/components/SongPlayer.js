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
      if (this.props.selectedVocals) {
        return React.createElement(
          'div',
          null,
          React.createElement(PitchVisualizer, null),
          React.createElement(ReactAudioPlayer, { id: 'karaoke',
            src: this.props.selectedAudio,
            autoPlay: 'false'
          }),
          React.createElement(ReactAudioPlayer, { id: 'vocals',
            src: this.props.selectedVocals,
            autoPlay: 'false',
            volume: '0.0'
          })
        );
      } else {
        return React.createElement(
          'div',
          null,
          React.createElement(PitchVisualizer, null),
          React.createElement(ReactAudioPlayer, { id: 'karaoke',
            src: this.props.selectedAudio,
            autoPlay: 'false'
          })
        );
      }
    }
  }]);

  return SongPlayer;
}(React.Component);

;

window.SongPlayer = SongPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvU29uZ1BsYXllci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFU7OztBQUNKLHNCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx5RkFDWCxLQURXO0FBRWxCOzs7OzZCQUVRO0FBQ1AsVUFBSSxLQUFLLEtBQUwsQ0FBVyxjQUFmLEVBQStCO0FBQzdCLGVBQ0U7QUFBQTtBQUFBO0FBQ0UsOEJBQUMsZUFBRCxPQURGO0FBRUUsOEJBQUMsZ0JBQUQsSUFBa0IsSUFBSSxTQUF0QjtBQUNFLGlCQUFLLEtBQUssS0FBTCxDQUFXLGFBRGxCO0FBRUUsc0JBQVM7QUFGWCxZQUZGO0FBTUUsOEJBQUMsZ0JBQUQsSUFBa0IsSUFBSSxRQUF0QjtBQUNFLGlCQUFLLEtBQUssS0FBTCxDQUFXLGNBRGxCO0FBRUUsc0JBQVMsT0FGWDtBQUdFLG9CQUFRO0FBSFY7QUFORixTQURGO0FBYUQsT0FkRCxNQWNPO0FBQ0wsZUFDRTtBQUFBO0FBQUE7QUFDRSw4QkFBQyxlQUFELE9BREY7QUFFRSw4QkFBQyxnQkFBRCxJQUFrQixJQUFJLFNBQXRCO0FBQ0UsaUJBQUssS0FBSyxLQUFMLENBQVcsYUFEbEI7QUFFRSxzQkFBUztBQUZYO0FBRkYsU0FERjtBQVFEO0FBQ0Y7Ozs7RUE5QnNCLE1BQU0sUzs7QUErQjlCOztBQUVELE9BQU8sVUFBUCxHQUFvQixVQUFwQiIsImZpbGUiOiJTb25nUGxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU29uZ1BsYXllciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkVm9jYWxzKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxQaXRjaFZpc3VhbGl6ZXIgLz5cbiAgICAgICAgICA8UmVhY3RBdWRpb1BsYXllciBpZD17J2thcmFva2UnfVxuICAgICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNlbGVjdGVkQXVkaW99XG4gICAgICAgICAgICBhdXRvUGxheT1cImZhbHNlXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxSZWFjdEF1ZGlvUGxheWVyIGlkPXsndm9jYWxzJ31cbiAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zZWxlY3RlZFZvY2Fsc31cbiAgICAgICAgICAgIGF1dG9QbGF5PVwiZmFsc2VcIlxuICAgICAgICAgICAgdm9sdW1lPXsnMC4wJ31cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj4pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFBpdGNoVmlzdWFsaXplciAvPlxuICAgICAgICAgIDxSZWFjdEF1ZGlvUGxheWVyIGlkPXsna2FyYW9rZSd9XG4gICAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc2VsZWN0ZWRBdWRpb31cbiAgICAgICAgICAgIGF1dG9QbGF5PVwiZmFsc2VcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PilcbiAgICB9ICAgIFxuICB9XG59O1xuXG53aW5kb3cuU29uZ1BsYXllciA9IFNvbmdQbGF5ZXI7Il19