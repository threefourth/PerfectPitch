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

      var karaokeInput = document.getElementById('karaokeInput');
      karaokeInput.value = 1;
      var vocalsInput = document.getElementById('vocalsInput');
      vocalsInput.value = 0;

      // Initializes the variables that the pitch detector and visualizer
      // will need to use (see scripts/pitchDetector.js)

      // corresponds to a 5kHz signal
      // MAX_SIZE = Math.max(4, Math.floor(audioContext.sampleRate / 5000));  
      audioContext = new AudioContext();

      detectorElem = document.getElementById('detector');
      canvasElem = document.getElementById('output');
      DEBUGCANVAS = document.getElementById('waveform');

      if (DEBUGCANVAS) {
        waveCanvas = DEBUGCANVAS.getContext('2d');
        waveCanvas.strokeStyle = 'black';
        waveCanvas.lineWidth = 1;
      }

      pitchElem = document.getElementById('pitch');
      noteElem = document.getElementById('note');
      detuneElem = document.getElementById('detune');
      detuneAmount = document.getElementById('detune_amt');

      // Attach the SVG element for d3 visualizer
      var svgWidth = 1000;
      var svgHeight = 256;

      var pitchGraph = d3.select('.pitchGraph').append('svg').attr('width', svgWidth).attr('height', svgHeight);

      var drawSongGraph = function drawSongGraph(data) {

        var xScale = d3.scaleLinear().domain([0, data.length]).range([0, svgWidth]);
        var yScale = d3.scaleLinear().domain([0, 150]).range([svgHeight, 0]);

        var notes = pitchGraph.selectAll('rect').data(data);

        // ENTER
        notes.enter().append('rect').attr('x', function (d, i) {
          return xScale(i);
        }).attr('y', function (d) {
          return yScale(d.value);
        }).attr('width', svgWidth / data.length).attr('height', 10).attr('fill', '#50C8FF').attr('id', function (d) {
          return d.id;
        });
      };

      drawSongGraph(this.props.selectedData);
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

      setInterval(function () {
        updatePitch();
      }, setIntervalTimeRate);

      setInterval(function () {
        getAvgNote();
        console.log(avgNoteArray);
      }, 1000);
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
              'a',
              { className: 'btn-floating btn-large waves-effect waves-light teal', onClick: function onClick() {
                  _this2.props.onPlay();_this2.toggleLiveInput();
                } },
              React.createElement(
                'i',
                { className: 'material-icons' },
                'play_arrow'
              )
            ),
            React.createElement(
              'a',
              { className: 'btn-floating btn-large waves-effect waves-light teal', onClick: function onClick() {
                  _this2.props.onPause();_this2.stopUserAudio.apply(_this2);
                } },
              React.createElement(
                'i',
                { className: 'material-icons' },
                'pause'
              )
            ),
            React.createElement(
              'a',
              { className: 'btn-floating btn-large waves-effect waves-light teal', onClick: function onClick() {
                  _this2.props.onStop();_this2.stopUserAudio.apply(_this2);
                } },
              React.createElement(
                'i',
                { className: 'material-icons' },
                'stop'
              )
            ),
            this.props.audioPlayer,
            React.createElement('input', { type: 'range', id: 'karaokeInput', min: '0', max: '1', step: '0.1', onChange: this.props.onKaraokeVolumeChange }),
            React.createElement('input', { type: 'range', id: 'vocalsInput', min: '0', max: '1', step: '0.1', onChange: this.props.onVocalsVolumeChange })
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
            React.createElement('div', { className: 'overflow pitchGraph' })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQixVQUFJLGVBQWUsU0FBUyxjQUFULENBQXdCLGNBQXhCLENBQW5CO0FBQ0EsbUJBQWEsS0FBYixHQUFxQixDQUFyQjtBQUNBLFVBQUksY0FBYyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBbEI7QUFDQSxrQkFBWSxLQUFaLEdBQW9CLENBQXBCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFlLElBQUksWUFBSixFQUFmOztBQUVBLHFCQUFlLFNBQVMsY0FBVCxDQUF5QixVQUF6QixDQUFmO0FBQ0EsbUJBQWEsU0FBUyxjQUFULENBQXlCLFFBQXpCLENBQWI7QUFDQSxvQkFBYyxTQUFTLGNBQVQsQ0FBeUIsVUFBekIsQ0FBZDs7QUFFQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQsa0JBQVksU0FBUyxjQUFULENBQXlCLE9BQXpCLENBQVo7QUFDQSxpQkFBVyxTQUFTLGNBQVQsQ0FBeUIsTUFBekIsQ0FBWDtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0EscUJBQWUsU0FBUyxjQUFULENBQXlCLFlBQXpCLENBQWY7O0FBRUE7QUFDQSxVQUFJLFdBQVcsSUFBZjtBQUNBLFVBQUksWUFBWSxHQUFoQjs7QUFFQSxVQUFJLGFBQWEsR0FBRyxNQUFILENBQVUsYUFBVixFQUF5QixNQUF6QixDQUFnQyxLQUFoQyxFQUNkLElBRGMsQ0FDVCxPQURTLEVBQ0EsUUFEQSxFQUVkLElBRmMsQ0FFVCxRQUZTLEVBRUMsU0FGRCxDQUFqQjs7QUFJQSxVQUFJLGdCQUFnQixTQUFoQixh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VSxxQkFBZjtBQURGO0FBREYsU0F2QkY7QUE4QkU7QUFBQTtBQUFBLFlBQUssV0FBVSxLQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxnQ0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQWUsbUJBQUssS0FBTCxDQUFXO0FBQTFCO0FBREY7QUFERjtBQTlCRixPQURGO0FBdUNEOzs7O0VBbkoyQixNQUFNLFM7O0FBb0puQzs7QUFFRCxPQUFPLGVBQVAsR0FBeUIsZUFBekI7QUFDYyIsImZpbGUiOiJQaXRjaFZpc3VhbGl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQaXRjaFZpc3VhbGl6ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgdmFyIGthcmFva2VJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrYXJhb2tlSW5wdXQnKTtcbiAgICBrYXJhb2tlSW5wdXQudmFsdWUgPSAxO1xuICAgIHZhciB2b2NhbHNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2NhbHNJbnB1dCcpO1xuICAgIHZvY2Fsc0lucHV0LnZhbHVlID0gMDtcblxuICAgIC8vIEluaXRpYWxpemVzIHRoZSB2YXJpYWJsZXMgdGhhdCB0aGUgcGl0Y2ggZGV0ZWN0b3IgYW5kIHZpc3VhbGl6ZXJcbiAgICAvLyB3aWxsIG5lZWQgdG8gdXNlIChzZWUgc2NyaXB0cy9waXRjaERldGVjdG9yLmpzKVxuXG4gICAgLy8gY29ycmVzcG9uZHMgdG8gYSA1a0h6IHNpZ25hbFxuICAgIC8vIE1BWF9TSVpFID0gTWF0aC5tYXgoNCwgTWF0aC5mbG9vcihhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSAvIDUwMDApKTsgIFxuICAgIGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuICAgIGRldGVjdG9yRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0ZWN0b3InICk7XG4gICAgY2FudmFzRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnb3V0cHV0JyApO1xuICAgIERFQlVHQ0FOVkFTID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICd3YXZlZm9ybScgKTtcblxuICAgIGlmIChERUJVR0NBTlZBUykge1xuICAgICAgd2F2ZUNhbnZhcyA9IERFQlVHQ0FOVkFTLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB3YXZlQ2FudmFzLnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcbiAgICAgIHdhdmVDYW52YXMubGluZVdpZHRoID0gMTtcbiAgICB9XG5cbiAgICBwaXRjaEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BpdGNoJyApO1xuICAgIG5vdGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdub3RlJyApO1xuICAgIGRldHVuZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldHVuZScgKTtcbiAgICBkZXR1bmVBbW91bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldHVuZV9hbXQnICk7XG5cbiAgICAvLyBBdHRhY2ggdGhlIFNWRyBlbGVtZW50IGZvciBkMyB2aXN1YWxpemVyXG4gICAgdmFyIHN2Z1dpZHRoID0gMTAwMDtcbiAgICB2YXIgc3ZnSGVpZ2h0ID0gMjU2O1xuXG4gICAgdmFyIHBpdGNoR3JhcGggPSBkMy5zZWxlY3QoJy5waXRjaEdyYXBoJykuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgc3ZnV2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0Jywgc3ZnSGVpZ2h0KTtcblxuICAgIHZhciBkcmF3U29uZ0dyYXBoID0gZnVuY3Rpb24gKCBkYXRhICkge1xuXG4gICAgICB2YXIgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKCBbMCwgZGF0YS5sZW5ndGhdIClcbiAgICAgICAgLnJhbmdlKCBbMCwgc3ZnV2lkdGhdICk7XG4gICAgICB2YXIgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKCBbMCwgMTUwXSApXG4gICAgICAgIC5yYW5nZSggW3N2Z0hlaWdodCwgMF0gKTtcblxuICAgICAgdmFyIG5vdGVzID0gcGl0Y2hHcmFwaC5zZWxlY3RBbGwoJ3JlY3QnKVxuICAgICAgICAuZGF0YSggZGF0YSApO1xuXG4gICAgICAvLyBFTlRFUlxuICAgICAgbm90ZXMuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgcmV0dXJuIHhTY2FsZShpKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHlTY2FsZShkLnZhbHVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgc3ZnV2lkdGggLyBkYXRhLmxlbmd0aClcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDEwKVxuICAgICAgICAuYXR0cignZmlsbCcsICcjNTBDOEZGJylcbiAgICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFxuICAgIGRyYXdTb25nR3JhcGgoIHRoaXMucHJvcHMuc2VsZWN0ZWREYXRhICk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnN0b3BVc2VyQXVkaW8oKTtcbiAgfVxuXG4gIHN0b3BVc2VyQXVkaW8oKSB7XG4gICAgY29uc29sZS5sb2coJ1N0b3BwaW5nIHVzZXIgaW5wdXQnKTtcblxuICAgIGlmIChsb2NhbFN0cmVhbSkge1xuICAgICAgbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXS5zdG9wKCAwICk7XG4gICAgfVxuICAgIFxuICAgIGxvY2FsU3RyZWFtID0gbnVsbDtcbiAgICBjbGVhckludGVydmFsKHVwZGF0ZVBpdGNoSUQpO1xuICB9XG5cbiAgdG9nZ2xlTGl2ZUlucHV0KCkge1xuICAgIGNvbnNvbGUubG9nKCdUb2dnbGluZyBhdWRpbyBpbnB1dCcpO1xuICAgIGNvbnNvbGUubG9nKGxvY2FsU3RyZWFtKTtcblxuICAgIGlmIChsb2NhbFN0cmVhbSA9PT0gbnVsbCkge1xuICAgICAgZ2V0VXNlckF1ZGlvKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFVzZXJBdWRpbygpO1xuICAgIH1cblxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgdXBkYXRlUGl0Y2goKTtcbiAgICB9LCBzZXRJbnRlcnZhbFRpbWVSYXRlKTtcblxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgZ2V0QXZnTm90ZSgpO1xuICAgICAgY29uc29sZS5sb2cgKCBhdmdOb3RlQXJyYXkgKTtcbiAgICB9LCAxMDAwKTtcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwicGl0Y2hkZXRlY3RvclwiPlxuICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczEyIGw0XCI+XG4gICAgICAgICAgICA8ZGl2IGlkPVwiZGV0ZWN0b3JcIiBjbGFzc05hbWU9XCJ2YWd1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpdGNoXCI+PHNwYW4gaWQ9XCJwaXRjaFwiPi0tPC9zcGFuPkh6PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90ZVwiPjxzcGFuIGlkPVwibm90ZVwiPi0tPC9zcGFuPjwvZGl2PiAgIFxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGV0dW5lXCI+PHNwYW4gaWQ9XCJkZXR1bmVfYW10XCI+LS08L3NwYW4+PHNwYW4gaWQ9XCJmbGF0XCI+Y2VudHMgJiM5ODM3Ozwvc3Bhbj48c3BhbiBpZD1cInNoYXJwXCI+Y2VudHMgJiM5ODM5Ozwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiAgICAgICBcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sIHMxMiBsNCBhdWRpb1BsYXllcic+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tZmxvYXRpbmcgYnRuLWxhcmdlIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCB0ZWFsXCIgb25DbGljaz0geygpID0+IHt0aGlzLnByb3BzLm9uUGxheSgpOyB0aGlzLnRvZ2dsZUxpdmVJbnB1dCgpIH19PjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+cGxheV9hcnJvdzwvaT48L2E+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tZmxvYXRpbmcgYnRuLWxhcmdlIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCB0ZWFsXCIgb25DbGljaz17KCkgPT4ge3RoaXMucHJvcHMub25QYXVzZSgpOyB0aGlzLnN0b3BVc2VyQXVkaW8uYXBwbHkodGhpcyl9fT48aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnBhdXNlPC9pPjwvYT5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0bi1mbG9hdGluZyBidG4tbGFyZ2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IHRlYWxcIiBvbkNsaWNrPXsoKSA9PiB7dGhpcy5wcm9wcy5vblN0b3AoKTsgdGhpcy5zdG9wVXNlckF1ZGlvLmFwcGx5KHRoaXMpfX0+PGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5zdG9wPC9pPjwvYT5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmF1ZGlvUGxheWVyfVxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIGlkPVwia2FyYW9rZUlucHV0XCIgbWluPVwiMFwiIG1heD1cIjFcIiBzdGVwPVwiMC4xXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25LYXJhb2tlVm9sdW1lQ2hhbmdlfS8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCJ2b2NhbHNJbnB1dFwiIG1pbj1cIjBcIiBtYXg9XCIxXCIgc3RlcD1cIjAuMVwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uVm9jYWxzVm9sdW1lQ2hhbmdlfS8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczEyIGw0IG92ZXJmbG93XCI+XG4gICAgICAgICAgICA8Y2FudmFzIGlkPVwid2F2ZWZvcm1cIiB3aWR0aD1cIjUxMlwiIGhlaWdodD1cIjI5MFwiPjwvY2FudmFzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGwxMiBzMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cgcGl0Y2hHcmFwaFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsNCBzNCBzY29yZWJvYXJkIG9mZnNldC1sM1wiPlxuICAgICAgICAgICAgPHNwYW4+U2NvcmUgOiB7dGhpcy5wcm9wcy5zY29yZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG53aW5kb3cuUGl0Y2hWaXN1YWxpemVyID0gUGl0Y2hWaXN1YWxpemVyO1xuICAgICAgICAgICAgICAvLyA8Y2FudmFzIGlkPVwib3V0cHV0XCIgPjwvY2FudmFzPiBiZWxvdyAjbm90ZSJdfQ==