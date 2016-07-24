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
            src: this.props.selectedAudio,
            autoPlay: 'false'
          }),
          React.createElement(ReactAudioPlayer, { id: 'vocals',
            src: this.props.selectedVocals,
            autoPlay: 'false',
            volume: '0.0'
          })
        );
        return React.createElement(
          'div',
          null,
          React.createElement(PitchVisualizer, { audioPlayer: audioPlayer, score: this.props.score })
        );
      } else {
        audioPlayer = React.createElement(
          'div',
          null,
          React.createElement(ReactAudioPlayer, { id: 'karaoke',
            src: this.props.selectedAudio,
            autoPlay: 'false'
          })
        );
        return React.createElement(
          'div',
          null,
          React.createElement(PitchVisualizer, { audioPlayer: audioPlayer, score: this.props.score })
        );
      }
    }
  }]);

  return SongPlayer;
}(React.Component);

;

window.SongPlayer = SongPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvU29uZ1BsYXllci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFU7OztBQUNKLHNCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx5RkFDWCxLQURXO0FBRWxCOzs7OzZCQUVRO0FBQ1AsVUFBSSxXQUFKO0FBQ0EsVUFBSSxLQUFLLEtBQUwsQ0FBVyxjQUFmLEVBQStCO0FBQzdCLHNCQUFjO0FBQUE7QUFBQTtBQUFLLDhCQUFDLGdCQUFELElBQWtCLElBQUksU0FBdEI7QUFDYixpQkFBSyxLQUFLLEtBQUwsQ0FBVyxhQURIO0FBRWIsc0JBQVM7QUFGSSxZQUFMO0FBSVYsOEJBQUMsZ0JBQUQsSUFBa0IsSUFBSSxRQUF0QjtBQUNFLGlCQUFLLEtBQUssS0FBTCxDQUFXLGNBRGxCO0FBRUUsc0JBQVMsT0FGWDtBQUdFLG9CQUFRO0FBSFY7QUFKVSxTQUFkO0FBU0EsZUFDRTtBQUFBO0FBQUE7QUFDRSw4QkFBQyxlQUFELElBQWlCLGFBQWEsV0FBOUIsRUFBMkMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUE3RDtBQURGLFNBREY7QUFJRCxPQWRELE1BY087QUFDTCxzQkFBYztBQUFBO0FBQUE7QUFBSyw4QkFBQyxnQkFBRCxJQUFrQixJQUFJLFNBQXRCO0FBQ2YsaUJBQUssS0FBSyxLQUFMLENBQVcsYUFERDtBQUVmLHNCQUFTO0FBRk07QUFBTCxTQUFkO0FBSUEsZUFDRTtBQUFBO0FBQUE7QUFDRSw4QkFBQyxlQUFELElBQWlCLGFBQWEsV0FBOUIsRUFBMkMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUE3RDtBQURGLFNBREY7QUFJRDtBQUNGOzs7O0VBL0JzQixNQUFNLFM7O0FBZ0M5Qjs7QUFFRCxPQUFPLFVBQVAsR0FBb0IsVUFBcEIiLCJmaWxlIjoiU29uZ1BsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNvbmdQbGF5ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgYXVkaW9QbGF5ZXI7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRWb2NhbHMpIHtcbiAgICAgIGF1ZGlvUGxheWVyID0gPGRpdj48UmVhY3RBdWRpb1BsYXllciBpZD17J2thcmFva2UnfVxuICAgICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNlbGVjdGVkQXVkaW99XG4gICAgICAgICAgICBhdXRvUGxheT1cImZhbHNlXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxSZWFjdEF1ZGlvUGxheWVyIGlkPXsndm9jYWxzJ31cbiAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5zZWxlY3RlZFZvY2Fsc31cbiAgICAgICAgICAgIGF1dG9QbGF5PVwiZmFsc2VcIlxuICAgICAgICAgICAgdm9sdW1lPXsnMC4wJ31cbiAgICAgICAgICAvPjwvZGl2PlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8UGl0Y2hWaXN1YWxpemVyIGF1ZGlvUGxheWVyPXthdWRpb1BsYXllcn0gc2NvcmU9e3RoaXMucHJvcHMuc2NvcmV9Lz5cbiAgICAgICAgPC9kaXY+KVxuICAgIH0gZWxzZSB7XG4gICAgICBhdWRpb1BsYXllciA9IDxkaXY+PFJlYWN0QXVkaW9QbGF5ZXIgaWQ9eydrYXJhb2tlJ31cbiAgICAgICAgICBzcmM9e3RoaXMucHJvcHMuc2VsZWN0ZWRBdWRpb31cbiAgICAgICAgICBhdXRvUGxheT1cImZhbHNlXCJcbiAgICAgICAgLz48L2Rpdj5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFBpdGNoVmlzdWFsaXplciBhdWRpb1BsYXllcj17YXVkaW9QbGF5ZXJ9IHNjb3JlPXt0aGlzLnByb3BzLnNjb3JlfS8+XG4gICAgICAgIDwvZGl2PilcbiAgICB9ICAgIFxuICB9XG59O1xuXG53aW5kb3cuU29uZ1BsYXllciA9IFNvbmdQbGF5ZXI7Il19