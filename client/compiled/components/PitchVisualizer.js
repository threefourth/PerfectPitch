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

      localStream.getAudioTracks()[0].stop(0);
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
          React.createElement('canvas', { id: 'output', width: '300', height: '42' }),
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
        ),
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement(
          'button',
          { onClick: this.toggleLiveInput.bind(this) },
          'Use Live Input'
        ),
        React.createElement('canvas', { id: 'pitchGraph', width: '2560', height: '256' }),
        React.createElement('canvas', { id: 'waveform', width: '512', height: '256' })
      );
    }
  }]);

  return PitchVisualizer;
}(React.Component);

;

window.PitchVisualizer = PitchVisualizer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBZSxJQUFJLFlBQUosRUFBZjs7QUFFQSxxQkFBZSxTQUFTLGNBQVQsQ0FBeUIsVUFBekIsQ0FBZjtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0Esb0JBQWMsU0FBUyxjQUFULENBQXlCLFVBQXpCLENBQWQ7QUFDQSxvQkFBYyxTQUFTLGNBQVQsQ0FBeUIsWUFBekIsQ0FBZDs7QUFFQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQsa0JBQVksU0FBUyxjQUFULENBQXlCLE9BQXpCLENBQVo7QUFDQSxpQkFBVyxTQUFTLGNBQVQsQ0FBeUIsTUFBekIsQ0FBWDtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0EscUJBQWUsU0FBUyxjQUFULENBQXlCLFlBQXpCLENBQWY7QUFFRDs7OzJDQUVzQjtBQUNyQixXQUFLLGFBQUw7QUFDRDs7O29DQUVlO0FBQ2QsY0FBUSxHQUFSLENBQVkscUJBQVo7O0FBRUEsa0JBQVksY0FBWixHQUE2QixDQUE3QixFQUFnQyxJQUFoQyxDQUFzQyxDQUF0QztBQUNBLG9CQUFjLElBQWQ7QUFDQSxvQkFBYyxhQUFkO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsY0FBUSxHQUFSLENBQVksc0JBQVo7QUFDQSxjQUFRLEdBQVIsQ0FBWSxXQUFaOztBQUVBLFVBQUksZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3hCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxhQUFMO0FBQ0Q7QUFFRjs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxJQUFHLGVBQVI7QUFDRTtBQUFBO0FBQUEsWUFBSyxJQUFHLFVBQVIsRUFBbUIsV0FBVSxPQUE3QjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsT0FBZjtBQUF1QjtBQUFBO0FBQUEsZ0JBQU0sSUFBRyxPQUFUO0FBQUE7QUFBQSxhQUF2QjtBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUE7QUFBQSxjQUFLLFdBQVUsTUFBZjtBQUFzQjtBQUFBO0FBQUEsZ0JBQU0sSUFBRyxNQUFUO0FBQUE7QUFBQTtBQUF0QixXQUZGO0FBR0UsMENBQVEsSUFBRyxRQUFYLEVBQW9CLE9BQU0sS0FBMUIsRUFBZ0MsUUFBTyxJQUF2QyxHQUhGO0FBSUU7QUFBQTtBQUFBLGNBQUssSUFBRyxRQUFSO0FBQWlCO0FBQUE7QUFBQSxnQkFBTSxJQUFHLFlBQVQ7QUFBQTtBQUFBLGFBQWpCO0FBQWdEO0FBQUE7QUFBQSxnQkFBTSxJQUFHLE1BQVQ7QUFBQTtBQUFBLGFBQWhEO0FBQW9GO0FBQUE7QUFBQSxnQkFBTSxJQUFHLE9BQVQ7QUFBQTtBQUFBO0FBQXBGO0FBSkYsU0FERjtBQVFFLHVDQVJGO0FBU0UsdUNBVEY7QUFXRTtBQUFBO0FBQUEsWUFBUSxTQUFTLEtBQUssZUFBTCxDQUFxQixJQUFyQixDQUEwQixJQUExQixDQUFqQjtBQUFBO0FBQUEsU0FYRjtBQWFFLHdDQUFRLElBQUcsWUFBWCxFQUF3QixPQUFNLE1BQTlCLEVBQXFDLFFBQU8sS0FBNUMsR0FiRjtBQWNFLHdDQUFRLElBQUcsVUFBWCxFQUFzQixPQUFNLEtBQTVCLEVBQWtDLFFBQU8sS0FBekM7QUFkRixPQURGO0FBa0JEOzs7O0VBL0UyQixNQUFNLFM7O0FBZ0ZuQzs7QUFFRCxPQUFPLGVBQVAsR0FBeUIsZUFBekIiLCJmaWxlIjoiUGl0Y2hWaXN1YWxpemVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGl0Y2hWaXN1YWxpemVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZXMgdGhlIHZhcmlhYmxlcyB0aGF0IHRoZSBwaXRjaCBkZXRlY3RvciBhbmQgdmlzdWFsaXplclxyXG4gICAgLy8gd2lsbCBuZWVkIHRvIHVzZSAoc2VlIHNjcmlwdHMvcGl0Y2hEZXRlY3Rvci5qcylcclxuXHJcbiAgICAvLyBjb3JyZXNwb25kcyB0byBhIDVrSHogc2lnbmFsXHJcbiAgICAvLyBNQVhfU0laRSA9IE1hdGgubWF4KDQsIE1hdGguZmxvb3IoYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUgLyA1MDAwKSk7ICBcclxuICAgIGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcclxuXHJcbiAgICBkZXRlY3RvckVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldGVjdG9yJyApO1xyXG4gICAgY2FudmFzRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnb3V0cHV0JyApO1xyXG4gICAgREVCVUdDQU5WQVMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3dhdmVmb3JtJyApO1xyXG4gICAgZ3JhcGhDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BpdGNoR3JhcGgnICk7XHJcblxyXG4gICAgaWYgKERFQlVHQ0FOVkFTKSB7XHJcbiAgICAgIHdhdmVDYW52YXMgPSBERUJVR0NBTlZBUy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICB3YXZlQ2FudmFzLnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcclxuICAgICAgd2F2ZUNhbnZhcy5saW5lV2lkdGggPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBpdGNoIGdyYXBoIGNhbnZhc1xyXG4gICAgaWYgKGdyYXBoQ2FudmFzKSB7XHJcbiAgICAgIG5vdGVDYW52YXMgPSBncmFwaENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICBub3RlQ2FudmFzLnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcclxuICAgICAgbm90ZUNhbnZhcy5saW5lV2lkdGggPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHBpdGNoRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGl0Y2gnICk7XHJcbiAgICBub3RlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnbm90ZScgKTtcclxuICAgIGRldHVuZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldHVuZScgKTtcclxuICAgIGRldHVuZUFtb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0dW5lX2FtdCcgKTtcclxuXHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIHRoaXMuc3RvcFVzZXJBdWRpbygpO1xyXG4gIH1cclxuXHJcbiAgc3RvcFVzZXJBdWRpbygpIHtcclxuICAgIGNvbnNvbGUubG9nKCdTdG9wcGluZyB1c2VyIGlucHV0Jyk7XHJcbiAgICBcclxuICAgIGxvY2FsU3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0uc3RvcCggMCApO1xyXG4gICAgbG9jYWxTdHJlYW0gPSBudWxsO1xyXG4gICAgY2xlYXJJbnRlcnZhbCh1cGRhdGVQaXRjaElEKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUxpdmVJbnB1dCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdUb2dnbGluZyBhdWRpbyBpbnB1dCcpO1xyXG4gICAgY29uc29sZS5sb2cobG9jYWxTdHJlYW0pO1xyXG5cclxuICAgIGlmIChsb2NhbFN0cmVhbSA9PT0gbnVsbCkge1xyXG4gICAgICBnZXRVc2VyQXVkaW8oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RvcFVzZXJBdWRpbygpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgaWQ9XCJwaXRjaGRldGVjdG9yXCI+XHJcbiAgICAgICAgPGRpdiBpZD1cImRldGVjdG9yXCIgY2xhc3NOYW1lPVwidmFndWVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGl0Y2hcIj48c3BhbiBpZD1cInBpdGNoXCI+LS08L3NwYW4+SHo8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90ZVwiPjxzcGFuIGlkPVwibm90ZVwiPi0tPC9zcGFuPjwvZGl2PiAgIFxyXG4gICAgICAgICAgPGNhbnZhcyBpZD1cIm91dHB1dFwiIHdpZHRoPVwiMzAwXCIgaGVpZ2h0PVwiNDJcIj48L2NhbnZhcz5cclxuICAgICAgICAgIDxkaXYgaWQ9XCJkZXR1bmVcIj48c3BhbiBpZD1cImRldHVuZV9hbXRcIj4tLTwvc3Bhbj48c3BhbiBpZD1cImZsYXRcIj5jZW50cyAmIzk4Mzc7PC9zcGFuPjxzcGFuIGlkPVwic2hhcnBcIj5jZW50cyAmIzk4Mzk7PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8YnI+PC9icj5cclxuICAgICAgICA8YnI+PC9icj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnRvZ2dsZUxpdmVJbnB1dC5iaW5kKHRoaXMpfT5Vc2UgTGl2ZSBJbnB1dDwvYnV0dG9uPlxyXG5cclxuICAgICAgICA8Y2FudmFzIGlkPVwicGl0Y2hHcmFwaFwiIHdpZHRoPVwiMjU2MFwiIGhlaWdodD1cIjI1NlwiPjwvY2FudmFzPlxyXG4gICAgICAgIDxjYW52YXMgaWQ9XCJ3YXZlZm9ybVwiIHdpZHRoPVwiNTEyXCIgaGVpZ2h0PVwiMjU2XCI+PC9jYW52YXM+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcblxyXG53aW5kb3cuUGl0Y2hWaXN1YWxpemVyID0gUGl0Y2hWaXN1YWxpemVyOyJdfQ==