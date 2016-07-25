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

      // UPDATE
      notes.transition().attr('x', function (d, i) {
        return xScale(i);
      }).attr('y', function (d) {
        return yScale(d.value);
      }).attr('width', svgWidth / data.length).attr('height', 10).attr('fill', '#50C8FF').attr('id', function (d) {
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
        }).attr('r', 2).attr('fill', 'yellow').attr('id', function (d) {
          return d.id;
        });

        // UPDATE
        notes.transition().attr('cx', function (d) {
          return xScale(d.id);
        }).attr('cy', function (d) {
          return yScale(d.value);
        }).attr('r', 2).attr('fill', 'red').attr('id', function (d) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQixVQUFJLGVBQWUsU0FBUyxjQUFULENBQXdCLGNBQXhCLENBQW5CO0FBQ0EsbUJBQWEsS0FBYixHQUFxQixDQUFyQjtBQUNBLFVBQUksY0FBYyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBbEI7QUFDQSxrQkFBWSxLQUFaLEdBQW9CLENBQXBCOztBQUVBO0FBQ0E7O0FBRUEscUJBQWUsSUFBSSxZQUFKLEVBQWY7O0FBRUEscUJBQWUsU0FBUyxjQUFULENBQXlCLFVBQXpCLENBQWY7QUFDQSxtQkFBYSxTQUFTLGNBQVQsQ0FBeUIsUUFBekIsQ0FBYjtBQUNBLG9CQUFjLFNBQVMsY0FBVCxDQUF5QixVQUF6QixDQUFkOztBQUVBLFVBQUksV0FBSixFQUFpQjtBQUNmLHFCQUFhLFlBQVksVUFBWixDQUF1QixJQUF2QixDQUFiO0FBQ0EsbUJBQVcsV0FBWCxHQUF5QixPQUF6QjtBQUNBLG1CQUFXLFNBQVgsR0FBdUIsQ0FBdkI7QUFDRDs7QUFFRCxrQkFBWSxTQUFTLGNBQVQsQ0FBeUIsT0FBekIsQ0FBWjtBQUNBLGlCQUFXLFNBQVMsY0FBVCxDQUF5QixNQUF6QixDQUFYO0FBQ0EsbUJBQWEsU0FBUyxjQUFULENBQXlCLFFBQXpCLENBQWI7QUFDQSxxQkFBZSxTQUFTLGNBQVQsQ0FBeUIsWUFBekIsQ0FBZjs7QUFFQTtBQUNBLG1CQUFhLEdBQUcsTUFBSCxDQUFVLGFBQVYsRUFBeUIsTUFBekIsQ0FBZ0MsS0FBaEMsRUFDVixJQURVLENBQ0wsT0FESyxFQUNJLFFBREosRUFFVixJQUZVLENBRUwsUUFGSyxFQUVLLFNBRkwsRUFHVixJQUhVLENBR0wsT0FISyxFQUdJLFdBSEosQ0FBYjs7QUFLQSxXQUFLLGFBQUwsQ0FBb0IsS0FBSyxLQUFMLENBQVcsWUFBL0I7QUFDRDs7OzBD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QUExQjtBQURGO0FBREY7QUE5QkYsT0FERjtBQXVDRDs7OztFQWxPMkIsTUFBTSxTOztBQW1PbkM7O0FBRUQsT0FBTyxlQUFQLEdBQXlCLGVBQXpCIiwiZmlsZSI6IlBpdGNoVmlzdWFsaXplci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBpdGNoVmlzdWFsaXplciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG5cbiAgICB2YXIga2FyYW9rZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2thcmFva2VJbnB1dCcpO1xuICAgIGthcmFva2VJbnB1dC52YWx1ZSA9IDE7XG4gICAgdmFyIHZvY2Fsc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvY2Fsc0lucHV0Jyk7XG4gICAgdm9jYWxzSW5wdXQudmFsdWUgPSAwO1xuXG4gICAgLy8gSW5pdGlhbGl6ZXMgdGhlIHZhcmlhYmxlcyB0aGF0IHRoZSBwaXRjaCBkZXRlY3RvciBhbmQgdmlzdWFsaXplclxuICAgIC8vIHdpbGwgbmVlZCB0byB1c2UgKHNlZSBzY3JpcHRzL3BpdGNoRGV0ZWN0b3IuanMpXG4gXG4gICAgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuXG4gICAgZGV0ZWN0b3JFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXRlY3RvcicgKTtcbiAgICBjYW52YXNFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdvdXRwdXQnICk7XG4gICAgREVCVUdDQU5WQVMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3dhdmVmb3JtJyApO1xuXG4gICAgaWYgKERFQlVHQ0FOVkFTKSB7XG4gICAgICB3YXZlQ2FudmFzID0gREVCVUdDQU5WQVMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHdhdmVDYW52YXMuc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xuICAgICAgd2F2ZUNhbnZhcy5saW5lV2lkdGggPSAxO1xuICAgIH1cblxuICAgIHBpdGNoRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGl0Y2gnICk7XG4gICAgbm90ZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ25vdGUnICk7XG4gICAgZGV0dW5lRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0dW5lJyApO1xuICAgIGRldHVuZUFtb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0dW5lX2FtdCcgKTtcblxuICAgIC8vIERyYXcgdGhlIGdyYXBocyBmb3IgdGhlIGZpcnN0IHNvbmcgXG4gICAgcGl0Y2hHcmFwaCA9IGQzLnNlbGVjdCgnLnBpdGNoR3JhcGgnKS5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignd2lkdGgnLCBzdmdXaWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCBzdmdIZWlnaHQpXG4gICAgICAuYXR0cignY2xhc3MnLCAnc29uZ0dyYXBoJyk7XG5cbiAgICB0aGlzLmRyYXdTb25nR3JhcGgoIHRoaXMucHJvcHMuc2VsZWN0ZWREYXRhICk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVXBkYXRlKCkge1xuICAgIHRoaXMuc3RvcFVzZXJBdWRpbygpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcuc29uZ0dyYXBoJyk7XG5cbiAgICAvLyBSZWZyZXNoIGdyYXBoXG4gICAgZDMuc2VsZWN0QWxsKCdzdmcgPiAqJykucmVtb3ZlKCk7XG4gICAgdGhpcy5kcmF3U29uZ0dyYXBoKCB0aGlzLnByb3BzLnNlbGVjdGVkRGF0YSApO1xuICB9XG5cbiAgZHJhd1NvbmdHcmFwaCggZGF0YSApIHtcbiAgICB2YXIgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgLmRvbWFpbiggWzAsIGRhdGEubGVuZ3RoXSApXG4gICAgICAucmFuZ2UoIFswLCBzdmdXaWR0aF0gKTtcbiAgICB2YXIgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgLmRvbWFpbiggWzAsIDE1MF0gKVxuICAgICAgLnJhbmdlKCBbc3ZnSGVpZ2h0LCAwXSApO1xuXG4gICAgdmFyIG5vdGVzID0gcGl0Y2hHcmFwaC5zZWxlY3RBbGwoJ3JlY3QnKVxuICAgICAgLmRhdGEoIGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICB9ICk7XG5cbiAgICAvLyBFTlRFUlxuICAgIG5vdGVzLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiB4U2NhbGUoaSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5U2NhbGUoZC52YWx1ZSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3dpZHRoJywgc3ZnV2lkdGggLyBkYXRhLmxlbmd0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCAxMClcbiAgICAgIC5hdHRyKCdmaWxsJywgJyM1MEM4RkYnKVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgIH0pO1xuXG4gICAgLy8gVVBEQVRFXG4gICAgbm90ZXNcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4geFNjYWxlKGkpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geVNjYWxlKGQudmFsdWUpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHN2Z1dpZHRoIC8gZGF0YS5sZW5ndGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgMTApXG4gICAgICAuYXR0cignZmlsbCcsICcjNTBDOEZGJylcbiAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICB9KTtcblxuICAgIC8vIEVYSVRcbiAgICBub3Rlc1xuICAgICAgLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpO1xuICB9XG5cbiAgc3RvcFVzZXJBdWRpbygpIHtcbiAgICBpZiAobG9jYWxTdHJlYW0pIHtcbiAgICAgIGxvY2FsU3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0uc3RvcCggMCApO1xuICAgIH1cbiAgICBcbiAgICBsb2NhbFN0cmVhbSA9IG51bGw7XG5cbiAgICAvLyBFbmQgcGl0Y2ggZGV0ZWN0aW9uL3Zpc3VhbGl6YXRpb24gcHJvY2Vzc2VzXG4gICAgY2xlYXJJbnRlcnZhbCggdXBkYXRlUGl0Y2hJRCApO1xuICAgIGNsZWFySW50ZXJ2YWwoIGRyYXdVc2VyR3JhcGhJRCApO1xuXG4gICAgLy8gUmVmcmVzaCB1c2VyJ3MgYXZnTm90ZUFycmF5XG4gICAgYXZnTm90ZUFycmF5ID0gW107XG4gIH1cblxuICB0b2dnbGVMaXZlSW5wdXQoKSB7XG5cbiAgICBpZiAobG9jYWxTdHJlYW0gPT09IG51bGwpIHtcbiAgICAgIGdldFVzZXJBdWRpbygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BVc2VyQXVkaW8oKTtcbiAgICB9XG5cbiAgICB2YXIgdXNlclBpdGNoR3JhcGggPSBkMy5zZWxlY3QoJy5zb25nR3JhcGgnKTtcblxuICAgIHZhciBkcmF3VXNlckdyYXBoID0gZnVuY3Rpb24oIGRhdGEgKSB7XG5cbiAgICAgIHZhciB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oIFswLCB0aGF0LnByb3BzLnNlbGVjdGVkRGF0YS5sZW5ndGhdIClcbiAgICAgICAgLnJhbmdlKCBbMCwgc3ZnV2lkdGhdICk7XG4gICAgICB2YXIgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKCBbMCwgMTUwXSApXG4gICAgICAgIC5yYW5nZSggW3N2Z0hlaWdodCwgMF0gKTtcblxuICAgICAgdmFyIG5vdGVzID0gdXNlclBpdGNoR3JhcGguc2VsZWN0QWxsKCdjaXJjbGUnKVxuICAgICAgICAuZGF0YShkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBFTlRFUlxuICAgICAgbm90ZXMuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAuYXR0cignY3gnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHhTY2FsZShkLmlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2N5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiB5U2NhbGUoZC52YWx1ZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdyJywgMilcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAneWVsbG93JylcbiAgICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgICB9KTtcblxuICAgICAgLy8gVVBEQVRFXG4gICAgICBub3Rlc1xuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4geFNjYWxlKGQuaWQpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignY3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHlTY2FsZShkLnZhbHVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3InLCAyKVxuICAgICAgICAuYXR0cignZmlsbCcsICdyZWQnKVxuICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBFWElUXG4gICAgICBub3Rlc1xuICAgICAgICAuZXhpdCgpXG4gICAgICAgIC5yZW1vdmUoKTtcbiAgICB9O1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFxuICAgIHVwZGF0ZVBpdGNoSUQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIHVwZGF0ZVBpdGNoKCk7XG4gICAgfSwgMTAwMCAvIDYwKTtcblxuICAgIGRyYXdVc2VyR3JhcGhJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgZ2V0QXZnTm90ZSggbm90ZUFycmF5ICk7XG4gICAgICBkcmF3VXNlckdyYXBoKCBhdmdOb3RlQXJyYXkgKTtcbiAgICB9LCAxMDAwKTtcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwicGl0Y2hkZXRlY3RvclwiPlxuICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczEyIGw0XCI+XG4gICAgICAgICAgICA8ZGl2IGlkPVwiZGV0ZWN0b3JcIiBjbGFzc05hbWU9XCJ2YWd1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpdGNoXCI+PHNwYW4gaWQ9XCJwaXRjaFwiPi0tPC9zcGFuPkh6PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90ZVwiPjxzcGFuIGlkPVwibm90ZVwiPi0tPC9zcGFuPjwvZGl2PiAgIFxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGV0dW5lXCI+PHNwYW4gaWQ9XCJkZXR1bmVfYW10XCI+LS08L3NwYW4+PHNwYW4gaWQ9XCJmbGF0XCI+Y2VudHMgJiM5ODM3Ozwvc3Bhbj48c3BhbiBpZD1cInNoYXJwXCI+Y2VudHMgJiM5ODM5Ozwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiAgICAgICBcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sIHMxMiBsNCBhdWRpb1BsYXllcic+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tZmxvYXRpbmcgYnRuLWxhcmdlIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCB0ZWFsXCIgb25DbGljaz0geygpID0+IHt0aGlzLnByb3BzLm9uUGxheSgpOyB0aGlzLnRvZ2dsZUxpdmVJbnB1dCgpIH19PjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+cGxheV9hcnJvdzwvaT48L2E+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tZmxvYXRpbmcgYnRuLWxhcmdlIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCB0ZWFsXCIgb25DbGljaz17KCkgPT4ge3RoaXMucHJvcHMub25QYXVzZSgpOyB0aGlzLnN0b3BVc2VyQXVkaW8uYXBwbHkodGhpcyl9fT48aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnBhdXNlPC9pPjwvYT5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0bi1mbG9hdGluZyBidG4tbGFyZ2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IHRlYWxcIiBvbkNsaWNrPXsoKSA9PiB7dGhpcy5wcm9wcy5vblN0b3AoKTsgdGhpcy5zdG9wVXNlckF1ZGlvLmFwcGx5KHRoaXMpfX0+PGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5zdG9wPC9pPjwvYT5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmF1ZGlvUGxheWVyfVxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIGlkPVwia2FyYW9rZUlucHV0XCIgbWluPVwiMFwiIG1heD1cIjFcIiBzdGVwPVwiMC4xXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25LYXJhb2tlVm9sdW1lQ2hhbmdlfS8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCJ2b2NhbHNJbnB1dFwiIG1pbj1cIjBcIiBtYXg9XCIxXCIgc3RlcD1cIjAuMVwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uVm9jYWxzVm9sdW1lQ2hhbmdlfS8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczEyIGw0IG92ZXJmbG93XCI+XG4gICAgICAgICAgICA8Y2FudmFzIGlkPVwid2F2ZWZvcm1cIiB3aWR0aD1cIjUxMlwiIGhlaWdodD1cIjI5MFwiPjwvY2FudmFzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGwxMiBzMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cgcGl0Y2hHcmFwaFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsNCBzNCBzY29yZWJvYXJkIG9mZnNldC1sM1wiPlxuICAgICAgICAgICAgPHNwYW4+U2NvcmUgOiB7dGhpcy5wcm9wcy5zY29yZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG53aW5kb3cuUGl0Y2hWaXN1YWxpemVyID0gUGl0Y2hWaXN1YWxpemVyO1xuXG4iXX0=