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

        var notes = pitchGraph.selectAll('rect').data(data, function (d) {
          return d.id;
        });

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
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      console.log('Updating PitchVisualizer');
      this.stopUserAudio();
      document.getElementById('.songGraph');
    }
  }, {
    key: 'stopUserAudio',
    value: function stopUserAudio() {
      console.log('Stopping user input');
      console.log(localStream);
      if (localStream) {
        localStream.getAudioTracks()[0].stop(0);
      }

      localStream = null;
      clearInterval(updatePitchID);
      clearInterval(drawUserGraphID);
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

      updatePitchID = setInterval(function () {
        updatePitch();
      }, setIntervalTimeRate);

      drawUserGraphID = setInterval(function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQixVQUFJLGVBQWUsU0FBUyxjQUFULENBQXdCLGNBQXhCLENBQW5CO0FBQ0EsbUJBQWEsS0FBYixHQUFxQixDQUFyQjtBQUNBLFVBQUksY0FBYyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBbEI7QUFDQSxrQkFBWSxLQUFaLEdBQW9CLENBQXBCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFlLElBQUksWUFBSixFQUFmOztBQUVBLHFCQUFlLFNBQVMsY0FBVCxDQUF5QixVQUF6QixDQUFmO0FBQ0EsbUJBQWEsU0FBUyxjQUFULENBQXlCLFFBQXpCLENBQWI7QUFDQSxvQkFBYyxTQUFTLGNBQVQsQ0FBeUIsVUFBekIsQ0FBZDs7QUFFQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQsa0JBQVksU0FBUyxjQUFULENBQXlCLE9BQXpCLENBQVo7QUFDQSxpQkFBVyxTQUFTLGNBQVQsQ0FBeUIsTUFBekIsQ0FBWDtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0EscUJBQWUsU0FBUyxjQUFULENBQXlCLFlBQXpCLENBQWY7O0FBRUE7QUFDQSxVQUFJLFdBQVcsR0FBZjtBQUNBLFVBQUksWUFBWSxHQUFoQjs7QUFFQSxVQUFJLGFBQWEsR0FBRyxNQUFILENBQVUsYUFBVixFQUF5QixNQUF6QixDQUFnQyxLQUFoQyxFQUNkLElBRGMsQ0FDVCxPQURTLEVBQ0EsUUFEQSxFQUVkLElBRmMsQ0FFVCxRQUZTLEVBRUMsU0FGRCxFQUdkLElBSGMsQ0FHVCxPQUhTLEVBR0EsV0FIQSxD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QURGO0FBaEJGLFNBRkY7QUF1QkU7QUFBQTtBQUFBLFlBQUssV0FBVSxLQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxhQUFmO0FBQ0UseUNBQUssV0FBVSxxQkFBZjtBQURGO0FBREYsU0F2QkY7QUE4QkU7QUFBQTtBQUFBLFlBQUssV0FBVSxLQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxnQ0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQWUsbUJBQUssS0FBTCxDQUFXO0FBQTFCO0FBREY7QUFERjtBQTlCRixPQURGO0FBdUNEOzs7O0VBM0wyQixNQUFNLFM7O0FBNExuQzs7QUFFRCxPQUFPLGVBQVAsR0FBeUIsZUFBekI7QUFDYyIsImZpbGUiOiJQaXRjaFZpc3VhbGl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQaXRjaFZpc3VhbGl6ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgdmFyIGthcmFva2VJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrYXJhb2tlSW5wdXQnKTtcbiAgICBrYXJhb2tlSW5wdXQudmFsdWUgPSAxO1xuICAgIHZhciB2b2NhbHNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2NhbHNJbnB1dCcpO1xuICAgIHZvY2Fsc0lucHV0LnZhbHVlID0gMDtcblxuICAgIC8vIEluaXRpYWxpemVzIHRoZSB2YXJpYWJsZXMgdGhhdCB0aGUgcGl0Y2ggZGV0ZWN0b3IgYW5kIHZpc3VhbGl6ZXJcbiAgICAvLyB3aWxsIG5lZWQgdG8gdXNlIChzZWUgc2NyaXB0cy9waXRjaERldGVjdG9yLmpzKVxuXG4gICAgLy8gY29ycmVzcG9uZHMgdG8gYSA1a0h6IHNpZ25hbFxuICAgIC8vIE1BWF9TSVpFID0gTWF0aC5tYXgoNCwgTWF0aC5mbG9vcihhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSAvIDUwMDApKTsgIFxuICAgIGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuICAgIGRldGVjdG9yRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0ZWN0b3InICk7XG4gICAgY2FudmFzRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnb3V0cHV0JyApO1xuICAgIERFQlVHQ0FOVkFTID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICd3YXZlZm9ybScgKTtcblxuICAgIGlmIChERUJVR0NBTlZBUykge1xuICAgICAgd2F2ZUNhbnZhcyA9IERFQlVHQ0FOVkFTLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB3YXZlQ2FudmFzLnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcbiAgICAgIHdhdmVDYW52YXMubGluZVdpZHRoID0gMTtcbiAgICB9XG5cbiAgICBwaXRjaEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BpdGNoJyApO1xuICAgIG5vdGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdub3RlJyApO1xuICAgIGRldHVuZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldHVuZScgKTtcbiAgICBkZXR1bmVBbW91bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldHVuZV9hbXQnICk7XG5cbiAgICAvLyBBdHRhY2ggdGhlIFNWRyBlbGVtZW50IGZvciBkMyB2aXN1YWxpemVyXG4gICAgdmFyIHN2Z1dpZHRoID0gODAwO1xuICAgIHZhciBzdmdIZWlnaHQgPSAyNTY7XG5cbiAgICB2YXIgcGl0Y2hHcmFwaCA9IGQzLnNlbGVjdCgnLnBpdGNoR3JhcGgnKS5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignd2lkdGgnLCBzdmdXaWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCBzdmdIZWlnaHQpXG4gICAgICAuYXR0cignY2xhc3MnLCAnc29uZ0dyYXBoJyk7XG5cbiAgICB2YXIgZHJhd1NvbmdHcmFwaCA9IGZ1bmN0aW9uICggZGF0YSApIHtcblxuICAgICAgdmFyIHhTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbiggWzAsIGRhdGEubGVuZ3RoXSApXG4gICAgICAgIC5yYW5nZSggWzAsIHN2Z1dpZHRoXSApO1xuICAgICAgdmFyIHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbiggWzAsIDE1MF0gKVxuICAgICAgICAucmFuZ2UoIFtzdmdIZWlnaHQsIDBdICk7XG5cbiAgICAgIHZhciBub3RlcyA9IHBpdGNoR3JhcGguc2VsZWN0QWxsKCdyZWN0JylcbiAgICAgICAgLmRhdGEoIGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgICAgfSApO1xuXG4gICAgICAvLyBFTlRFUlxuICAgICAgbm90ZXMuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgcmV0dXJuIHhTY2FsZShpKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHlTY2FsZShkLnZhbHVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgc3ZnV2lkdGggLyBkYXRhLmxlbmd0aClcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDEwKVxuICAgICAgICAuYXR0cignZmlsbCcsICcjNTBDOEZGJylcbiAgICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFxuICAgIGRyYXdTb25nR3JhcGgoIHRoaXMucHJvcHMuc2VsZWN0ZWREYXRhICk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVXBkYXRlKCkge1xuICAgIGNvbnNvbGUubG9nKCdVcGRhdGluZyBQaXRjaFZpc3VhbGl6ZXInKTtcbiAgICB0aGlzLnN0b3BVc2VyQXVkaW8oKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnLnNvbmdHcmFwaCcpO1xuICB9XG5cbiAgc3RvcFVzZXJBdWRpbygpIHtcbiAgICBjb25zb2xlLmxvZygnU3RvcHBpbmcgdXNlciBpbnB1dCcpO1xuICAgIGNvbnNvbGUubG9nKGxvY2FsU3RyZWFtKTtcbiAgICBpZiAobG9jYWxTdHJlYW0pIHtcbiAgICAgIGxvY2FsU3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0uc3RvcCggMCApO1xuICAgIH1cbiAgICBcbiAgICBsb2NhbFN0cmVhbSA9IG51bGw7XG4gICAgY2xlYXJJbnRlcnZhbCggdXBkYXRlUGl0Y2hJRCApO1xuICAgIGNsZWFySW50ZXJ2YWwoIGRyYXdVc2VyR3JhcGhJRCApO1xuICB9XG5cbiAgdG9nZ2xlTGl2ZUlucHV0KCkge1xuICAgIGNvbnNvbGUubG9nKCdUb2dnbGluZyBhdWRpbyBpbnB1dCcpO1xuICAgIGNvbnNvbGUubG9nKGxvY2FsU3RyZWFtKTtcblxuICAgIGlmIChsb2NhbFN0cmVhbSA9PT0gbnVsbCkge1xuICAgICAgZ2V0VXNlckF1ZGlvKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFVzZXJBdWRpbygpO1xuICAgIH1cblxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgc3ZnV2lkdGggPSA4MDA7XG4gICAgdmFyIHN2Z0hlaWdodCA9IDI1NjtcblxuICAgIHZhciB1c2VyUGl0Y2hHcmFwaCA9IGQzLnNlbGVjdCgnLnNvbmdHcmFwaCcpO1xuXG4gICAgdmFyIGRyYXdVc2VyR3JhcGggPSBmdW5jdGlvbiggZGF0YSApIHtcblxuICAgICAgdmFyIHhTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbiggWzAsIHRoYXQucHJvcHMuc2VsZWN0ZWREYXRhLmxlbmd0aF0gKVxuICAgICAgICAucmFuZ2UoIFswLCBzdmdXaWR0aF0gKTtcbiAgICAgIHZhciB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oIFswLCAxNTBdIClcbiAgICAgICAgLnJhbmdlKCBbc3ZnSGVpZ2h0LCAwXSApO1xuXG4gICAgICB2YXIgbm90ZXMgPSB1c2VyUGl0Y2hHcmFwaC5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gICAgICAgIC5kYXRhKGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIEVOVEVSXG4gICAgICBub3Rlcy5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4geFNjYWxlKGQuaWQpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignY3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHlTY2FsZShkLnZhbHVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3InLCAyKVxuICAgICAgICAuYXR0cignZmlsbCcsICdyZWQnKTtcbiAgICB9O1xuXG4gICAgdXBkYXRlUGl0Y2hJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgdXBkYXRlUGl0Y2goKTtcbiAgICB9LCBzZXRJbnRlcnZhbFRpbWVSYXRlKTtcblxuICAgIGRyYXdVc2VyR3JhcGhJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgZ2V0QXZnTm90ZSgpO1xuICAgICAgLy8gY29uc29sZS5sb2cgKCBhdmdOb3RlQXJyYXkgKTtcbiAgICAgIGRyYXdVc2VyR3JhcGgoIGF2Z05vdGVBcnJheSApO1xuICAgIH0sIDEwMDApO1xuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJwaXRjaGRldGVjdG9yXCI+XG4gICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzMTIgbDRcIj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkZXRlY3RvclwiIGNsYXNzTmFtZT1cInZhZ3VlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGl0Y2hcIj48c3BhbiBpZD1cInBpdGNoXCI+LS08L3NwYW4+SHo8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RlXCI+PHNwYW4gaWQ9XCJub3RlXCI+LS08L3NwYW4+PC9kaXY+ICAgXG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkZXR1bmVcIj48c3BhbiBpZD1cImRldHVuZV9hbXRcIj4tLTwvc3Bhbj48c3BhbiBpZD1cImZsYXRcIj5jZW50cyAmIzk4Mzc7PC9zcGFuPjxzcGFuIGlkPVwic2hhcnBcIj5jZW50cyAmIzk4Mzk7PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+ICAgICAgIFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wgczEyIGw0IGF1ZGlvUGxheWVyJz5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0bi1mbG9hdGluZyBidG4tbGFyZ2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IHRlYWxcIiBvbkNsaWNrPSB7KCkgPT4ge3RoaXMucHJvcHMub25QbGF5KCk7IHRoaXMudG9nZ2xlTGl2ZUlucHV0KCkgfX0+PGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5wbGF5X2Fycm93PC9pPjwvYT5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0bi1mbG9hdGluZyBidG4tbGFyZ2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IHRlYWxcIiBvbkNsaWNrPXsoKSA9PiB7dGhpcy5wcm9wcy5vblBhdXNlKCk7IHRoaXMuc3RvcFVzZXJBdWRpby5hcHBseSh0aGlzKX19PjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+cGF1c2U8L2k+PC9hPlxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuLWZsb2F0aW5nIGJ0bi1sYXJnZSB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgdGVhbFwiIG9uQ2xpY2s9eygpID0+IHt0aGlzLnByb3BzLm9uU3RvcCgpOyB0aGlzLnN0b3BVc2VyQXVkaW8uYXBwbHkodGhpcyl9fT48aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnN0b3A8L2k+PC9hPlxuICAgICAgICAgICAge3RoaXMucHJvcHMuYXVkaW9QbGF5ZXJ9XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCJrYXJhb2tlSW5wdXRcIiBtaW49XCIwXCIgbWF4PVwiMVwiIHN0ZXA9XCIwLjFcIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkthcmFva2VWb2x1bWVDaGFuZ2V9Lz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cInZvY2Fsc0lucHV0XCIgbWluPVwiMFwiIG1heD1cIjFcIiBzdGVwPVwiMC4xXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25Wb2NhbHNWb2x1bWVDaGFuZ2V9Lz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzMTIgbDQgb3ZlcmZsb3dcIj5cbiAgICAgICAgICAgIDxjYW52YXMgaWQ9XCJ3YXZlZm9ybVwiIHdpZHRoPVwiNTEyXCIgaGVpZ2h0PVwiMjkwXCI+PC9jYW52YXM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbDEyIHMxMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdyBwaXRjaEdyYXBoXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGw0IHM0IHNjb3JlYm9hcmQgb2Zmc2V0LWwzXCI+XG4gICAgICAgICAgICA8c3Bhbj5TY29yZSA6IHt0aGlzLnByb3BzLnNjb3JlfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbndpbmRvdy5QaXRjaFZpc3VhbGl6ZXIgPSBQaXRjaFZpc3VhbGl6ZXI7XG4gICAgICAgICAgICAgIC8vIDxjYW52YXMgaWQ9XCJvdXRwdXRcIiA+PC9jYW52YXM+IGJlbG93ICNub3RlIl19