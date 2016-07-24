'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PitchVisualizer = function (_React$Component) {
  _inherits(PitchVisualizer, _React$Component);

  function PitchVisualizer() {
    _classCallCheck(this, PitchVisualizer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PitchVisualizer).apply(this, arguments));
  }

  _createClass(PitchVisualizer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      // Initializes the variables that the pitch detector and visualizer
      // will need to use (see scripts/pitchDetector.js)

      // corresponds to a 5kHz signal
      // MAX_SIZE = Math.max(4, Math.floor(audioContext.sampleRate / 5000));  
      audioContext = new AudioContext();

      detectorElem = document.getElementById('detector');
      canvasElem = document.getElementById('output');
      DEBUGCANVAS = document.getElementById('waveform');
      graphCanvas = document.getElementById('pitchGraph');

      if (DEBUGCANVAS) {
        waveCanvas = DEBUGCANVAS.getContext('2d');
        waveCanvas.strokeStyle = 'black';
        waveCanvas.lineWidth = 1;
      }

      // pitch graph canvas
      if (graphCanvas) {
        noteCanvas = graphCanvas.getContext('2d');
        noteCanvas.strokeStyle = 'black';
        noteCanvas.lineWidth = 1;
      }

      pitchElem = document.getElementById('pitch');
      noteElem = document.getElementById('note');
      detuneElem = document.getElementById('detune');
      detuneAmount = document.getElementById('detune_amt');
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopUserAudio();
    }
  }, {
    key: 'stopUserAudio',
    value: function stopUserAudio() {
      console.log('Stopping user input');

      if (localStream) {
        localStream.getAudioTracks()[0].stop(0);
      }

      localStream = null;
      clearInterval(updatePitchID);
    }
  }, {
    key: 'toggleLiveInput',
    value: function toggleLiveInput() {
      console.log('Toggling audio input');
      console.log(localStream);

      if (localStream === null) {
        getUserAudio();
      } else {
        this.stopUserAudio();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'pitchdetector' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col s12 l4' },
            React.createElement(
              'div',
              { id: 'detector', className: 'vague' },
              React.createElement(
                'div',
                { className: 'pitch' },
                React.createElement(
                  'span',
                  { id: 'pitch' },
                  '--'
                ),
                'Hz'
              ),
              React.createElement(
                'div',
                { className: 'note' },
                React.createElement(
                  'span',
                  { id: 'note' },
                  '--'
                )
              ),
              React.createElement(
                'div',
                { id: 'detune' },
                React.createElement(
                  'span',
                  { id: 'detune_amt' },
                  '--'
                ),
                React.createElement(
                  'span',
                  { id: 'flat' },
                  'cents ♭'
                ),
                React.createElement(
                  'span',
                  { id: 'sharp' },
                  'cents ♯'
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'col s12 l4 audioPlayer' },
            React.createElement(
              'button',
              { type: 'button', onClick: this.props.onPlay },
              'Play'
            ),
            React.createElement(
              'button',
              { type: 'button', onClick: this.props.onPause },
              'Pause'
            ),
            this.props.audioPlayer,
            React.createElement(
              'button',
              { className: 'liveInput', onClick: this.toggleLiveInput.bind(this) },
              'Use Live Input'
            )
          ),
          React.createElement(
            'div',
            { className: 'col s12 l4 overflow' },
            React.createElement('canvas', { id: 'waveform', width: '512', height: '290' })
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col l12 s12' },
            React.createElement(
              'div',
              { className: 'overflow' },
              React.createElement('canvas', { id: 'pitchGraph', width: '2560', height: '256' })
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col l4 s4 scoreboard offset-l3' },
            React.createElement(
              'span',
              null,
              'Score : ',
              this.props.score
            )
          )
        )
      );
    }
  }]);

  return PitchVisualizer;
}(React.Component);

;

window.PitchVisualizer = PitchVisualizer;
// <canvas id="output" ></canvas> below #note
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBZSxJQUFJLFlBQUosRUFBZjs7QUFFQSxxQkFBZSxTQUFTLGNBQVQsQ0FBeUIsVUFBekIsQ0FBZjtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0Esb0JBQWMsU0FBUyxjQUFULENBQXlCLFVBQXpCLENBQWQ7QUFDQSxvQkFBYyxTQUFTLGNBQVQsQ0FBeUIsWUFBekIsQ0FBZDs7QUFFQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQsa0JBQVksU0FBUyxjQUFULENBQXlCLE9BQXpCLENBQVo7QUFDQSxpQkFBVyxTQUFTLGNBQVQsQ0FBeUIsTUFBekIsQ0FBWDtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0EscUJBQWUsU0FBUyxjQUFULENBQXlCLFlBQXpCLENBQWY7QUFFRDs7OzJDQUVzQjtBQUNyQixXQUFLLGFBQUw7QUFDRDs7O29DQUVlO0FBQ2QsY0FBUSxHQUFSLENBQVkscUJBQVo7O0FBRUEsVUFBSSxXQUFKLEVBQWlCO0FBQ2Ysb0JBQVksY0FBWixHQUE2QixDQUE3QixFQUFnQyxJQUFoQyxDQUFzQyxDQUF0QztBQUNEOztBQUVELG9CQUFjLElBQWQ7QUFDQSxvQkFBYyxhQUFkO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsY0FBUSxHQUFSLENBQVksc0JBQVo7QUFDQSxjQUFRLEdBQVIsQ0FBWSxXQUFaOztBQUVBLFVBQUksZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3hCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxhQUFMO0FBQ0Q7QUFFRjs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxJQUFHLGVBQVI7QUFFRTtBQUFBO0FBQUEsWUFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLFlBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQUssSUFBRyxVQUFSLEVBQW1CLFdBQVUsT0FBN0I7QUFDRTtBQUFBO0FBQUEsa0JBQUssV0FBVSxPQUFmO0FBQXVCO0FBQUE7QUFBQSxvQkFBTSxJQUFHLE9BQVQ7QUFBQTtBQUFBLGlCQUF2QjtBQUFBO0FBQUEsZUFERjtBQUVFO0FBQUE7QUFBQSxrQkFBSyxXQUFVLE1BQWY7QUFBc0I7QUFBQTtBQUFBLG9CQUFNLElBQUcsTUFBVDtBQUFBO0FBQUE7QUFBdEIsZUFGRjtBQUdFO0FBQUE7QUFBQSxrQkFBSyxJQUFHLFFBQVI7QUFBaUI7QUFBQTtBQUFBLG9CQUFNLElBQUcsWUFBVDtBQUFBO0FBQUEsaUJBQWpCO0FBQWdEO0FBQUE7QUFBQSxvQkFBTSxJQUFHLE1BQVQ7QUFBQTtBQUFBLGlCQUFoRDtBQUFvRjtBQUFBO0FBQUEsb0JBQU0sSUFBRyxPQUFUO0FBQUE7QUFBQTtBQUFwRjtBQUhGO0FBREYsV0FERjtBQVFFO0FBQUE7QUFBQSxjQUFLLFdBQVUsd0JBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQVEsTUFBSyxRQUFiLEVBQXNCLFNBQVMsS0FBSyxLQUFMLENBQVcsTUFBMUM7QUFBQTtBQUFBLGFBREY7QUFFRTtBQUFBO0FBQUEsZ0JBQVEsTUFBSyxRQUFiLEVBQXNCLFNBQVMsS0FBSyxLQUFMLENBQVcsT0FBMUM7QUFBQTtBQUFBLGFBRkY7QUFHRyxpQkFBSyxLQUFMLENBQVcsV0FIZDtBQUlFO0FBQUE7QUFBQSxnQkFBUSxXQUFVLFdBQWxCLEVBQThCLFNBQVMsS0FBSyxlQUFMLENBQXFCLElBQXJCLENBQTBCLElBQTFCLENBQXZDO0FBQUE7QUFBQTtBQUpGLFdBUkY7QUFjRTtBQUFBO0FBQUEsY0FBSyxXQUFVLHFCQUFmO0FBQ0UsNENBQVEsSUFBRyxVQUFYLEVBQXNCLE9BQU0sS0FBNUIsRUFBa0MsUUFBTyxLQUF6QztBQURGO0FBZEYsU0FGRjtBQXFCRTtBQUFBO0FBQUEsWUFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGFBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxVQUFmO0FBQ0EsOENBQVEsSUFBRyxZQUFYLEVBQXdCLE9BQU0sTUFBOUIsRUFBcUMsUUFBTyxLQUE1QztBQURBO0FBREY7QUFERixTQXJCRjtBQTZCRTtBQUFBO0FBQUEsWUFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGdDQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBZSxtQkFBSyxLQUFMLENBQVc7QUFBMUI7QUFERjtBQURGO0FBN0JGLE9BREY7QUFzQ0Q7Ozs7RUF0RzJCLE1BQU0sUzs7QUF1R25DOztBQUVELE9BQU8sZUFBUCxHQUF5QixlQUF6QjtBQUNjIiwiZmlsZSI6IlBpdGNoVmlzdWFsaXplci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBpdGNoVmlzdWFsaXplciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG5cbiAgICAvLyBJbml0aWFsaXplcyB0aGUgdmFyaWFibGVzIHRoYXQgdGhlIHBpdGNoIGRldGVjdG9yIGFuZCB2aXN1YWxpemVyXG4gICAgLy8gd2lsbCBuZWVkIHRvIHVzZSAoc2VlIHNjcmlwdHMvcGl0Y2hEZXRlY3Rvci5qcylcblxuICAgIC8vIGNvcnJlc3BvbmRzIHRvIGEgNWtIeiBzaWduYWxcbiAgICAvLyBNQVhfU0laRSA9IE1hdGgubWF4KDQsIE1hdGguZmxvb3IoYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUgLyA1MDAwKSk7ICBcbiAgICBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG5cbiAgICBkZXRlY3RvckVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldGVjdG9yJyApO1xuICAgIGNhbnZhc0VsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ291dHB1dCcgKTtcbiAgICBERUJVR0NBTlZBUyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnd2F2ZWZvcm0nICk7XG4gICAgZ3JhcGhDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BpdGNoR3JhcGgnICk7XG5cbiAgICBpZiAoREVCVUdDQU5WQVMpIHtcbiAgICAgIHdhdmVDYW52YXMgPSBERUJVR0NBTlZBUy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgd2F2ZUNhbnZhcy5zdHJva2VTdHlsZSA9ICdibGFjayc7XG4gICAgICB3YXZlQ2FudmFzLmxpbmVXaWR0aCA9IDE7XG4gICAgfVxuXG4gICAgLy8gcGl0Y2ggZ3JhcGggY2FudmFzXG4gICAgaWYgKGdyYXBoQ2FudmFzKSB7XG4gICAgICBub3RlQ2FudmFzID0gZ3JhcGhDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIG5vdGVDYW52YXMuc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xuICAgICAgbm90ZUNhbnZhcy5saW5lV2lkdGggPSAxO1xuICAgIH1cblxuICAgIHBpdGNoRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGl0Y2gnICk7XG4gICAgbm90ZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ25vdGUnICk7XG4gICAgZGV0dW5lRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0dW5lJyApO1xuICAgIGRldHVuZUFtb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0dW5lX2FtdCcgKTtcblxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5zdG9wVXNlckF1ZGlvKCk7XG4gIH1cblxuICBzdG9wVXNlckF1ZGlvKCkge1xuICAgIGNvbnNvbGUubG9nKCdTdG9wcGluZyB1c2VyIGlucHV0Jyk7XG5cbiAgICBpZiAobG9jYWxTdHJlYW0pIHtcbiAgICAgIGxvY2FsU3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0uc3RvcCggMCApO1xuICAgIH1cbiAgICBcbiAgICBsb2NhbFN0cmVhbSA9IG51bGw7XG4gICAgY2xlYXJJbnRlcnZhbCh1cGRhdGVQaXRjaElEKTtcbiAgfVxuXG4gIHRvZ2dsZUxpdmVJbnB1dCgpIHtcbiAgICBjb25zb2xlLmxvZygnVG9nZ2xpbmcgYXVkaW8gaW5wdXQnKTtcbiAgICBjb25zb2xlLmxvZyhsb2NhbFN0cmVhbSk7XG5cbiAgICBpZiAobG9jYWxTdHJlYW0gPT09IG51bGwpIHtcbiAgICAgIGdldFVzZXJBdWRpbygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BVc2VyQXVkaW8oKTtcbiAgICB9XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cInBpdGNoZGV0ZWN0b3JcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHMxMiBsNFwiPlxuICAgICAgICAgICAgPGRpdiBpZD1cImRldGVjdG9yXCIgY2xhc3NOYW1lPVwidmFndWVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaXRjaFwiPjxzcGFuIGlkPVwicGl0Y2hcIj4tLTwvc3Bhbj5IejwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdGVcIj48c3BhbiBpZD1cIm5vdGVcIj4tLTwvc3Bhbj48L2Rpdj4gICBcbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRldHVuZVwiPjxzcGFuIGlkPVwiZGV0dW5lX2FtdFwiPi0tPC9zcGFuPjxzcGFuIGlkPVwiZmxhdFwiPmNlbnRzICYjOTgzNzs8L3NwYW4+PHNwYW4gaWQ9XCJzaGFycFwiPmNlbnRzICYjOTgzOTs8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbCBzMTIgbDQgYXVkaW9QbGF5ZXInPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy5wcm9wcy5vblBsYXl9PlBsYXk8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25QYXVzZX0+UGF1c2U8L2J1dHRvbj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmF1ZGlvUGxheWVyfVxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2xpdmVJbnB1dCcgb25DbGljaz17dGhpcy50b2dnbGVMaXZlSW5wdXQuYmluZCh0aGlzKX0+VXNlIExpdmUgSW5wdXQ8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzMTIgbDQgb3ZlcmZsb3dcIj5cbiAgICAgICAgICAgIDxjYW52YXMgaWQ9XCJ3YXZlZm9ybVwiIHdpZHRoPVwiNTEyXCIgaGVpZ2h0PVwiMjkwXCI+PC9jYW52YXM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbDEyIHMxMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvd1wiPlxuICAgICAgICAgICAgPGNhbnZhcyBpZD1cInBpdGNoR3JhcGhcIiB3aWR0aD1cIjI1NjBcIiBoZWlnaHQ9XCIyNTZcIj48L2NhbnZhcz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbDQgczQgc2NvcmVib2FyZCBvZmZzZXQtbDNcIj5cbiAgICAgICAgICAgIDxzcGFuPlNjb3JlIDoge3RoaXMucHJvcHMuc2NvcmV9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxud2luZG93LlBpdGNoVmlzdWFsaXplciA9IFBpdGNoVmlzdWFsaXplcjtcbiAgICAgICAgICAgICAgLy8gPGNhbnZhcyBpZD1cIm91dHB1dFwiID48L2NhbnZhcz4gYmVsb3cgI25vdGUiXX0=