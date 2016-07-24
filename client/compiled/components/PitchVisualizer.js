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
      var svgWidth = 800;
      var svgHeight = 256;

      var pitchGraph = d3.select('.pitchGraph').append('svg').attr('width', svgWidth).attr('height', svgHeight).attr('class', 'songGraph');

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

      var that = this;
      var svgWidth = 800;
      var svgHeight = 256;

      var userPitchGraph = d3.select('.songGraph');

      var drawUserGraph = function drawUserGraph(data) {

        var xScale = d3.scaleLinear().domain([0, that.props.selectedData.length]).range([0, svgWidth]);
        var yScale = d3.scaleLinear().domain([0, 150]).range([svgHeight, 0]);

        var notes = userPitchGraph.selectAll('circle').data(data, function (d) {
          return d.id;
        });

        // ENTER
        notes.enter().append('circle').attr('cx', function (d) {
          return xScale(d.id);
        }).attr('cy', function (d) {
          return yScale(d.value);
        }).attr('r', 2).attr('fill', 'red');
      };

      setInterval(function () {
        updatePitch();
      }, setIntervalTimeRate);

      setInterval(function () {
        getAvgNote();
        // console.log ( avgNoteArray );
        drawUserGraph(avgNoteArray);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQixVQUFJLGVBQWUsU0FBUyxjQUFULENBQXdCLGNBQXhCLENBQW5CO0FBQ0EsbUJBQWEsS0FBYixHQUFxQixDQUFyQjtBQUNBLFVBQUksY0FBYyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBbEI7QUFDQSxrQkFBWSxLQUFaLEdBQW9CLENBQXBCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFlLElBQUksWUFBSixFQUFmOztBQUVBLHFCQUFlLFNBQVMsY0FBVCxDQUF5QixVQUF6QixDQUFmO0FBQ0EsbUJBQWEsU0FBUyxjQUFULENBQXlCLFFBQXpCLENBQWI7QUFDQSxvQkFBYyxTQUFTLGNBQVQsQ0FBeUIsVUFBekIsQ0FBZDs7QUFFQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQsa0JBQVksU0FBUyxjQUFULENBQXlCLE9BQXpCLENBQVo7QUFDQSxpQkFBVyxTQUFTLGNBQVQsQ0FBeUIsTUFBekIsQ0FBWDtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0EscUJBQWUsU0FBUyxjQUFULENBQXlCLFlBQXpCLENBQWY7O0FBRUE7QUFDQSxVQUFJLFdBQVcsR0FBZjtBQUNBLFVBQUksWUFBWSxHQUFoQjs7QUFFQSxVQUFJLGFBQWEsR0FBRyxNQUFILENBQVUsYUFBVixFQUF5QixNQUF6QixDQUFnQyxLQUFoQyxFQUNkLElBRGMsQ0FDVCxPQURTLEVBQ0EsUUFEQSxFQUVkLElBRmMsQ0FFVCxRQUZTLEVBRUMsU0FGRCxFQUdkLElBSGMsQ0FHVCxPQUhTLEVBR0EsV0FIQSxD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Z0NBQWY7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFlLG1CQUFLLEtBQUwsQ0FBVztBQUExQjtBQURGO0FBREY7QUE5QkYsT0FERjtBQXVDRDs7OztFQXRMMkIsTUFBTSxTOztBQXVMbkM7O0FBRUQsT0FBTyxlQUFQLEdBQXlCLGVBQXpCO0FBQ2MiLCJmaWxlIjoiUGl0Y2hWaXN1YWxpemVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGl0Y2hWaXN1YWxpemVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICAgIHZhciBrYXJhb2tlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2FyYW9rZUlucHV0Jyk7XG4gICAga2FyYW9rZUlucHV0LnZhbHVlID0gMTtcbiAgICB2YXIgdm9jYWxzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9jYWxzSW5wdXQnKTtcbiAgICB2b2NhbHNJbnB1dC52YWx1ZSA9IDA7XG5cbiAgICAvLyBJbml0aWFsaXplcyB0aGUgdmFyaWFibGVzIHRoYXQgdGhlIHBpdGNoIGRldGVjdG9yIGFuZCB2aXN1YWxpemVyXG4gICAgLy8gd2lsbCBuZWVkIHRvIHVzZSAoc2VlIHNjcmlwdHMvcGl0Y2hEZXRlY3Rvci5qcylcblxuICAgIC8vIGNvcnJlc3BvbmRzIHRvIGEgNWtIeiBzaWduYWxcbiAgICAvLyBNQVhfU0laRSA9IE1hdGgubWF4KDQsIE1hdGguZmxvb3IoYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUgLyA1MDAwKSk7ICBcbiAgICBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG5cbiAgICBkZXRlY3RvckVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldGVjdG9yJyApO1xuICAgIGNhbnZhc0VsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ291dHB1dCcgKTtcbiAgICBERUJVR0NBTlZBUyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnd2F2ZWZvcm0nICk7XG5cbiAgICBpZiAoREVCVUdDQU5WQVMpIHtcbiAgICAgIHdhdmVDYW52YXMgPSBERUJVR0NBTlZBUy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgd2F2ZUNhbnZhcy5zdHJva2VTdHlsZSA9ICdibGFjayc7XG4gICAgICB3YXZlQ2FudmFzLmxpbmVXaWR0aCA9IDE7XG4gICAgfVxuXG4gICAgcGl0Y2hFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwaXRjaCcgKTtcbiAgICBub3RlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnbm90ZScgKTtcbiAgICBkZXR1bmVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXR1bmUnICk7XG4gICAgZGV0dW5lQW1vdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXR1bmVfYW10JyApO1xuXG4gICAgLy8gQXR0YWNoIHRoZSBTVkcgZWxlbWVudCBmb3IgZDMgdmlzdWFsaXplclxuICAgIHZhciBzdmdXaWR0aCA9IDgwMDtcbiAgICB2YXIgc3ZnSGVpZ2h0ID0gMjU2O1xuXG4gICAgdmFyIHBpdGNoR3JhcGggPSBkMy5zZWxlY3QoJy5waXRjaEdyYXBoJykuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgc3ZnV2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0Jywgc3ZnSGVpZ2h0KVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3NvbmdHcmFwaCcpO1xuXG4gICAgdmFyIGRyYXdTb25nR3JhcGggPSBmdW5jdGlvbiAoIGRhdGEgKSB7XG5cbiAgICAgIHZhciB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oIFswLCBkYXRhLmxlbmd0aF0gKVxuICAgICAgICAucmFuZ2UoIFswLCBzdmdXaWR0aF0gKTtcbiAgICAgIHZhciB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oIFswLCAxNTBdIClcbiAgICAgICAgLnJhbmdlKCBbc3ZnSGVpZ2h0LCAwXSApO1xuXG4gICAgICB2YXIgbm90ZXMgPSBwaXRjaEdyYXBoLnNlbGVjdEFsbCgncmVjdCcpXG4gICAgICAgIC5kYXRhKCBkYXRhICk7XG5cbiAgICAgIC8vIEVOVEVSXG4gICAgICBub3Rlcy5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICByZXR1cm4geFNjYWxlKGkpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4geVNjYWxlKGQudmFsdWUpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignd2lkdGgnLCBzdmdXaWR0aCAvIGRhdGEubGVuZ3RoKVxuICAgICAgICAuYXR0cignaGVpZ2h0JywgMTApXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJyM1MEM4RkYnKVxuICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgXG4gICAgZHJhd1NvbmdHcmFwaCggdGhpcy5wcm9wcy5zZWxlY3RlZERhdGEgKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuc3RvcFVzZXJBdWRpbygpO1xuICB9XG5cbiAgc3RvcFVzZXJBdWRpbygpIHtcbiAgICBjb25zb2xlLmxvZygnU3RvcHBpbmcgdXNlciBpbnB1dCcpO1xuXG4gICAgaWYgKGxvY2FsU3RyZWFtKSB7XG4gICAgICBsb2NhbFN0cmVhbS5nZXRBdWRpb1RyYWNrcygpWzBdLnN0b3AoIDAgKTtcbiAgICB9XG4gICAgXG4gICAgbG9jYWxTdHJlYW0gPSBudWxsO1xuICAgIGNsZWFySW50ZXJ2YWwodXBkYXRlUGl0Y2hJRCk7XG4gIH1cblxuICB0b2dnbGVMaXZlSW5wdXQoKSB7XG4gICAgY29uc29sZS5sb2coJ1RvZ2dsaW5nIGF1ZGlvIGlucHV0Jyk7XG4gICAgY29uc29sZS5sb2cobG9jYWxTdHJlYW0pO1xuXG4gICAgaWYgKGxvY2FsU3RyZWFtID09PSBudWxsKSB7XG4gICAgICBnZXRVc2VyQXVkaW8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wVXNlckF1ZGlvKCk7XG4gICAgfVxuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBzdmdXaWR0aCA9IDgwMDtcbiAgICB2YXIgc3ZnSGVpZ2h0ID0gMjU2O1xuXG4gICAgdmFyIHVzZXJQaXRjaEdyYXBoID0gZDMuc2VsZWN0KCcuc29uZ0dyYXBoJyk7XG5cbiAgICB2YXIgZHJhd1VzZXJHcmFwaCA9IGZ1bmN0aW9uKCBkYXRhICkge1xuXG4gICAgICB2YXIgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKCBbMCwgdGhhdC5wcm9wcy5zZWxlY3RlZERhdGEubGVuZ3RoXSApXG4gICAgICAgIC5yYW5nZSggWzAsIHN2Z1dpZHRoXSApO1xuICAgICAgdmFyIHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbiggWzAsIDE1MF0gKVxuICAgICAgICAucmFuZ2UoIFtzdmdIZWlnaHQsIDBdICk7XG5cbiAgICAgIHZhciBub3RlcyA9IHVzZXJQaXRjaEdyYXBoLnNlbGVjdEFsbCgnY2lyY2xlJylcbiAgICAgICAgLmRhdGEoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgICB9KTtcblxuICAgICAgLy8gRU5URVJcbiAgICAgIG5vdGVzLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgLmF0dHIoJ2N4JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiB4U2NhbGUoZC5pZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4geVNjYWxlKGQudmFsdWUpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cigncicsIDIpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJ3JlZCcpO1xuICAgIH07XG5cbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIHVwZGF0ZVBpdGNoKCk7XG4gICAgfSwgc2V0SW50ZXJ2YWxUaW1lUmF0ZSk7XG5cbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIGdldEF2Z05vdGUoKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nICggYXZnTm90ZUFycmF5ICk7XG4gICAgICBkcmF3VXNlckdyYXBoKCBhdmdOb3RlQXJyYXkgKTtcbiAgICB9LCAxMDAwKTtcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwicGl0Y2hkZXRlY3RvclwiPlxuICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczEyIGw0XCI+XG4gICAgICAgICAgICA8ZGl2IGlkPVwiZGV0ZWN0b3JcIiBjbGFzc05hbWU9XCJ2YWd1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpdGNoXCI+PHNwYW4gaWQ9XCJwaXRjaFwiPi0tPC9zcGFuPkh6PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90ZVwiPjxzcGFuIGlkPVwibm90ZVwiPi0tPC9zcGFuPjwvZGl2PiAgIFxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGV0dW5lXCI+PHNwYW4gaWQ9XCJkZXR1bmVfYW10XCI+LS08L3NwYW4+PHNwYW4gaWQ9XCJmbGF0XCI+Y2VudHMgJiM5ODM3Ozwvc3Bhbj48c3BhbiBpZD1cInNoYXJwXCI+Y2VudHMgJiM5ODM5Ozwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiAgICAgICBcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sIHMxMiBsNCBhdWRpb1BsYXllcic+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tZmxvYXRpbmcgYnRuLWxhcmdlIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCB0ZWFsXCIgb25DbGljaz0geygpID0+IHt0aGlzLnByb3BzLm9uUGxheSgpOyB0aGlzLnRvZ2dsZUxpdmVJbnB1dCgpIH19PjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+cGxheV9hcnJvdzwvaT48L2E+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tZmxvYXRpbmcgYnRuLWxhcmdlIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCB0ZWFsXCIgb25DbGljaz17KCkgPT4ge3RoaXMucHJvcHMub25QYXVzZSgpOyB0aGlzLnN0b3BVc2VyQXVkaW8uYXBwbHkodGhpcyl9fT48aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnBhdXNlPC9pPjwvYT5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0bi1mbG9hdGluZyBidG4tbGFyZ2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IHRlYWxcIiBvbkNsaWNrPXsoKSA9PiB7dGhpcy5wcm9wcy5vblN0b3AoKTsgdGhpcy5zdG9wVXNlckF1ZGlvLmFwcGx5KHRoaXMpfX0+PGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5zdG9wPC9pPjwvYT5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmF1ZGlvUGxheWVyfVxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIGlkPVwia2FyYW9rZUlucHV0XCIgbWluPVwiMFwiIG1heD1cIjFcIiBzdGVwPVwiMC4xXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25LYXJhb2tlVm9sdW1lQ2hhbmdlfS8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCJ2b2NhbHNJbnB1dFwiIG1pbj1cIjBcIiBtYXg9XCIxXCIgc3RlcD1cIjAuMVwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uVm9jYWxzVm9sdW1lQ2hhbmdlfS8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczEyIGw0IG92ZXJmbG93XCI+XG4gICAgICAgICAgICA8Y2FudmFzIGlkPVwid2F2ZWZvcm1cIiB3aWR0aD1cIjUxMlwiIGhlaWdodD1cIjI5MFwiPjwvY2FudmFzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGwxMiBzMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cgcGl0Y2hHcmFwaFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsNCBzNCBzY29yZWJvYXJkIG9mZnNldC1sM1wiPlxuICAgICAgICAgICAgPHNwYW4+U2NvcmUgOiB7dGhpcy5wcm9wcy5zY29yZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG53aW5kb3cuUGl0Y2hWaXN1YWxpemVyID0gUGl0Y2hWaXN1YWxpemVyO1xuICAgICAgICAgICAgICAvLyA8Y2FudmFzIGlkPVwib3V0cHV0XCIgPjwvY2FudmFzPiBiZWxvdyAjbm90ZSJdfQ==