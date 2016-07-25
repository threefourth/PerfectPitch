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

      console.log('Received: ', data);

      var xScale = d3.scaleLinear().domain([0, data.length])
      // .domain( [0, 10] )
      .range([0, svgWidth]);
      var yScale = d3.scaleLinear().domain([0, 150]).range([svgHeight, 0]);

      var notes = pitchGraph.selectAll('rect').data(data, function (d) {
        return d.id;
      });

      // ENTER
      notes.enter().append('rect').attr('x', function (d, i) {
        return xScale(i);
      }).attr('y', function (d) {
        return yScale(d.value);
      }).attr('width', svgWidth / data.length)
      // .attr('width', svgWidth / 10)
      .attr('height', 10).attr('fill', '#50C8FF').attr('id', function (d) {
        return d.id;
      });

      // UPDATE
      notes.transition().attr('x', function (d, i) {
        return xScale(i);
      }).attr('y', function (d) {
        return yScale(d.value);
      }).attr('width', svgWidth / data.length)
      // .attr('width', svgWidth / 10)
      .attr('height', 10).attr('fill', '#50C8FF').attr('id', function (d) {
        return d.id;
      });

      // EXIT
      notes.exit().remove();
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

      var userPitchGraph = d3.select('.songGraph');

      var drawUserGraph = function drawUserGraph(data) {
        console.log('User ID length: ', data.length);
        console.log('Last user note id: ', data[data.length - 1].id);

        var xScale = d3.scaleLinear().domain([0, that.props.selectedData.length])
        // .domain( [0, 10] )
        .range([0, svgWidth]);
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
        notes.transition()
        // .ease(d3.sinEase)
        .attr('cx', function (d) {
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
      // updateSongGraphID = setInterval(function() {

      //   var data = that.props.selectedData.slice(0 + avgNoteArray.length, 10 + avgNoteArray.length);

      //   that.drawSongGraph( data );
      // }, 1000);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQixVQUFJLGVBQWUsU0FBUyxjQUFULENBQXdCLGNBQXhCLENBQW5CO0FBQ0EsbUJBQWEsS0FBYixHQUFxQixDQUFyQjtBQUNBLFVBQUksY0FBYyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBbEI7QUFDQSxrQkFBWSxLQUFaLEdBQW9CLENBQXBCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFlLElBQUksWUFBSixFQUFmOztBQUVBLHFCQUFlLFNBQVMsY0FBVCxDQUF5QixVQUF6QixDQUFmO0FBQ0EsbUJBQWEsU0FBUyxjQUFULENBQXlCLFFBQXpCLENBQWI7QUFDQSxvQkFBYyxTQUFTLGNBQVQsQ0FBeUIsVUFBekIsQ0FBZDs7QUFFQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQsa0JBQVksU0FBUyxjQUFULENBQXlCLE9BQXpCLENBQVo7QUFDQSxpQkFBVyxTQUFTLGNBQVQsQ0FBeUIsTUFBekIsQ0FBWDtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0EscUJBQWUsU0FBUyxjQUFULENBQXlCLFlBQXpCLENBQWY7O0FBRUE7QUFDQSxtQkFBYSxHQUFHLE1BQUgsQ0FBVSxhQUFWLEVBQXlCLE1BQXpCLENBQWdDLEtBQWhDLEVBQ1YsSUFEVSxDQUNMLE9BREssRUFDSSxRQURKLEVBRVYsSUFGVSxDQUVMLFFBRkssRUFFSyxTQUZMLEVBR1YsSUFIVSxDQUdMLE9BSEssRUFHSSxXQUhKLENBQWI7O0FBS0EsV0FBSyxhQUFMLENBQW9CLEtBQUssS0FBTCxDQUFXLFlBQS9C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QUFqRCxFQUFxRCxNQUFLLEtBQTFELEVBQWdFLFVBQVUsS0FBSyxLQUFMLENBQVcsb0JBQXJGO0FBTkYsV0FSRjtBQWdCRTtBQUFBO0FBQUEsY0FBSyxXQUFVLHFCQUFmO0FBQ0UsNENBQVEsSUFBRyxVQUFYLEVBQXNCLE9BQU0sS0FBNUIsRUFBa0MsUUFBTyxLQUF6QztBQURGO0FBaEJGLFNBRkY7QUF1QkU7QUFBQTtBQUFBLFlBQUssV0FBVSxLQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxhQUFmO0FBQ0UseUNBQUssV0FBVSxxQkFBZjtBQURGO0FBREYsU0F2QkY7QUE4QkU7QUFBQTtBQUFBLFlBQUssV0FBVSxLQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxnQ0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQWUsbUJBQUssS0FBTCxDQUFXO0FBQTFCO0FBREY7QUFERjtBQTlCRixPQURGO0FBdUNEOzs7O0VBM1AyQixNQUFNLFM7O0FBNFBuQzs7QUFFRCxPQUFPLGVBQVAsR0FBeUIsZUFBekI7QUFDYyIsImZpbGUiOiJQaXRjaFZpc3VhbGl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQaXRjaFZpc3VhbGl6ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgdmFyIGthcmFva2VJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrYXJhb2tlSW5wdXQnKTtcbiAgICBrYXJhb2tlSW5wdXQudmFsdWUgPSAxO1xuICAgIHZhciB2b2NhbHNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2NhbHNJbnB1dCcpO1xuICAgIHZvY2Fsc0lucHV0LnZhbHVlID0gMDtcblxuICAgIC8vIEluaXRpYWxpemVzIHRoZSB2YXJpYWJsZXMgdGhhdCB0aGUgcGl0Y2ggZGV0ZWN0b3IgYW5kIHZpc3VhbGl6ZXJcbiAgICAvLyB3aWxsIG5lZWQgdG8gdXNlIChzZWUgc2NyaXB0cy9waXRjaERldGVjdG9yLmpzKVxuXG4gICAgLy8gY29ycmVzcG9uZHMgdG8gYSA1a0h6IHNpZ25hbFxuICAgIC8vIE1BWF9TSVpFID0gTWF0aC5tYXgoNCwgTWF0aC5mbG9vcihhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSAvIDUwMDApKTsgIFxuICAgIGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuICAgIGRldGVjdG9yRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0ZWN0b3InICk7XG4gICAgY2FudmFzRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnb3V0cHV0JyApO1xuICAgIERFQlVHQ0FOVkFTID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICd3YXZlZm9ybScgKTtcblxuICAgIGlmIChERUJVR0NBTlZBUykge1xuICAgICAgd2F2ZUNhbnZhcyA9IERFQlVHQ0FOVkFTLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB3YXZlQ2FudmFzLnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcbiAgICAgIHdhdmVDYW52YXMubGluZVdpZHRoID0gMTtcbiAgICB9XG5cbiAgICBwaXRjaEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BpdGNoJyApO1xuICAgIG5vdGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdub3RlJyApO1xuICAgIGRldHVuZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldHVuZScgKTtcbiAgICBkZXR1bmVBbW91bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldHVuZV9hbXQnICk7XG5cbiAgICAvLyBEcmF3IHRoZSBncmFwaHMgZm9yIHRoZSBmaXJzdCBzb25nIFxuICAgIHBpdGNoR3JhcGggPSBkMy5zZWxlY3QoJy5waXRjaEdyYXBoJykuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgc3ZnV2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0Jywgc3ZnSGVpZ2h0KVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3NvbmdHcmFwaCcpO1xuXG4gICAgdGhpcy5kcmF3U29uZ0dyYXBoKCB0aGlzLnByb3BzLnNlbGVjdGVkRGF0YSApO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVwZGF0ZSgpIHtcbiAgICBjb25zb2xlLmxvZygnVXBkYXRpbmcgUGl0Y2hWaXN1YWxpemVyJyk7XG4gICAgdGhpcy5zdG9wVXNlckF1ZGlvKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJy5zb25nR3JhcGgnKTtcblxuICAgIC8vIFJlZnJlc2ggZ3JhcGhcbiAgICBkMy5zZWxlY3RBbGwoJ3N2ZyA+IConKS5yZW1vdmUoKTtcbiAgICB0aGlzLmRyYXdTb25nR3JhcGgoIHRoaXMucHJvcHMuc2VsZWN0ZWREYXRhICk7XG4gIH1cblxuICBkcmF3U29uZ0dyYXBoKCBkYXRhICkge1xuXG4gICAgY29uc29sZS5sb2coJ1JlY2VpdmVkOiAnLCBkYXRhKTtcblxuICAgIHZhciB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAuZG9tYWluKCBbMCwgZGF0YS5sZW5ndGhdIClcbiAgICAgIC8vIC5kb21haW4oIFswLCAxMF0gKVxuICAgICAgLnJhbmdlKCBbMCwgc3ZnV2lkdGhdICk7XG4gICAgdmFyIHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgIC5kb21haW4oIFswLCAxNTBdIClcbiAgICAgIC5yYW5nZSggW3N2Z0hlaWdodCwgMF0gKTtcblxuICAgIHZhciBub3RlcyA9IHBpdGNoR3JhcGguc2VsZWN0QWxsKCdyZWN0JylcbiAgICAgIC5kYXRhKCBkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgfSApO1xuXG4gICAgLy8gRU5URVJcbiAgICBub3Rlcy5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4geFNjYWxlKGkpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geVNjYWxlKGQudmFsdWUpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHN2Z1dpZHRoIC8gZGF0YS5sZW5ndGgpXG4gICAgICAvLyAuYXR0cignd2lkdGgnLCBzdmdXaWR0aCAvIDEwKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIDEwKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnIzUwQzhGRicpXG4gICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgfSk7XG5cbiAgICAvLyBVUERBVEVcbiAgICBub3Rlc1xuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiB4U2NhbGUoaSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5U2NhbGUoZC52YWx1ZSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3dpZHRoJywgc3ZnV2lkdGggLyBkYXRhLmxlbmd0aClcbiAgICAgIC8vIC5hdHRyKCd3aWR0aCcsIHN2Z1dpZHRoIC8gMTApXG4gICAgICAuYXR0cignaGVpZ2h0JywgMTApXG4gICAgICAuYXR0cignZmlsbCcsICcjNTBDOEZGJylcbiAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICB9KTtcblxuICAgIC8vIEVYSVRcbiAgICBub3Rlc1xuICAgICAgLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpO1xuICB9XG5cbiAgc3RvcFVzZXJBdWRpbygpIHtcbiAgICBjb25zb2xlLmxvZygnU3RvcHBpbmcgdXNlciBpbnB1dCcpO1xuICAgIGNvbnNvbGUubG9nKGxvY2FsU3RyZWFtKTtcbiAgICBpZiAobG9jYWxTdHJlYW0pIHtcbiAgICAgIGxvY2FsU3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0uc3RvcCggMCApO1xuICAgIH1cbiAgICBcbiAgICBsb2NhbFN0cmVhbSA9IG51bGw7XG5cbiAgICAvLyBFbmQgcGl0Y2ggZGV0ZWN0aW9uL3Zpc3VhbGl6YXRpb24gcHJvY2Vzc2VzXG4gICAgY2xlYXJJbnRlcnZhbCggdXBkYXRlUGl0Y2hJRCApO1xuICAgIGNsZWFySW50ZXJ2YWwoIGRyYXdVc2VyR3JhcGhJRCApO1xuXG4gICAgLy8gUmVmcmVzaCB1c2VyJ3MgYXZnTm90ZUFycmF5XG4gICAgYXZnTm90ZUFycmF5ID0gW107XG4gIH1cblxuICB0b2dnbGVMaXZlSW5wdXQoKSB7XG4gICAgY29uc29sZS5sb2coJ1RvZ2dsaW5nIGF1ZGlvIGlucHV0Jyk7XG4gICAgY29uc29sZS5sb2cobG9jYWxTdHJlYW0pO1xuXG4gICAgaWYgKGxvY2FsU3RyZWFtID09PSBudWxsKSB7XG4gICAgICBnZXRVc2VyQXVkaW8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wVXNlckF1ZGlvKCk7XG4gICAgfVxuXG4gICAgXG4gICAgdmFyIHVzZXJQaXRjaEdyYXBoID0gZDMuc2VsZWN0KCcuc29uZ0dyYXBoJyk7XG5cbiAgICB2YXIgZHJhd1VzZXJHcmFwaCA9IGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgY29uc29sZS5sb2coJ1VzZXIgSUQgbGVuZ3RoOiAnLCBkYXRhLmxlbmd0aCk7XG4gICAgICBjb25zb2xlLmxvZygnTGFzdCB1c2VyIG5vdGUgaWQ6ICcsIGRhdGFbZGF0YS5sZW5ndGgtMV0uaWQpO1xuXG4gICAgICB2YXIgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKCBbMCwgdGhhdC5wcm9wcy5zZWxlY3RlZERhdGEubGVuZ3RoXSApXG4gICAgICAgIC8vIC5kb21haW4oIFswLCAxMF0gKVxuICAgICAgICAucmFuZ2UoIFswLCBzdmdXaWR0aF0gKTtcbiAgICAgIHZhciB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oIFswLCAxNTBdIClcbiAgICAgICAgLnJhbmdlKCBbc3ZnSGVpZ2h0LCAwXSApO1xuXG4gICAgICB2YXIgbm90ZXMgPSB1c2VyUGl0Y2hHcmFwaC5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gICAgICAgIC5kYXRhKGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIEVOVEVSXG4gICAgICBub3Rlcy5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4geFNjYWxlKGQuaWQpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignY3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHlTY2FsZShkLnZhbHVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3InLCAyKVxuICAgICAgICAuYXR0cignZmlsbCcsICd5ZWxsb3cnKVxuICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBVUERBVEVcbiAgICAgIG5vdGVzXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLy8gLmVhc2UoZDMuc2luRWFzZSlcbiAgICAgICAgLmF0dHIoJ2N4JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiB4U2NhbGUoZC5pZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdjeScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4geVNjYWxlKGQudmFsdWUpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cigncicsIDIpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJ3JlZCcpXG4gICAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIEVYSVRcbiAgICAgIG5vdGVzXG4gICAgICAgIC5leGl0KClcbiAgICAgICAgLnJlbW92ZSgpO1xuICAgIH07XG5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgLy8gdXBkYXRlU29uZ0dyYXBoSUQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblxuICAgIC8vICAgdmFyIGRhdGEgPSB0aGF0LnByb3BzLnNlbGVjdGVkRGF0YS5zbGljZSgwICsgYXZnTm90ZUFycmF5Lmxlbmd0aCwgMTAgKyBhdmdOb3RlQXJyYXkubGVuZ3RoKTtcblxuICAgIC8vICAgdGhhdC5kcmF3U29uZ0dyYXBoKCBkYXRhICk7XG4gICAgLy8gfSwgMTAwMCk7XG5cbiAgICB1cGRhdGVQaXRjaElEID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICB1cGRhdGVQaXRjaCgpO1xuICAgIH0sIDEwMDAgLyA2MCk7XG5cbiAgICBkcmF3VXNlckdyYXBoSUQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIGdldEF2Z05vdGUoIG5vdGVBcnJheSApO1xuICAgICAgLy8gY29uc29sZS5sb2cgKCBhdmdOb3RlQXJyYXkgKTtcbiAgICAgIGRyYXdVc2VyR3JhcGgoIGF2Z05vdGVBcnJheSApO1xuICAgIH0sIDEwMDApO1xuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJwaXRjaGRldGVjdG9yXCI+XG4gICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzMTIgbDRcIj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkZXRlY3RvclwiIGNsYXNzTmFtZT1cInZhZ3VlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGl0Y2hcIj48c3BhbiBpZD1cInBpdGNoXCI+LS08L3NwYW4+SHo8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RlXCI+PHNwYW4gaWQ9XCJub3RlXCI+LS08L3NwYW4+PC9kaXY+ICAgXG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJkZXR1bmVcIj48c3BhbiBpZD1cImRldHVuZV9hbXRcIj4tLTwvc3Bhbj48c3BhbiBpZD1cImZsYXRcIj5jZW50cyAmIzk4Mzc7PC9zcGFuPjxzcGFuIGlkPVwic2hhcnBcIj5jZW50cyAmIzk4Mzk7PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+ICAgICAgIFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wgczEyIGw0IGF1ZGlvUGxheWVyJz5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0bi1mbG9hdGluZyBidG4tbGFyZ2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IHRlYWxcIiBvbkNsaWNrPSB7KCkgPT4ge3RoaXMucHJvcHMub25QbGF5KCk7IHRoaXMudG9nZ2xlTGl2ZUlucHV0KCkgfX0+PGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5wbGF5X2Fycm93PC9pPjwvYT5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0bi1mbG9hdGluZyBidG4tbGFyZ2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IHRlYWxcIiBvbkNsaWNrPXsoKSA9PiB7dGhpcy5wcm9wcy5vblBhdXNlKCk7IHRoaXMuc3RvcFVzZXJBdWRpby5hcHBseSh0aGlzKX19PjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+cGF1c2U8L2k+PC9hPlxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuLWZsb2F0aW5nIGJ0bi1sYXJnZSB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgdGVhbFwiIG9uQ2xpY2s9eygpID0+IHt0aGlzLnByb3BzLm9uU3RvcCgpOyB0aGlzLnN0b3BVc2VyQXVkaW8uYXBwbHkodGhpcyl9fT48aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnN0b3A8L2k+PC9hPlxuICAgICAgICAgICAge3RoaXMucHJvcHMuYXVkaW9QbGF5ZXJ9XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCJrYXJhb2tlSW5wdXRcIiBtaW49XCIwXCIgbWF4PVwiMVwiIHN0ZXA9XCIwLjFcIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkthcmFva2VWb2x1bWVDaGFuZ2V9Lz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cInZvY2Fsc0lucHV0XCIgbWluPVwiMFwiIG1heD1cIjFcIiBzdGVwPVwiMC4xXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25Wb2NhbHNWb2x1bWVDaGFuZ2V9Lz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzMTIgbDQgb3ZlcmZsb3dcIj5cbiAgICAgICAgICAgIDxjYW52YXMgaWQ9XCJ3YXZlZm9ybVwiIHdpZHRoPVwiNTEyXCIgaGVpZ2h0PVwiMjkwXCI+PC9jYW52YXM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbDEyIHMxMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdyBwaXRjaEdyYXBoXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGw0IHM0IHNjb3JlYm9hcmQgb2Zmc2V0LWwzXCI+XG4gICAgICAgICAgICA8c3Bhbj5TY29yZSA6IHt0aGlzLnByb3BzLnNjb3JlfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbndpbmRvdy5QaXRjaFZpc3VhbGl6ZXIgPSBQaXRjaFZpc3VhbGl6ZXI7XG4gICAgICAgICAgICAgIC8vIDxjYW52YXMgaWQ9XCJvdXRwdXRcIiA+PC9jYW52YXM+IGJlbG93ICNub3RlIl19