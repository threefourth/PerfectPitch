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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBZSxJQUFJLFlBQUosRUFBZjs7QUFFQSxxQkFBZSxTQUFTLGNBQVQsQ0FBeUIsVUFBekIsQ0FBZjtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0Esb0JBQWMsU0FBUyxjQUFULENBQXlCLFVBQXpCLENBQWQ7QUFDQSxvQkFBYyxTQUFTLGNBQVQsQ0FBeUIsWUFBekIsQ0FBZDs7QUFFQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQsa0JBQVksU0FBUyxjQUFULENBQXlCLE9BQXpCLENBQVo7QUFDQSxpQkFBVyxTQUFTLGNBQVQsQ0FBeUIsTUFBekIsQ0FBWDtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0EscUJBQWUsU0FBUyxjQUFULENBQXlCLFlBQXpCLENBQWY7QUFFRDs7OzJDQUVzQjtBQUNyQixXQUFLLGFBQUw7QUFDRDs7O29DQUVlO0FBQ2QsY0FBUSxHQUFSLENBQVkscUJBQVo7O0FBRUEsVUFBSSxXQUFKLEVBQWlCO0FBQ2Ysb0JBQVksY0FBWixHQUE2QixDQUE3QixFQUFnQyxJQUFoQyxDQUFzQyxDQUF0QztBQUNEOztBQUVELG9CQUFjLElBQWQ7QUFDQSxvQkFBYyxhQUFkO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsY0FBUSxHQUFSLENBQVksc0JBQVo7QUFDQSxjQUFRLEdBQVIsQ0FBWSxXQUFaOztBQUVBLFVBQUksZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3hCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxhQUFMO0FBQ0Q7QUFFRjs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxJQUFHLGVBQVI7QUFDRTtBQUFBO0FBQUEsWUFBSyxJQUFHLFVBQVIsRUFBbUIsV0FBVSxPQUE3QjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsT0FBZjtBQUF1QjtBQUFBO0FBQUEsZ0JBQU0sSUFBRyxPQUFUO0FBQUE7QUFBQSxhQUF2QjtBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUE7QUFBQSxjQUFLLFdBQVUsTUFBZjtBQUFzQjtBQUFBO0FBQUEsZ0JBQU0sSUFBRyxNQUFUO0FBQUE7QUFBQTtBQUF0QixXQUZGO0FBR0UsMENBQVEsSUFBRyxRQUFYLEVBQW9CLE9BQU0sS0FBMUIsRUFBZ0MsUUFBTyxJQUF2QyxHQUhGO0FBSUU7QUFBQTtBQUFBLGNBQUssSUFBRyxRQUFSO0FBQWlCO0FBQUE7QUFBQSxnQkFBTSxJQUFHLFlBQVQ7QUFBQTtBQUFBLGFBQWpCO0FBQWdEO0FBQUE7QUFBQSxnQkFBTSxJQUFHLE1BQVQ7QUFBQTtBQUFBLGFBQWhEO0FBQW9GO0FBQUE7QUFBQSxnQkFBTSxJQUFHLE9BQVQ7QUFBQTtBQUFBO0FBQXBGO0FBSkYsU0FERjtBQVFFLHVDQVJGO0FBU0UsdUNBVEY7QUFXRTtBQUFBO0FBQUEsWUFBUSxTQUFTLEtBQUssZUFBTCxDQUFxQixJQUFyQixDQUEwQixJQUExQixDQUFqQjtBQUFBO0FBQUEsU0FYRjtBQWFFLHdDQUFRLElBQUcsWUFBWCxFQUF3QixPQUFNLE1BQTlCLEVBQXFDLFFBQU8sS0FBNUMsR0FiRjtBQWNFLHdDQUFRLElBQUcsVUFBWCxFQUFzQixPQUFNLEtBQTVCLEVBQWtDLFFBQU8sS0FBekM7QUFkRixPQURGO0FBa0JEOzs7O0VBbEYyQixNQUFNLFM7O0FBbUZuQzs7QUFFRCxPQUFPLGVBQVAsR0FBeUIsZUFBekIiLCJmaWxlIjoiUGl0Y2hWaXN1YWxpemVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGl0Y2hWaXN1YWxpemVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICAgIC8vIEluaXRpYWxpemVzIHRoZSB2YXJpYWJsZXMgdGhhdCB0aGUgcGl0Y2ggZGV0ZWN0b3IgYW5kIHZpc3VhbGl6ZXJcbiAgICAvLyB3aWxsIG5lZWQgdG8gdXNlIChzZWUgc2NyaXB0cy9waXRjaERldGVjdG9yLmpzKVxuXG4gICAgLy8gY29ycmVzcG9uZHMgdG8gYSA1a0h6IHNpZ25hbFxuICAgIC8vIE1BWF9TSVpFID0gTWF0aC5tYXgoNCwgTWF0aC5mbG9vcihhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSAvIDUwMDApKTsgIFxuICAgIGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuICAgIGRldGVjdG9yRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0ZWN0b3InICk7XG4gICAgY2FudmFzRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnb3V0cHV0JyApO1xuICAgIERFQlVHQ0FOVkFTID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICd3YXZlZm9ybScgKTtcbiAgICBncmFwaENhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGl0Y2hHcmFwaCcgKTtcblxuICAgIGlmIChERUJVR0NBTlZBUykge1xuICAgICAgd2F2ZUNhbnZhcyA9IERFQlVHQ0FOVkFTLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB3YXZlQ2FudmFzLnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcbiAgICAgIHdhdmVDYW52YXMubGluZVdpZHRoID0gMTtcbiAgICB9XG5cbiAgICAvLyBwaXRjaCBncmFwaCBjYW52YXNcbiAgICBpZiAoZ3JhcGhDYW52YXMpIHtcbiAgICAgIG5vdGVDYW52YXMgPSBncmFwaENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgbm90ZUNhbnZhcy5zdHJva2VTdHlsZSA9ICdibGFjayc7XG4gICAgICBub3RlQ2FudmFzLmxpbmVXaWR0aCA9IDE7XG4gICAgfVxuXG4gICAgcGl0Y2hFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwaXRjaCcgKTtcbiAgICBub3RlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnbm90ZScgKTtcbiAgICBkZXR1bmVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXR1bmUnICk7XG4gICAgZGV0dW5lQW1vdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXR1bmVfYW10JyApO1xuXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnN0b3BVc2VyQXVkaW8oKTtcbiAgfVxuXG4gIHN0b3BVc2VyQXVkaW8oKSB7XG4gICAgY29uc29sZS5sb2coJ1N0b3BwaW5nIHVzZXIgaW5wdXQnKTtcblxuICAgIGlmIChsb2NhbFN0cmVhbSkge1xuICAgICAgbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXS5zdG9wKCAwICk7XG4gICAgfVxuICAgIFxuICAgIGxvY2FsU3RyZWFtID0gbnVsbDtcbiAgICBjbGVhckludGVydmFsKHVwZGF0ZVBpdGNoSUQpO1xuICB9XG5cbiAgdG9nZ2xlTGl2ZUlucHV0KCkge1xuICAgIGNvbnNvbGUubG9nKCdUb2dnbGluZyBhdWRpbyBpbnB1dCcpO1xuICAgIGNvbnNvbGUubG9nKGxvY2FsU3RyZWFtKTtcblxuICAgIGlmIChsb2NhbFN0cmVhbSA9PT0gbnVsbCkge1xuICAgICAgZ2V0VXNlckF1ZGlvKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFVzZXJBdWRpbygpO1xuICAgIH1cblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwicGl0Y2hkZXRlY3RvclwiPlxuICAgICAgICA8ZGl2IGlkPVwiZGV0ZWN0b3JcIiBjbGFzc05hbWU9XCJ2YWd1ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGl0Y2hcIj48c3BhbiBpZD1cInBpdGNoXCI+LS08L3NwYW4+SHo8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdGVcIj48c3BhbiBpZD1cIm5vdGVcIj4tLTwvc3Bhbj48L2Rpdj4gICBcbiAgICAgICAgICA8Y2FudmFzIGlkPVwib3V0cHV0XCIgd2lkdGg9XCIzMDBcIiBoZWlnaHQ9XCI0MlwiPjwvY2FudmFzPlxuICAgICAgICAgIDxkaXYgaWQ9XCJkZXR1bmVcIj48c3BhbiBpZD1cImRldHVuZV9hbXRcIj4tLTwvc3Bhbj48c3BhbiBpZD1cImZsYXRcIj5jZW50cyAmIzk4Mzc7PC9zcGFuPjxzcGFuIGlkPVwic2hhcnBcIj5jZW50cyAmIzk4Mzk7PC9zcGFuPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8YnI+PC9icj5cbiAgICAgICAgPGJyPjwvYnI+XG5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnRvZ2dsZUxpdmVJbnB1dC5iaW5kKHRoaXMpfT5Vc2UgTGl2ZSBJbnB1dDwvYnV0dG9uPlxuXG4gICAgICAgIDxjYW52YXMgaWQ9XCJwaXRjaEdyYXBoXCIgd2lkdGg9XCIyNTYwXCIgaGVpZ2h0PVwiMjU2XCI+PC9jYW52YXM+XG4gICAgICAgIDxjYW52YXMgaWQ9XCJ3YXZlZm9ybVwiIHdpZHRoPVwiNTEyXCIgaGVpZ2h0PVwiMjU2XCI+PC9jYW52YXM+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG53aW5kb3cuUGl0Y2hWaXN1YWxpemVyID0gUGl0Y2hWaXN1YWxpemVyOyJdfQ==