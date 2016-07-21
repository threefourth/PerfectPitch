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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBZSxJQUFJLFlBQUosRUFBZjs7QUFFQSxxQkFBZSxTQUFTLGNBQVQsQ0FBeUIsVUFBekIsQ0FBZjtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0Esb0JBQWMsU0FBUyxjQUFULENBQXlCLFVBQXpCLENBQWQ7QUFDQSxvQkFBYyxTQUFTLGNBQVQsQ0FBeUIsWUFBekIsQ0FBZDs7QUFFQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQsa0JBQVksU0FBUyxjQUFULENBQXlCLE9BQXpCLENBQVo7QUFDQSxpQkFBVyxTQUFTLGNBQVQsQ0FBeUIsTUFBekIsQ0FBWDtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0EscUJBQWUsU0FBUyxjQUFULENBQXlCLFlBQXpCLENBQWY7QUFFRDs7OzJDQUVzQjtBQUNyQixXQUFLLGFBQUw7QUFDRDs7O29DQUVlO0FBQ2QsY0FBUSxHQUFSLENBQVkscUJBQVo7O0FBRUEsa0JBQVksY0FBWixHQUE2QixDQUE3QixFQUFnQyxJQUFoQyxDQUFzQyxDQUF0QztBQUNBLG9CQUFjLElBQWQ7QUFDQSxvQkFBYyxhQUFkO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsY0FBUSxHQUFSLENBQVksc0JBQVo7QUFDQSxjQUFRLEdBQVIsQ0FBWSxXQUFaOztBQUVBLFVBQUksZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3hCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxhQUFMO0FBQ0Q7QUFFRjs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxJQUFHLGVBQVI7QUFDRTtBQUFBO0FBQUEsWUFBSyxJQUFHLFVBQVIsRUFBbUIsV0FBVSxPQUE3QjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsT0FBZjtBQUF1QjtBQUFBO0FBQUEsZ0JBQU0sSUFBRyxPQUFUO0FBQUE7QUFBQSxhQUF2QjtBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUE7QUFBQSxjQUFLLFdBQVUsTUFBZjtBQUFzQjtBQUFBO0FBQUEsZ0JBQU0sSUFBRyxNQUFUO0FBQUE7QUFBQTtBQUF0QixXQUZGO0FBR0UsMENBQVEsSUFBRyxRQUFYLEVBQW9CLE9BQU0sS0FBMUIsRUFBZ0MsUUFBTyxJQUF2QyxHQUhGO0FBSUU7QUFBQTtBQUFBLGNBQUssSUFBRyxRQUFSO0FBQWlCO0FBQUE7QUFBQSxnQkFBTSxJQUFHLFlBQVQ7QUFBQTtBQUFBLGFBQWpCO0FBQWdEO0FBQUE7QUFBQSxnQkFBTSxJQUFHLE1BQVQ7QUFBQTtBQUFBLGFBQWhEO0FBQW9GO0FBQUE7QUFBQSxnQkFBTSxJQUFHLE9BQVQ7QUFBQTtBQUFBO0FBQXBGO0FBSkYsU0FERjtBQVFFLHVDQVJGO0FBU0UsdUNBVEY7QUFXRTtBQUFBO0FBQUEsWUFBUSxTQUFTLEtBQUssZUFBTCxDQUFxQixJQUFyQixDQUEwQixJQUExQixDQUFqQjtBQUFBO0FBQUEsU0FYRjtBQWFFLHdDQUFRLElBQUcsWUFBWCxFQUF3QixPQUFNLE1BQTlCLEVBQXFDLFFBQU8sS0FBNUMsR0FiRjtBQWNFLHdDQUFRLElBQUcsVUFBWCxFQUFzQixPQUFNLEtBQTVCLEVBQWtDLFFBQU8sS0FBekM7QUFkRixPQURGO0FBa0JEOzs7O0VBL0UyQixNQUFNLFM7O0FBZ0ZuQzs7QUFFRCxPQUFPLGVBQVAsR0FBeUIsZUFBekIiLCJmaWxlIjoiUGl0Y2hWaXN1YWxpemVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGl0Y2hWaXN1YWxpemVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICAgIC8vIEluaXRpYWxpemVzIHRoZSB2YXJpYWJsZXMgdGhhdCB0aGUgcGl0Y2ggZGV0ZWN0b3IgYW5kIHZpc3VhbGl6ZXJcbiAgICAvLyB3aWxsIG5lZWQgdG8gdXNlIChzZWUgc2NyaXB0cy9waXRjaERldGVjdG9yLmpzKVxuXG4gICAgLy8gY29ycmVzcG9uZHMgdG8gYSA1a0h6IHNpZ25hbFxuICAgIC8vIE1BWF9TSVpFID0gTWF0aC5tYXgoNCwgTWF0aC5mbG9vcihhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSAvIDUwMDApKTsgIFxuICAgIGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuICAgIGRldGVjdG9yRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0ZWN0b3InICk7XG4gICAgY2FudmFzRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnb3V0cHV0JyApO1xuICAgIERFQlVHQ0FOVkFTID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICd3YXZlZm9ybScgKTtcbiAgICBncmFwaENhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGl0Y2hHcmFwaCcgKTtcblxuICAgIGlmIChERUJVR0NBTlZBUykge1xuICAgICAgd2F2ZUNhbnZhcyA9IERFQlVHQ0FOVkFTLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB3YXZlQ2FudmFzLnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcbiAgICAgIHdhdmVDYW52YXMubGluZVdpZHRoID0gMTtcbiAgICB9XG5cbiAgICAvLyBwaXRjaCBncmFwaCBjYW52YXNcbiAgICBpZiAoZ3JhcGhDYW52YXMpIHtcbiAgICAgIG5vdGVDYW52YXMgPSBncmFwaENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgbm90ZUNhbnZhcy5zdHJva2VTdHlsZSA9ICdibGFjayc7XG4gICAgICBub3RlQ2FudmFzLmxpbmVXaWR0aCA9IDE7XG4gICAgfVxuXG4gICAgcGl0Y2hFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwaXRjaCcgKTtcbiAgICBub3RlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnbm90ZScgKTtcbiAgICBkZXR1bmVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXR1bmUnICk7XG4gICAgZGV0dW5lQW1vdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXR1bmVfYW10JyApO1xuXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnN0b3BVc2VyQXVkaW8oKTtcbiAgfVxuXG4gIHN0b3BVc2VyQXVkaW8oKSB7XG4gICAgY29uc29sZS5sb2coJ1N0b3BwaW5nIHVzZXIgaW5wdXQnKTtcbiAgICBcbiAgICBsb2NhbFN0cmVhbS5nZXRBdWRpb1RyYWNrcygpWzBdLnN0b3AoIDAgKTtcbiAgICBsb2NhbFN0cmVhbSA9IG51bGw7XG4gICAgY2xlYXJJbnRlcnZhbCh1cGRhdGVQaXRjaElEKTtcbiAgfVxuXG4gIHRvZ2dsZUxpdmVJbnB1dCgpIHtcbiAgICBjb25zb2xlLmxvZygnVG9nZ2xpbmcgYXVkaW8gaW5wdXQnKTtcbiAgICBjb25zb2xlLmxvZyhsb2NhbFN0cmVhbSk7XG5cbiAgICBpZiAobG9jYWxTdHJlYW0gPT09IG51bGwpIHtcbiAgICAgIGdldFVzZXJBdWRpbygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BVc2VyQXVkaW8oKTtcbiAgICB9XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cInBpdGNoZGV0ZWN0b3JcIj5cbiAgICAgICAgPGRpdiBpZD1cImRldGVjdG9yXCIgY2xhc3NOYW1lPVwidmFndWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpdGNoXCI+PHNwYW4gaWQ9XCJwaXRjaFwiPi0tPC9zcGFuPkh6PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RlXCI+PHNwYW4gaWQ9XCJub3RlXCI+LS08L3NwYW4+PC9kaXY+ICAgXG4gICAgICAgICAgPGNhbnZhcyBpZD1cIm91dHB1dFwiIHdpZHRoPVwiMzAwXCIgaGVpZ2h0PVwiNDJcIj48L2NhbnZhcz5cbiAgICAgICAgICA8ZGl2IGlkPVwiZGV0dW5lXCI+PHNwYW4gaWQ9XCJkZXR1bmVfYW10XCI+LS08L3NwYW4+PHNwYW4gaWQ9XCJmbGF0XCI+Y2VudHMgJiM5ODM3Ozwvc3Bhbj48c3BhbiBpZD1cInNoYXJwXCI+Y2VudHMgJiM5ODM5Ozwvc3Bhbj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGJyPjwvYnI+XG4gICAgICAgIDxicj48L2JyPlxuXG4gICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy50b2dnbGVMaXZlSW5wdXQuYmluZCh0aGlzKX0+VXNlIExpdmUgSW5wdXQ8L2J1dHRvbj5cblxuICAgICAgICA8Y2FudmFzIGlkPVwicGl0Y2hHcmFwaFwiIHdpZHRoPVwiMjU2MFwiIGhlaWdodD1cIjI1NlwiPjwvY2FudmFzPlxuICAgICAgICA8Y2FudmFzIGlkPVwid2F2ZWZvcm1cIiB3aWR0aD1cIjUxMlwiIGhlaWdodD1cIjI1NlwiPjwvY2FudmFzPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxud2luZG93LlBpdGNoVmlzdWFsaXplciA9IFBpdGNoVmlzdWFsaXplcjsiXX0=