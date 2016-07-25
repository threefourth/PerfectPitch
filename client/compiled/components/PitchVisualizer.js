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
      var yScale = d3.scaleLinear().domain([50, 120]).range([svgHeight, 0]);

      var notes = pitchGraph.selectAll('rect').data(data, function (d) {
        return d.id;
      });

      pitchGraph.append('rect').attr('width', '100%').attr('height', '100%').attr('fill', 'white').attr('fill-opacity', 0.5);

      // ENTER
      notes.enter().append('rect').attr('x', function (d, i) {
        return xScale(i);
      }).attr('y', function (d) {
        return yScale(d.value);
      }).attr('width', svgWidth / data.length * 3).attr('height', 4).attr('fill', '#4DB6AC').attr('id', function (d) {
        return d.id;
      });

      // UPDATE
      notes.transition().attr('x', function (d, i) {
        return xScale(i);
      }).attr('y', function (d) {
        return yScale(d.value);
      }).attr('width', svgWidth / data.length * 3).attr('height', 4).attr('fill', '#4DB6AC').attr('id', function (d) {
        return d.id;
      });

      // EXIT
      notes.exit().remove();
    }
  }, {
    key: 'stopUserAudio',
    value: function stopUserAudio() {
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

      if (localStream === null) {
        getUserAudio();
      } else {
        this.stopUserAudio();
      }

      var userPitchGraph = d3.select('.songGraph');

      var drawUserGraph = function drawUserGraph(data, songData) {

        var xScale = d3.scaleLinear().domain([0, that.props.selectedData.length]).range([0, svgWidth]);
        var yScale = d3.scaleLinear().domain([50, 120]).range([svgHeight, 0]);

        var notes = userPitchGraph.selectAll('ellipse').data(data, function (d) {
          return d.id;
        });

        // ENTER
        notes.enter().append('ellipse').attr('cx', function (d) {
          return xScale(d.id) + svgWidth / that.props.selectedData.length;
        }).attr('cy', function (d) {
          return yScale(d.value);
        }).attr('rx', svgWidth / that.props.selectedData.length * 1.5).attr('ry', 2).attr('fill', 'yellow').attr('id', function (d) {
          return d.id;
        });

        // UPDATE
        notes.transition().attr('cx', function (d) {
          return xScale(d.id) + svgWidth / songData.length;
        }).attr('cy', function (d) {
          return yScale(d.value);
        }).attr('rx', svgWidth / that.props.selectedData.length * 1.5).attr('ry', 2).attr('fill', 'red').attr('id', function (d) {
          return d.id;
        });

        // EXIT
        notes.exit().remove();
      };

      var that = this;

      updatePitchID = setInterval(function () {
        updatePitch();
      }, 1000 / 60);

      drawUserGraphID = setInterval(function () {
        getAvgNote(noteArray);
        drawUserGraph(avgNoteArray, that.props.selectedData);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQixVQUFJLGVBQWUsU0FBUyxjQUFULENBQXdCLGNBQXhCLENBQW5CO0FBQ0EsbUJBQWEsS0FBYixHQUFxQixDQUFyQjtBQUNBLFVBQUksY0FBYyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBbEI7QUFDQSxrQkFBWSxLQUFaLEdBQW9CLENBQXBCOztBQUVBO0FBQ0E7O0FBRUEscUJBQWUsSUFBSSxZQUFKLEVBQWY7O0FBRUEscUJBQWUsU0FBUyxjQUFULENBQXlCLFVBQXpCLENBQWY7QUFDQSxtQkFBYSxTQUFTLGNBQVQsQ0FBeUIsUUFBekIsQ0FBYjtBQUNBLG9CQUFjLFNBQVMsY0FBVCxDQUF5QixVQUF6QixDQUFkOztBQUVBLFVBQUksV0FBSixFQUFpQjtBQUNmLHFCQUFhLFlBQVksVUFBWixDQUF1QixJQUF2QixDQUFiO0FBQ0EsbUJBQVcsV0FBWCxHQUF5QixPQUF6QjtBQUNBLG1CQUFXLFNBQVgsR0FBdUIsQ0FBdkI7QUFDRDs7QUFFRCxrQkFBWSxTQUFTLGNBQVQsQ0FBeUIsT0FBekIsQ0FBWjtBQUNBLGlCQUFXLFNBQVMsY0FBVCxDQUF5QixNQUF6QixDQUFYO0FBQ0EsbUJBQWEsU0FBUyxjQUFULENBQXlCLFFBQXpCLENBQWI7QUFDQSxxQkFBZSxTQUFTLGNBQVQsQ0FBeUIsWUFBekIsQ0FBZjs7QUFFQTtBQUNBLG1CQUFhLEdBQUcsTUFBSCxDQUFVLGFBQVYsRUFBeUIsTUFBekIsQ0FBZ0MsS0FBaEMsRUFDVixJQURVLENBQ0wsT0FESyxFQUNJLFFBREosRUFFVixJQUZVLENBRUwsUUFGSyxFQUVLLFNBRkwsRUFHVixJQUhVLENBR0wsT0FISyxFQUdJLFdBSEosQ0FBYjs7QUFLQSxXQUFLLGFBQUwsQ0FBb0IsS0FBSyxLQUFMLENBQVcsWUFBL0I7QUFDRDs7OzBD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LE9BQVosRUFBb0IsSUFBRyxhQUF2QixFQUFxQyxLQUFJLEdBQXpDLEVBQTZDLEtBQUksR0FBakQsRUFBcUQsTUFBSyxLQUExRCxFQUFnRSxVQUFVLEtBQUssS0FBTCxDQUFXLG9CQUFyRjtBQU5GLFdBUkY7QUFnQkU7QUFBQTtBQUFBLGNBQUssV0FBVSxxQkFBZjtBQUNFLDRDQUFRLElBQUcsVUFBWCxFQUFzQixPQUFNLEtBQTVCLEVBQWtDLFFBQU8sS0FBekM7QUFERjtBQWhCRixTQUZGO0FBdUJFO0FBQUE7QUFBQSxZQUFLLFdBQVUsS0FBZjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZjtBQUNFLHlDQUFLLFdBQVUscUJBQWY7QUFERjtBQURGLFNBdkJGO0FBOEJFO0FBQUE7QUFBQSxZQUFLLFdBQVUsS0FBZjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsZ0NBQWY7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFlLG1CQUFLLEtBQUwsQ0FBVztBQUExQjtBQURGO0FBREY7QUE5QkYsT0FERjtBQXVDRDs7OztFQTFPMkIsTUFBTSxTOztBQTJPbkM7O0FBRUQsT0FBTyxlQUFQLEdBQXlCLGVBQXpCIiwiZmlsZSI6IlBpdGNoVmlzdWFsaXplci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBpdGNoVmlzdWFsaXplciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG5cbiAgICB2YXIga2FyYW9rZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2thcmFva2VJbnB1dCcpO1xuICAgIGthcmFva2VJbnB1dC52YWx1ZSA9IDE7XG4gICAgdmFyIHZvY2Fsc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvY2Fsc0lucHV0Jyk7XG4gICAgdm9jYWxzSW5wdXQudmFsdWUgPSAwO1xuXG4gICAgLy8gSW5pdGlhbGl6ZXMgdGhlIHZhcmlhYmxlcyB0aGF0IHRoZSBwaXRjaCBkZXRlY3RvciBhbmQgdmlzdWFsaXplclxuICAgIC8vIHdpbGwgbmVlZCB0byB1c2UgKHNlZSBzY3JpcHRzL3BpdGNoRGV0ZWN0b3IuanMpXG4gXG4gICAgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuXG4gICAgZGV0ZWN0b3JFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXRlY3RvcicgKTtcbiAgICBjYW52YXNFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdvdXRwdXQnICk7XG4gICAgREVCVUdDQU5WQVMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3dhdmVmb3JtJyApO1xuXG4gICAgaWYgKERFQlVHQ0FOVkFTKSB7XG4gICAgICB3YXZlQ2FudmFzID0gREVCVUdDQU5WQVMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHdhdmVDYW52YXMuc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xuICAgICAgd2F2ZUNhbnZhcy5saW5lV2lkdGggPSAxO1xuICAgIH1cblxuICAgIHBpdGNoRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGl0Y2gnICk7XG4gICAgbm90ZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ25vdGUnICk7XG4gICAgZGV0dW5lRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0dW5lJyApO1xuICAgIGRldHVuZUFtb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0dW5lX2FtdCcgKTtcblxuICAgIC8vIERyYXcgdGhlIGdyYXBocyBmb3IgdGhlIGZpcnN0IHNvbmcgXG4gICAgcGl0Y2hHcmFwaCA9IGQzLnNlbGVjdCgnLnBpdGNoR3JhcGgnKS5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignd2lkdGgnLCBzdmdXaWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCBzdmdIZWlnaHQpXG4gICAgICAuYXR0cignY2xhc3MnLCAnc29uZ0dyYXBoJyk7XG5cbiAgICB0aGlzLmRyYXdTb25nR3JhcGgoIHRoaXMucHJvcHMuc2VsZWN0ZWREYXRhICk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVXBkYXRlKCkge1xuICAgIHRoaXMuc3RvcFVzZXJBdWRpbygpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcuc29uZ0dyYXBoJyk7XG5cbiAgICAvLyBSZWZyZXNoIGdyYXBoXG4gICAgZDMuc2VsZWN0QWxsKCdzdmcgPiAqJykucmVtb3ZlKCk7XG4gICAgdGhpcy5kcmF3U29uZ0dyYXBoKCB0aGlzLnByb3BzLnNlbGVjdGVkRGF0YSApO1xuICB9XG5cbiAgZHJhd1NvbmdHcmFwaCggZGF0YSApIHtcbiAgICB2YXIgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgLmRvbWFpbiggWzAsIGRhdGEubGVuZ3RoXSApXG4gICAgICAucmFuZ2UoIFswLCBzdmdXaWR0aF0gKTtcbiAgICB2YXIgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgLmRvbWFpbiggWzUwLCAxMjBdIClcbiAgICAgIC5yYW5nZSggW3N2Z0hlaWdodCwgMF0gKTtcblxuICAgIHZhciBub3RlcyA9IHBpdGNoR3JhcGguc2VsZWN0QWxsKCdyZWN0JylcbiAgICAgIC5kYXRhKCBkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgfSApO1xuXG4gICAgcGl0Y2hHcmFwaC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgJzEwMCUnKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsICcxMDAlJylcbiAgICAgIC5hdHRyKCdmaWxsJywgJ3doaXRlJylcbiAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjUpO1xuXG4gICAgLy8gRU5URVJcbiAgICBub3Rlcy5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4geFNjYWxlKGkpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geVNjYWxlKGQudmFsdWUpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCd3aWR0aCcsIChzdmdXaWR0aCAvIGRhdGEubGVuZ3RoKSAqIDMpXG4gICAgICAuYXR0cignaGVpZ2h0JywgNClcbiAgICAgIC5hdHRyKCdmaWxsJywgJyM0REI2QUMnKVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgIH0pO1xuXG4gICAgLy8gVVBEQVRFXG4gICAgbm90ZXNcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4geFNjYWxlKGkpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geVNjYWxlKGQudmFsdWUpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCd3aWR0aCcsIChzdmdXaWR0aCAvIGRhdGEubGVuZ3RoKSAqIDMpXG4gICAgICAuYXR0cignaGVpZ2h0JywgNClcbiAgICAgIC5hdHRyKCdmaWxsJywgJyM0REI2QUMnKVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgIH0pO1xuXG4gICAgLy8gRVhJVFxuICAgIG5vdGVzXG4gICAgICAuZXhpdCgpXG4gICAgICAucmVtb3ZlKCk7XG4gIH1cblxuICBzdG9wVXNlckF1ZGlvKCkge1xuICAgIGlmIChsb2NhbFN0cmVhbSkge1xuICAgICAgbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXS5zdG9wKCAwICk7XG4gICAgfVxuICAgIFxuICAgIGxvY2FsU3RyZWFtID0gbnVsbDtcblxuICAgIC8vIEVuZCBwaXRjaCBkZXRlY3Rpb24vdmlzdWFsaXphdGlvbiBwcm9jZXNzZXNcbiAgICBjbGVhckludGVydmFsKCB1cGRhdGVQaXRjaElEICk7XG4gICAgY2xlYXJJbnRlcnZhbCggZHJhd1VzZXJHcmFwaElEICk7XG5cbiAgICAvLyBSZWZyZXNoIHVzZXIncyBhdmdOb3RlQXJyYXlcbiAgICBhdmdOb3RlQXJyYXkgPSBbXTtcbiAgfVxuXG4gIHRvZ2dsZUxpdmVJbnB1dCgpIHtcblxuICAgIGlmIChsb2NhbFN0cmVhbSA9PT0gbnVsbCkge1xuICAgICAgZ2V0VXNlckF1ZGlvKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFVzZXJBdWRpbygpO1xuICAgIH1cblxuICAgIHZhciB1c2VyUGl0Y2hHcmFwaCA9IGQzLnNlbGVjdCgnLnNvbmdHcmFwaCcpO1xuXG4gICAgdmFyIGRyYXdVc2VyR3JhcGggPSBmdW5jdGlvbiggZGF0YSwgc29uZ0RhdGEgKSB7XG5cbiAgICAgIHZhciB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oIFswLCB0aGF0LnByb3BzLnNlbGVjdGVkRGF0YS5sZW5ndGhdIClcbiAgICAgICAgLnJhbmdlKCBbMCwgc3ZnV2lkdGhdICk7XG4gICAgICB2YXIgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKCBbNTAsIDEyMF0gKVxuICAgICAgICAucmFuZ2UoIFtzdmdIZWlnaHQsIDBdICk7XG5cbiAgICAgIHZhciBub3RlcyA9IHVzZXJQaXRjaEdyYXBoLnNlbGVjdEFsbCgnZWxsaXBzZScpXG4gICAgICAgIC5kYXRhKCBkYXRhLCBmdW5jdGlvbiggZCApIHtcbiAgICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIEVOVEVSXG4gICAgICBub3Rlcy5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2VsbGlwc2UnKVxuICAgICAgICAuYXR0cignY3gnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHhTY2FsZShkLmlkKSArIChzdmdXaWR0aCAvIHRoYXQucHJvcHMuc2VsZWN0ZWREYXRhLmxlbmd0aCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4geVNjYWxlKGQudmFsdWUpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cigncngnLCAoc3ZnV2lkdGggLyB0aGF0LnByb3BzLnNlbGVjdGVkRGF0YS5sZW5ndGgpICogMS41KVxuICAgICAgICAuYXR0cigncnknLCAyKVxuICAgICAgICAuYXR0cignZmlsbCcsICd5ZWxsb3cnKVxuICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBVUERBVEVcbiAgICAgIG5vdGVzXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmF0dHIoJ2N4JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiB4U2NhbGUoZC5pZCkgKyAoc3ZnV2lkdGggLyBzb25nRGF0YS5sZW5ndGgpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignY3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHlTY2FsZShkLnZhbHVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3J4JywgKHN2Z1dpZHRoIC8gdGhhdC5wcm9wcy5zZWxlY3RlZERhdGEubGVuZ3RoKSAqIDEuNSlcbiAgICAgICAgLmF0dHIoJ3J5JywgMilcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAncmVkJylcbiAgICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgICB9KTtcblxuICAgICAgLy8gRVhJVFxuICAgICAgbm90ZXNcbiAgICAgICAgLmV4aXQoKVxuICAgICAgICAucmVtb3ZlKCk7XG4gICAgfTtcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICB1cGRhdGVQaXRjaElEID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICB1cGRhdGVQaXRjaCgpO1xuICAgIH0sIDEwMDAgLyA2MCk7XG5cbiAgICBkcmF3VXNlckdyYXBoSUQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIGdldEF2Z05vdGUoIG5vdGVBcnJheSApO1xuICAgICAgZHJhd1VzZXJHcmFwaCggYXZnTm90ZUFycmF5LCB0aGF0LnByb3BzLnNlbGVjdGVkRGF0YSApO1xuICAgIH0sIDEwMDApO1xuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJwaXRjaGRldGVjdG9yXCI+XG4gICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzMTIgbDRcIj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkZXRlY3RvclwiIGNsYXNzTmFtZT1cInZhZ3VlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGl0Y2hcIj48c3BhbiBpZD1cInBpdGNoXCI+LS08L3NwYW4+SHo8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RlXCI+PHNwYW4gaWQ9XCJub3RlXCI+LS08L3NwYW4+PC9kaXY+ICAgXG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkZXR1bmVcIj48c3BhbiBpZD1cImRldHVuZV9hbXRcIj4tLTwvc3Bhbj48c3BhbiBpZD1cImZsYXRcIj5jZW50cyAmIzk4Mzc7PC9zcGFuPjxzcGFuIGlkPVwic2hhcnBcIj5jZW50cyAmIzk4Mzk7PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+ICAgICAgIFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wgczEyIGw0IGF1ZGlvUGxheWVyJz5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0bi1mbG9hdGluZyBidG4tbGFyZ2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IHRlYWxcIiBvbkNsaWNrPSB7KCkgPT4ge3RoaXMucHJvcHMub25QbGF5KCk7IHRoaXMudG9nZ2xlTGl2ZUlucHV0KCkgfX0+PGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5wbGF5X2Fycm93PC9pPjwvYT5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0bi1mbG9hdGluZyBidG4tbGFyZ2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IHRlYWxcIiBvbkNsaWNrPXsoKSA9PiB7dGhpcy5wcm9wcy5vblBhdXNlKCk7IHRoaXMuc3RvcFVzZXJBdWRpby5hcHBseSh0aGlzKX19PjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+cGF1c2U8L2k+PC9hPlxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuLWZsb2F0aW5nIGJ0bi1sYXJnZSB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgdGVhbFwiIG9uQ2xpY2s9eygpID0+IHt0aGlzLnByb3BzLm9uU3RvcCgpOyB0aGlzLnN0b3BVc2VyQXVkaW8uYXBwbHkodGhpcyl9fT48aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnN0b3A8L2k+PC9hPlxuICAgICAgICAgICAge3RoaXMucHJvcHMuYXVkaW9QbGF5ZXJ9XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCJrYXJhb2tlSW5wdXRcIiBtaW49XCIwXCIgbWF4PVwiMVwiIHN0ZXA9XCIwLjFcIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkthcmFva2VWb2x1bWVDaGFuZ2V9Lz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cInZvY2Fsc0lucHV0XCIgbWluPVwiMFwiIG1heD1cIjFcIiBzdGVwPVwiMC4xXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25Wb2NhbHNWb2x1bWVDaGFuZ2V9Lz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzMTIgbDQgb3ZlcmZsb3dcIj5cbiAgICAgICAgICAgIDxjYW52YXMgaWQ9XCJ3YXZlZm9ybVwiIHdpZHRoPVwiNTEyXCIgaGVpZ2h0PVwiMjkwXCI+PC9jYW52YXM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbDEyIHMxMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdyBwaXRjaEdyYXBoXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGw0IHM0IHNjb3JlYm9hcmQgb2Zmc2V0LWwzXCI+XG4gICAgICAgICAgICA8c3Bhbj5TY29yZSA6IHt0aGlzLnByb3BzLnNjb3JlfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbndpbmRvdy5QaXRjaFZpc3VhbGl6ZXIgPSBQaXRjaFZpc3VhbGl6ZXI7XG5cbiJdfQ==