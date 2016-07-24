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
      var _this2 = this;

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
              { type: 'button', onClick: function onClick() {
                  _this2.props.onPlay();_this2.toggleLiveInput.apply(_this2);
                } },
              'Play'
            ),
            React.createElement(
              'button',
              { type: 'button', onClick: function onClick() {
                  _this2.props.onPause();_this2.toggleLiveInput.apply(_this2);
                } },
              'Pause'
            ),
            React.createElement(
              'button',
              { type: 'button', onClick: function onClick() {
                  _this2.props.onStop();_this2.toggleLiveInput.apply(_this2);
                } },
              'Stop'
            ),
            this.props.audioPlayer
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBZSxJQUFJLFlBQUosRUFBZjs7QUFFQSxxQkFBZSxTQUFTLGNBQVQsQ0FBeUIsVUFBekIsQ0FBZjtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0Esb0JBQWMsU0FBUyxjQUFULENBQXlCLFVBQXpCLENBQWQ7QUFDQSxvQkFBYyxTQUFTLGNBQVQsQ0FBeUIsWUFBekIsQ0FBZDs7QUFFQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQsa0JBQVksU0FBUyxjQUFULENBQXlCLE9BQXpCLENBQVo7QUFDQSxpQkFBVyxTQUFTLGNBQVQsQ0FBeUIsTUFBekIsQ0FBWDtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0EscUJBQWUsU0FBUyxjQUFULENBQXlCLFlBQXpCLENBQWY7QUFFRDs7OzJDQUVzQjtBQUNyQixXQUFLLGFBQUw7QUFDRDs7O29DQUVlO0FBQ2QsY0FBUSxHQUFSLENBQVkscUJBQVo7O0FBRUEsVUFBSSxXQUFKLEVBQWlCO0FBQ2Ysb0JBQVksY0FBWixHQUE2QixDQUE3QixFQUFnQyxJQUFoQyxDQUFzQyxDQUF0QztBQUNEOztBQUVELG9CQUFjLElBQWQ7QUFDQSxvQkFBYyxhQUFkO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsY0FBUSxHQUFSLENBQVksc0JBQVo7QUFDQSxjQUFRLEdBQVIsQ0FBWSxXQUFaOztBQUVBLFVBQUksZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3hCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxhQUFMO0FBQ0Q7QUFFRjs7OzZCQUVRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxJQUFHLGVBQVI7QUFFRTtBQUFBO0FBQUEsWUFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLFlBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQUssSUFBRyxVQUFSLEVBQW1CLFdBQVUsT0FBN0I7QUFDRTtBQUFBO0FBQUEsa0JBQUssV0FBVSxPQUFmO0FBQXVCO0FBQUE7QUFBQSxvQkFBTSxJQUFHLE9BQVQ7QUFBQTtBQUFBLGlCQUF2QjtBQUFBO0FBQUEsZUFERjtBQUVFO0FBQUE7QUFBQSxrQkFBSyxXQUFVLE1BQWY7QUFBc0I7QUFBQTtBQUFBLG9CQUFNLElBQUcsTUFBVDtBQUFBO0FBQUE7QUFBdEIsZUFGRjtBQUdFO0FBQUE7QUFBQSxrQkFBSyxJQUFHLFFBQVI7QUFBaUI7QUFBQTtBQUFBLG9CQUFNLElBQUcsWUFBVDtBQUFBO0FBQUEsaUJBQWpCO0FBQWdEO0FBQUE7QUFBQSxvQkFBTSxJQUFHLE1BQVQ7QUFBQTtBQUFBLGlCQUFoRDtBQUFvRjtBQUFBO0FBQUEsb0JBQU0sSUFBRyxPQUFUO0FBQUE7QUFBQTtBQUFwRjtBQUhGO0FBREYsV0FERjtBQVFFO0FBQUE7QUFBQSxjQUFLLFdBQVUsd0JBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQVEsTUFBSyxRQUFiLEVBQXNCLFNBQVUsbUJBQU07QUFBQyx5QkFBSyxLQUFMLENBQVcsTUFBWCxHQUFxQixPQUFLLGVBQUwsQ0FBcUIsS0FBckI7QUFBaUMsaUJBQTdGO0FBQUE7QUFBQSxhQURGO0FBRUU7QUFBQTtBQUFBLGdCQUFRLE1BQUssUUFBYixFQUFzQixTQUFTLG1CQUFNO0FBQUMseUJBQUssS0FBTCxDQUFXLE9BQVgsR0FBc0IsT0FBSyxlQUFMLENBQXFCLEtBQXJCO0FBQWlDLGlCQUE3RjtBQUFBO0FBQUEsYUFGRjtBQUdFO0FBQUE7QUFBQSxnQkFBUSxNQUFLLFFBQWIsRUFBc0IsU0FBUyxtQkFBTTtBQUFDLHlCQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQXFCLE9BQUssZUFBTCxDQUFxQixLQUFyQjtBQUFpQyxpQkFBNUY7QUFBQTtBQUFBLGFBSEY7QUFJRyxpQkFBSyxLQUFMLENBQVc7QUFKZCxXQVJGO0FBY0U7QUFBQTtBQUFBLGNBQUssV0FBVSxxQkFBZjtBQUNFLDRDQUFRLElBQUcsVUFBWCxFQUFzQixPQUFNLEtBQTVCLEVBQWtDLFFBQU8sS0FBekM7QUFERjtBQWRGLFNBRkY7QUFxQkU7QUFBQTtBQUFBLFlBQUssV0FBVSxLQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxhQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsVUFBZjtBQUNBLDhDQUFRLElBQUcsWUFBWCxFQUF3QixPQUFNLE1BQTlCLEVBQXFDLFFBQU8sS0FBNUM7QUFEQTtBQURGO0FBREYsU0FyQkY7QUE2QkU7QUFBQTtBQUFBLFlBQUssV0FBVSxLQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxnQ0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQWUsbUJBQUssS0FBTCxDQUFXO0FBQTFCO0FBREY7QUFERjtBQTdCRixPQURGO0FBc0NEOzs7O0VBdEcyQixNQUFNLFM7O0FBdUduQzs7QUFFRCxPQUFPLGVBQVAsR0FBeUIsZUFBekI7QUFDYyIsImZpbGUiOiJQaXRjaFZpc3VhbGl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQaXRjaFZpc3VhbGl6ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgLy8gSW5pdGlhbGl6ZXMgdGhlIHZhcmlhYmxlcyB0aGF0IHRoZSBwaXRjaCBkZXRlY3RvciBhbmQgdmlzdWFsaXplclxuICAgIC8vIHdpbGwgbmVlZCB0byB1c2UgKHNlZSBzY3JpcHRzL3BpdGNoRGV0ZWN0b3IuanMpXG5cbiAgICAvLyBjb3JyZXNwb25kcyB0byBhIDVrSHogc2lnbmFsXG4gICAgLy8gTUFYX1NJWkUgPSBNYXRoLm1heCg0LCBNYXRoLmZsb29yKGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlIC8gNTAwMCkpOyAgXG4gICAgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuXG4gICAgZGV0ZWN0b3JFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXRlY3RvcicgKTtcbiAgICBjYW52YXNFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdvdXRwdXQnICk7XG4gICAgREVCVUdDQU5WQVMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3dhdmVmb3JtJyApO1xuICAgIGdyYXBoQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwaXRjaEdyYXBoJyApO1xuXG4gICAgaWYgKERFQlVHQ0FOVkFTKSB7XG4gICAgICB3YXZlQ2FudmFzID0gREVCVUdDQU5WQVMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHdhdmVDYW52YXMuc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xuICAgICAgd2F2ZUNhbnZhcy5saW5lV2lkdGggPSAxO1xuICAgIH1cblxuICAgIC8vIHBpdGNoIGdyYXBoIGNhbnZhc1xuICAgIGlmIChncmFwaENhbnZhcykge1xuICAgICAgbm90ZUNhbnZhcyA9IGdyYXBoQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBub3RlQ2FudmFzLnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcbiAgICAgIG5vdGVDYW52YXMubGluZVdpZHRoID0gMTtcbiAgICB9XG5cbiAgICBwaXRjaEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BpdGNoJyApO1xuICAgIG5vdGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdub3RlJyApO1xuICAgIGRldHVuZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldHVuZScgKTtcbiAgICBkZXR1bmVBbW91bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldHVuZV9hbXQnICk7XG5cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuc3RvcFVzZXJBdWRpbygpO1xuICB9XG5cbiAgc3RvcFVzZXJBdWRpbygpIHtcbiAgICBjb25zb2xlLmxvZygnU3RvcHBpbmcgdXNlciBpbnB1dCcpO1xuXG4gICAgaWYgKGxvY2FsU3RyZWFtKSB7XG4gICAgICBsb2NhbFN0cmVhbS5nZXRBdWRpb1RyYWNrcygpWzBdLnN0b3AoIDAgKTtcbiAgICB9XG4gICAgXG4gICAgbG9jYWxTdHJlYW0gPSBudWxsO1xuICAgIGNsZWFySW50ZXJ2YWwodXBkYXRlUGl0Y2hJRCk7XG4gIH1cblxuICB0b2dnbGVMaXZlSW5wdXQoKSB7XG4gICAgY29uc29sZS5sb2coJ1RvZ2dsaW5nIGF1ZGlvIGlucHV0Jyk7XG4gICAgY29uc29sZS5sb2cobG9jYWxTdHJlYW0pO1xuXG4gICAgaWYgKGxvY2FsU3RyZWFtID09PSBudWxsKSB7XG4gICAgICBnZXRVc2VyQXVkaW8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wVXNlckF1ZGlvKCk7XG4gICAgfVxuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJwaXRjaGRldGVjdG9yXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzMTIgbDRcIj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkZXRlY3RvclwiIGNsYXNzTmFtZT1cInZhZ3VlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGl0Y2hcIj48c3BhbiBpZD1cInBpdGNoXCI+LS08L3NwYW4+SHo8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RlXCI+PHNwYW4gaWQ9XCJub3RlXCI+LS08L3NwYW4+PC9kaXY+ICAgXG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkZXR1bmVcIj48c3BhbiBpZD1cImRldHVuZV9hbXRcIj4tLTwvc3Bhbj48c3BhbiBpZD1cImZsYXRcIj5jZW50cyAmIzk4Mzc7PC9zcGFuPjxzcGFuIGlkPVwic2hhcnBcIj5jZW50cyAmIzk4Mzk7PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+ICAgICAgIFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wgczEyIGw0IGF1ZGlvUGxheWVyJz5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9IHsoKSA9PiB7dGhpcy5wcm9wcy5vblBsYXkoKTsgdGhpcy50b2dnbGVMaXZlSW5wdXQuYXBwbHkodGhpcyl9fT5QbGF5PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiB7dGhpcy5wcm9wcy5vblBhdXNlKCk7IHRoaXMudG9nZ2xlTGl2ZUlucHV0LmFwcGx5KHRoaXMpfX0+UGF1c2U8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IHt0aGlzLnByb3BzLm9uU3RvcCgpOyB0aGlzLnRvZ2dsZUxpdmVJbnB1dC5hcHBseSh0aGlzKX19PlN0b3A8L2J1dHRvbj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmF1ZGlvUGxheWVyfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHMxMiBsNCBvdmVyZmxvd1wiPlxuICAgICAgICAgICAgPGNhbnZhcyBpZD1cIndhdmVmb3JtXCIgd2lkdGg9XCI1MTJcIiBoZWlnaHQ9XCIyOTBcIj48L2NhbnZhcz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsMTIgczEyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93XCI+XG4gICAgICAgICAgICA8Y2FudmFzIGlkPVwicGl0Y2hHcmFwaFwiIHdpZHRoPVwiMjU2MFwiIGhlaWdodD1cIjI1NlwiPjwvY2FudmFzPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsNCBzNCBzY29yZWJvYXJkIG9mZnNldC1sM1wiPlxuICAgICAgICAgICAgPHNwYW4+U2NvcmUgOiB7dGhpcy5wcm9wcy5zY29yZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG53aW5kb3cuUGl0Y2hWaXN1YWxpemVyID0gUGl0Y2hWaXN1YWxpemVyO1xuICAgICAgICAgICAgICAvLyA8Y2FudmFzIGlkPVwib3V0cHV0XCIgPjwvY2FudmFzPiBiZWxvdyAjbm90ZSJdfQ==