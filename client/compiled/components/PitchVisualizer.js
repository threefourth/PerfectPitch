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

      // Draw the graphs for the first song 
      pitchGraph = d3.select('.pitchGraph').append('svg').attr('width', svgWidth).attr('height', svgHeight).attr('class', 'songGraph');

      this.drawSongGraph(this.props.selectedData);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      console.log('Updating PitchVisualizer');
      this.stopUserAudio();
      document.getElementById('.songGraph');

      // Refresh graph
      d3.selectAll('svg > *').remove();
      this.drawSongGraph(this.props.selectedData);
    }
  }, {
    key: 'drawSongGraph',
    value: function drawSongGraph(data) {

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

      // End pitch detection/visualization processes
      clearInterval(updatePitchID);
      clearInterval(drawUserGraphID);

      // Refresh user's avgNoteArray
      avgNoteArray = [];
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

        notes.exit().exit().remove();
      };

      updatePitchID = setInterval(function () {
        updatePitch();
      }, 1000 / 60);

      drawUserGraphID = setInterval(function () {
        getAvgNote(noteArray);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQixVQUFJLGVBQWUsU0FBUyxjQUFULENBQXdCLGNBQXhCLENBQW5CO0FBQ0EsbUJBQWEsS0FBYixHQUFxQixDQUFyQjtBQUNBLFVBQUksY0FBYyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBbEI7QUFDQSxrQkFBWSxLQUFaLEdBQW9CLENBQXBCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFlLElBQUksWUFBSixFQUFmOztBQUVBLHFCQUFlLFNBQVMsY0FBVCxDQUF5QixVQUF6QixDQUFmO0FBQ0EsbUJBQWEsU0FBUyxjQUFULENBQXlCLFFBQXpCLENBQWI7QUFDQSxvQkFBYyxTQUFTLGNBQVQsQ0FBeUIsVUFBekIsQ0FBZDs7QUFFQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQsa0JBQVksU0FBUyxjQUFULENBQXlCLE9BQXpCLENBQVo7QUFDQSxpQkFBVyxTQUFTLGNBQVQsQ0FBeUIsTUFBekIsQ0FBWDtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0EscUJBQWUsU0FBUyxjQUFULENBQXlCLFlBQXpCLENBQWY7O0FBRUE7QUFDQSxtQkFBYSxHQUFHLE1BQUgsQ0FBVSxhQUFWLEVBQXlCLE1BQXpCLENBQWdDLEtBQWhDLEVBQ1YsSUFEVSxDQUNMLE9BREssRUFDSSxRQURKLEVBRVYsSUFGVSxDQUVMLFFBRkssRUFFSyxTQUZMLEVBR1YsSUFIVSxDQUdMLE9BSEssRUFHSSxXQUhKLENBQWI7O0FBS0EsV0FBSyxhQUFMLENBQW9CLEtBQUssS0FBTCxDQUFXLFlBQS9C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QUcsVUFBWCxFQUFzQixPQUFNLEtBQTVCLEVBQWtDLFFBQU8sS0FBekM7QUFERjtBQWhCRixTQUZGO0FBdUJFO0FBQUE7QUFBQSxZQUFLLFdBQVUsS0FBZjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZjtBQUNFLHlDQUFLLFdBQVUscUJBQWY7QUFERjtBQURGLFNBdkJGO0FBOEJFO0FBQUE7QUFBQSxZQUFLLFdBQVUsS0FBZjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsZ0NBQWY7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFlLG1CQUFLLEtBQUwsQ0FBVztBQUExQjtBQURGO0FBREY7QUE5QkYsT0FERjtBQXVDRDs7OztFQWxNMkIsTUFBTSxTOztBQW1NbkM7O0FBRUQsT0FBTyxlQUFQLEdBQXlCLGVBQXpCO0FBQ2MiLCJmaWxlIjoiUGl0Y2hWaXN1YWxpemVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGl0Y2hWaXN1YWxpemVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICAgIHZhciBrYXJhb2tlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2FyYW9rZUlucHV0Jyk7XG4gICAga2FyYW9rZUlucHV0LnZhbHVlID0gMTtcbiAgICB2YXIgdm9jYWxzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9jYWxzSW5wdXQnKTtcbiAgICB2b2NhbHNJbnB1dC52YWx1ZSA9IDA7XG5cbiAgICAvLyBJbml0aWFsaXplcyB0aGUgdmFyaWFibGVzIHRoYXQgdGhlIHBpdGNoIGRldGVjdG9yIGFuZCB2aXN1YWxpemVyXG4gICAgLy8gd2lsbCBuZWVkIHRvIHVzZSAoc2VlIHNjcmlwdHMvcGl0Y2hEZXRlY3Rvci5qcylcblxuICAgIC8vIGNvcnJlc3BvbmRzIHRvIGEgNWtIeiBzaWduYWxcbiAgICAvLyBNQVhfU0laRSA9IE1hdGgubWF4KDQsIE1hdGguZmxvb3IoYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUgLyA1MDAwKSk7ICBcbiAgICBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG5cbiAgICBkZXRlY3RvckVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldGVjdG9yJyApO1xuICAgIGNhbnZhc0VsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ291dHB1dCcgKTtcbiAgICBERUJVR0NBTlZBUyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnd2F2ZWZvcm0nICk7XG5cbiAgICBpZiAoREVCVUdDQU5WQVMpIHtcbiAgICAgIHdhdmVDYW52YXMgPSBERUJVR0NBTlZBUy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgd2F2ZUNhbnZhcy5zdHJva2VTdHlsZSA9ICdibGFjayc7XG4gICAgICB3YXZlQ2FudmFzLmxpbmVXaWR0aCA9IDE7XG4gICAgfVxuXG4gICAgcGl0Y2hFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwaXRjaCcgKTtcbiAgICBub3RlRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnbm90ZScgKTtcbiAgICBkZXR1bmVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXR1bmUnICk7XG4gICAgZGV0dW5lQW1vdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXR1bmVfYW10JyApO1xuXG4gICAgLy8gRHJhdyB0aGUgZ3JhcGhzIGZvciB0aGUgZmlyc3Qgc29uZyBcbiAgICBwaXRjaEdyYXBoID0gZDMuc2VsZWN0KCcucGl0Y2hHcmFwaCcpLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHN2Z1dpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHN2Z0hlaWdodClcbiAgICAgIC5hdHRyKCdjbGFzcycsICdzb25nR3JhcGgnKTtcblxuICAgIHRoaXMuZHJhd1NvbmdHcmFwaCggdGhpcy5wcm9wcy5zZWxlY3RlZERhdGEgKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7XG4gICAgY29uc29sZS5sb2coJ1VwZGF0aW5nIFBpdGNoVmlzdWFsaXplcicpO1xuICAgIHRoaXMuc3RvcFVzZXJBdWRpbygpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcuc29uZ0dyYXBoJyk7XG5cbiAgICAvLyBSZWZyZXNoIGdyYXBoXG4gICAgZDMuc2VsZWN0QWxsKCdzdmcgPiAqJykucmVtb3ZlKCk7XG4gICAgdGhpcy5kcmF3U29uZ0dyYXBoKCB0aGlzLnByb3BzLnNlbGVjdGVkRGF0YSApO1xuICB9XG5cbiAgZHJhd1NvbmdHcmFwaCggZGF0YSApIHtcblxuICAgIHZhciB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAuZG9tYWluKCBbMCwgZGF0YS5sZW5ndGhdIClcbiAgICAgIC5yYW5nZSggWzAsIHN2Z1dpZHRoXSApO1xuICAgIHZhciB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAuZG9tYWluKCBbMCwgMTUwXSApXG4gICAgICAucmFuZ2UoIFtzdmdIZWlnaHQsIDBdICk7XG5cbiAgICB2YXIgbm90ZXMgPSBwaXRjaEdyYXBoLnNlbGVjdEFsbCgncmVjdCcpXG4gICAgICAuZGF0YSggZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgIH0gKTtcblxuICAgIC8vIEVOVEVSXG4gICAgbm90ZXMuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIHhTY2FsZShpKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHlTY2FsZShkLnZhbHVlKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cignd2lkdGgnLCBzdmdXaWR0aCAvIGRhdGEubGVuZ3RoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIDEwKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnIzUwQzhGRicpXG4gICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgfSk7XG4gIH1cblxuICBzdG9wVXNlckF1ZGlvKCkge1xuICAgIGNvbnNvbGUubG9nKCdTdG9wcGluZyB1c2VyIGlucHV0Jyk7XG4gICAgY29uc29sZS5sb2cobG9jYWxTdHJlYW0pO1xuICAgIGlmIChsb2NhbFN0cmVhbSkge1xuICAgICAgbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXS5zdG9wKCAwICk7XG4gICAgfVxuICAgIFxuICAgIGxvY2FsU3RyZWFtID0gbnVsbDtcblxuICAgIC8vIEVuZCBwaXRjaCBkZXRlY3Rpb24vdmlzdWFsaXphdGlvbiBwcm9jZXNzZXNcbiAgICBjbGVhckludGVydmFsKCB1cGRhdGVQaXRjaElEICk7XG4gICAgY2xlYXJJbnRlcnZhbCggZHJhd1VzZXJHcmFwaElEICk7XG5cbiAgICAvLyBSZWZyZXNoIHVzZXIncyBhdmdOb3RlQXJyYXlcbiAgICBhdmdOb3RlQXJyYXkgPSBbXTtcbiAgfVxuXG4gIHRvZ2dsZUxpdmVJbnB1dCgpIHtcbiAgICBjb25zb2xlLmxvZygnVG9nZ2xpbmcgYXVkaW8gaW5wdXQnKTtcbiAgICBjb25zb2xlLmxvZyhsb2NhbFN0cmVhbSk7XG5cbiAgICBpZiAobG9jYWxTdHJlYW0gPT09IG51bGwpIHtcbiAgICAgIGdldFVzZXJBdWRpbygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BVc2VyQXVkaW8oKTtcbiAgICB9XG5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIHVzZXJQaXRjaEdyYXBoID0gZDMuc2VsZWN0KCcuc29uZ0dyYXBoJyk7XG5cbiAgICB2YXIgZHJhd1VzZXJHcmFwaCA9IGZ1bmN0aW9uKCBkYXRhICkge1xuXG4gICAgICB2YXIgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKCBbMCwgdGhhdC5wcm9wcy5zZWxlY3RlZERhdGEubGVuZ3RoXSApXG4gICAgICAgIC5yYW5nZSggWzAsIHN2Z1dpZHRoXSApO1xuICAgICAgdmFyIHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbiggWzAsIDE1MF0gKVxuICAgICAgICAucmFuZ2UoIFtzdmdIZWlnaHQsIDBdICk7XG5cbiAgICAgIHZhciBub3RlcyA9IHVzZXJQaXRjaEdyYXBoLnNlbGVjdEFsbCgnY2lyY2xlJylcbiAgICAgICAgLmRhdGEoZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgICB9KTtcblxuICAgICAgLy8gRU5URVJcbiAgICAgIG5vdGVzLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgICAgLmF0dHIoJ2N4JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiB4U2NhbGUoZC5pZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4geVNjYWxlKGQudmFsdWUpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cigncicsIDIpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJ3JlZCcpO1xuXG4gICAgICBub3Rlcy5leGl0KClcbiAgICAgICAgLmV4aXQoKVxuICAgICAgICAucmVtb3ZlKCk7XG4gICAgfTtcblxuICAgIHVwZGF0ZVBpdGNoSUQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIHVwZGF0ZVBpdGNoKCk7XG4gICAgfSwgMTAwMCAvIDYwKTtcblxuICAgIGRyYXdVc2VyR3JhcGhJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgZ2V0QXZnTm90ZSggbm90ZUFycmF5ICk7XG4gICAgICAvLyBjb25zb2xlLmxvZyAoIGF2Z05vdGVBcnJheSApO1xuICAgICAgZHJhd1VzZXJHcmFwaCggYXZnTm90ZUFycmF5ICk7XG4gICAgfSwgMTAwMCk7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cInBpdGNoZGV0ZWN0b3JcIj5cbiAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHMxMiBsNFwiPlxuICAgICAgICAgICAgPGRpdiBpZD1cImRldGVjdG9yXCIgY2xhc3NOYW1lPVwidmFndWVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaXRjaFwiPjxzcGFuIGlkPVwicGl0Y2hcIj4tLTwvc3Bhbj5IejwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdGVcIj48c3BhbiBpZD1cIm5vdGVcIj4tLTwvc3Bhbj48L2Rpdj4gICBcbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRldHVuZVwiPjxzcGFuIGlkPVwiZGV0dW5lX2FtdFwiPi0tPC9zcGFuPjxzcGFuIGlkPVwiZmxhdFwiPmNlbnRzICYjOTgzNzs8L3NwYW4+PHNwYW4gaWQ9XCJzaGFycFwiPmNlbnRzICYjOTgzOTs8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbCBzMTIgbDQgYXVkaW9QbGF5ZXInPlxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuLWZsb2F0aW5nIGJ0bi1sYXJnZSB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgdGVhbFwiIG9uQ2xpY2s9IHsoKSA9PiB7dGhpcy5wcm9wcy5vblBsYXkoKTsgdGhpcy50b2dnbGVMaXZlSW5wdXQoKSB9fT48aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnBsYXlfYXJyb3c8L2k+PC9hPlxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuLWZsb2F0aW5nIGJ0bi1sYXJnZSB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgdGVhbFwiIG9uQ2xpY2s9eygpID0+IHt0aGlzLnByb3BzLm9uUGF1c2UoKTsgdGhpcy5zdG9wVXNlckF1ZGlvLmFwcGx5KHRoaXMpfX0+PGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5wYXVzZTwvaT48L2E+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tZmxvYXRpbmcgYnRuLWxhcmdlIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCB0ZWFsXCIgb25DbGljaz17KCkgPT4ge3RoaXMucHJvcHMub25TdG9wKCk7IHRoaXMuc3RvcFVzZXJBdWRpby5hcHBseSh0aGlzKX19PjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+c3RvcDwvaT48L2E+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5hdWRpb1BsYXllcn1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cImthcmFva2VJbnB1dFwiIG1pbj1cIjBcIiBtYXg9XCIxXCIgc3RlcD1cIjAuMVwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uS2FyYW9rZVZvbHVtZUNoYW5nZX0vPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIGlkPVwidm9jYWxzSW5wdXRcIiBtaW49XCIwXCIgbWF4PVwiMVwiIHN0ZXA9XCIwLjFcIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblZvY2Fsc1ZvbHVtZUNoYW5nZX0vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHMxMiBsNCBvdmVyZmxvd1wiPlxuICAgICAgICAgICAgPGNhbnZhcyBpZD1cIndhdmVmb3JtXCIgd2lkdGg9XCI1MTJcIiBoZWlnaHQ9XCIyOTBcIj48L2NhbnZhcz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsMTIgczEyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93IHBpdGNoR3JhcGhcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbDQgczQgc2NvcmVib2FyZCBvZmZzZXQtbDNcIj5cbiAgICAgICAgICAgIDxzcGFuPlNjb3JlIDoge3RoaXMucHJvcHMuc2NvcmV9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxud2luZG93LlBpdGNoVmlzdWFsaXplciA9IFBpdGNoVmlzdWFsaXplcjtcbiAgICAgICAgICAgICAgLy8gPGNhbnZhcyBpZD1cIm91dHB1dFwiID48L2NhbnZhcz4gYmVsb3cgI25vdGUiXX0=