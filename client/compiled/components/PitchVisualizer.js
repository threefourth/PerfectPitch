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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQixVQUFJLGVBQWUsU0FBUyxjQUFULENBQXdCLGNBQXhCLENBQW5CO0FBQ0EsbUJBQWEsS0FBYixHQUFxQixDQUFyQjtBQUNBLFVBQUksY0FBYyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBbEI7QUFDQSxrQkFBWSxLQUFaLEdBQW9CLENBQXBCOztBQUVBO0FBQ0E7O0FBRUEscUJBQWUsSUFBSSxZQUFKLEVBQWY7O0FBRUEscUJBQWUsU0FBUyxjQUFULENBQXlCLFVBQXpCLENBQWY7QUFDQSxtQkFBYSxTQUFTLGNBQVQsQ0FBeUIsUUFBekIsQ0FBYjtBQUNBLG9CQUFjLFNBQVMsY0FBVCxDQUF5QixVQUF6QixDQUFkOztBQUVBLFVBQUksV0FBSixFQUFpQjtBQUNmLHFCQUFhLFlBQVksVUFBWixDQUF1QixJQUF2QixDQUFiO0FBQ0EsbUJBQVcsV0FBWCxHQUF5QixPQUF6QjtBQUNBLG1CQUFXLFNBQVgsR0FBdUIsQ0FBdkI7QUFDRDs7QUFFRCxrQkFBWSxTQUFTLGNBQVQsQ0FBeUIsT0FBekIsQ0FBWjtBQUNBLGlCQUFXLFNBQVMsY0FBVCxDQUF5QixNQUF6QixDQUFYO0FBQ0EsbUJBQWEsU0FBUyxjQUFULENBQXlCLFFBQXpCLENBQWI7QUFDQSxxQkFBZSxTQUFTLGNBQVQsQ0FBeUIsWUFBekIsQ0FBZjs7QUFFQTtBQUNBLG1CQUFhLEdBQUcsTUFBSCxDQUFVLGFBQVYsRUFBeUIsTUFBekIsQ0FBZ0MsS0FBaEMsRUFDVixJQURVLENBQ0wsT0FESyxFQUNJLFFBREosRUFFVixJQUZVLENBRUwsUUFGSyxFQUVLLFNBRkwsRUFHVixJQUhVLENBR0wsT0FISyxFQUdJLFdBSEosQ0FBYjs7QUFLQSxXQUFLLGFBQUwsQ0FBb0IsS0FBSyxLQUFMLENBQVcsWUFBL0I7QUFDRDs7OzBD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ckY7QUFORixXQVJGO0FBZ0JFO0FBQUE7QUFBQSxjQUFLLFdBQVUscUJBQWY7QUFDRSw0Q0FBUSxJQUFHLFVBQVgsRUFBc0IsT0FBTSxLQUE1QixFQUFrQyxRQUFPLEtBQXpDO0FBREY7QUFoQkYsU0FGRjtBQXVCRTtBQUFBO0FBQUEsWUFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGFBQWY7QUFDRSx5Q0FBSyxXQUFVLHFCQUFmO0FBREY7QUFERixTQXZCRjtBQThCRTtBQUFBO0FBQUEsWUFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGdDQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBZSxtQkFBSyxLQUFMLENBQVc7QUFBMUI7QUFERjtBQURGO0FBOUJGLE9BREY7QUF1Q0Q7Ozs7RUFwUDJCLE1BQU0sUzs7QUFxUG5DOztBQUVELE9BQU8sZUFBUCxHQUF5QixlQUF6QiIsImZpbGUiOiJQaXRjaFZpc3VhbGl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQaXRjaFZpc3VhbGl6ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgdmFyIGthcmFva2VJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrYXJhb2tlSW5wdXQnKTtcbiAgICBrYXJhb2tlSW5wdXQudmFsdWUgPSAxO1xuICAgIHZhciB2b2NhbHNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2NhbHNJbnB1dCcpO1xuICAgIHZvY2Fsc0lucHV0LnZhbHVlID0gMDtcblxuICAgIC8vIEluaXRpYWxpemVzIHRoZSB2YXJpYWJsZXMgdGhhdCB0aGUgcGl0Y2ggZGV0ZWN0b3IgYW5kIHZpc3VhbGl6ZXJcbiAgICAvLyB3aWxsIG5lZWQgdG8gdXNlIChzZWUgc2NyaXB0cy9waXRjaERldGVjdG9yLmpzKVxuIFxuICAgIGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuICAgIGRldGVjdG9yRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0ZWN0b3InICk7XG4gICAgY2FudmFzRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnb3V0cHV0JyApO1xuICAgIERFQlVHQ0FOVkFTID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICd3YXZlZm9ybScgKTtcblxuICAgIGlmIChERUJVR0NBTlZBUykge1xuICAgICAgd2F2ZUNhbnZhcyA9IERFQlVHQ0FOVkFTLmdldENvbnRleHQoJzJkJyk7XG4gICAgICB3YXZlQ2FudmFzLnN0cm9rZVN0eWxlID0gJ2JsYWNrJztcbiAgICAgIHdhdmVDYW52YXMubGluZVdpZHRoID0gMTtcbiAgICB9XG5cbiAgICBwaXRjaEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BpdGNoJyApO1xuICAgIG5vdGVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdub3RlJyApO1xuICAgIGRldHVuZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldHVuZScgKTtcbiAgICBkZXR1bmVBbW91bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RldHVuZV9hbXQnICk7XG5cbiAgICAvLyBEcmF3IHRoZSBncmFwaHMgZm9yIHRoZSBmaXJzdCBzb25nIFxuICAgIHBpdGNoR3JhcGggPSBkMy5zZWxlY3QoJy5waXRjaEdyYXBoJykuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgc3ZnV2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0Jywgc3ZnSGVpZ2h0KVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3NvbmdHcmFwaCcpO1xuXG4gICAgdGhpcy5kcmF3U29uZ0dyYXBoKCB0aGlzLnByb3BzLnNlbGVjdGVkRGF0YSApO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVwZGF0ZSgpIHtcbiAgICBjb25zb2xlLmxvZygnVXBkYXRpbmcgUGl0Y2hWaXN1YWxpemVyJyk7XG4gICAgdGhpcy5zdG9wVXNlckF1ZGlvKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJy5zb25nR3JhcGgnKTtcblxuICAgIC8vIFJlZnJlc2ggZ3JhcGhcbiAgICBkMy5zZWxlY3RBbGwoJ3N2ZyA+IConKS5yZW1vdmUoKTtcbiAgICB0aGlzLmRyYXdTb25nR3JhcGgoIHRoaXMucHJvcHMuc2VsZWN0ZWREYXRhICk7XG4gIH1cblxuICBkcmF3U29uZ0dyYXBoKCBkYXRhICkge1xuXG4gICAgY29uc29sZS5sb2coJ1JlY2VpdmVkOiAnLCBkYXRhKTtcblxuICAgIHZhciB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAuZG9tYWluKCBbMCwgZGF0YS5sZW5ndGhdIClcbiAgICAgIC5yYW5nZSggWzAsIHN2Z1dpZHRoXSApO1xuICAgIHZhciB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAuZG9tYWluKCBbMCwgMTUwXSApXG4gICAgICAucmFuZ2UoIFtzdmdIZWlnaHQsIDBdICk7XG5cbiAgICB2YXIgbm90ZXMgPSBwaXRjaEdyYXBoLnNlbGVjdEFsbCgncmVjdCcpXG4gICAgICAuZGF0YSggZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgIH0gKTtcblxuICAgIC8vIEVOVEVSXG4gICAgbm90ZXMuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIHhTY2FsZShpKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHlTY2FsZShkLnZhbHVlKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cignd2lkdGgnLCBzdmdXaWR0aCAvIGRhdGEubGVuZ3RoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIDEwKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnIzUwQzhGRicpXG4gICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgfSk7XG5cbiAgICAvLyBVUERBVEVcbiAgICBub3Rlc1xuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiB4U2NhbGUoaSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5U2NhbGUoZC52YWx1ZSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3dpZHRoJywgc3ZnV2lkdGggLyBkYXRhLmxlbmd0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCAxMClcbiAgICAgIC5hdHRyKCdmaWxsJywgJyM1MEM4RkYnKVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgIH0pO1xuXG4gICAgLy8gRVhJVFxuICAgIG5vdGVzXG4gICAgICAuZXhpdCgpXG4gICAgICAucmVtb3ZlKCk7XG4gIH1cblxuICBzdG9wVXNlckF1ZGlvKCkge1xuICAgIGNvbnNvbGUubG9nKCdTdG9wcGluZyB1c2VyIGlucHV0Jyk7XG4gICAgY29uc29sZS5sb2cobG9jYWxTdHJlYW0pO1xuICAgIGlmIChsb2NhbFN0cmVhbSkge1xuICAgICAgbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXS5zdG9wKCAwICk7XG4gICAgfVxuICAgIFxuICAgIGxvY2FsU3RyZWFtID0gbnVsbDtcblxuICAgIC8vIEVuZCBwaXRjaCBkZXRlY3Rpb24vdmlzdWFsaXphdGlvbiBwcm9jZXNzZXNcbiAgICBjbGVhckludGVydmFsKCB1cGRhdGVQaXRjaElEICk7XG4gICAgY2xlYXJJbnRlcnZhbCggZHJhd1VzZXJHcmFwaElEICk7XG5cbiAgICAvLyBSZWZyZXNoIHVzZXIncyBhdmdOb3RlQXJyYXlcbiAgICBhdmdOb3RlQXJyYXkgPSBbXTtcbiAgfVxuXG4gIHRvZ2dsZUxpdmVJbnB1dCgpIHtcbiAgICBjb25zb2xlLmxvZygnVG9nZ2xpbmcgYXVkaW8gaW5wdXQnKTtcbiAgICBjb25zb2xlLmxvZyhsb2NhbFN0cmVhbSk7XG5cbiAgICBpZiAobG9jYWxTdHJlYW0gPT09IG51bGwpIHtcbiAgICAgIGdldFVzZXJBdWRpbygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BVc2VyQXVkaW8oKTtcbiAgICB9XG5cbiAgICB2YXIgdXNlclBpdGNoR3JhcGggPSBkMy5zZWxlY3QoJy5zb25nR3JhcGgnKTtcblxuICAgIHZhciBkcmF3VXNlckdyYXBoID0gZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICBjb25zb2xlLmxvZygnVXNlciBJRCBsZW5ndGg6ICcsIGRhdGEubGVuZ3RoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdMYXN0IHVzZXIgbm90ZSBpZDogJywgZGF0YVtkYXRhLmxlbmd0aC0xXS5pZCk7XG5cbiAgICAgIHZhciB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oIFswLCB0aGF0LnByb3BzLnNlbGVjdGVkRGF0YS5sZW5ndGhdIClcbiAgICAgICAgLnJhbmdlKCBbMCwgc3ZnV2lkdGhdICk7XG4gICAgICB2YXIgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKCBbMCwgMTUwXSApXG4gICAgICAgIC5yYW5nZSggW3N2Z0hlaWdodCwgMF0gKTtcblxuICAgICAgdmFyIG5vdGVzID0gdXNlclBpdGNoR3JhcGguc2VsZWN0QWxsKCdjaXJjbGUnKVxuICAgICAgICAuZGF0YShkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBFTlRFUlxuICAgICAgbm90ZXMuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAuYXR0cignY3gnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHhTY2FsZShkLmlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2N5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiB5U2NhbGUoZC52YWx1ZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdyJywgMilcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAneWVsbG93JylcbiAgICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgICB9KTtcblxuICAgICAgLy8gVVBEQVRFXG4gICAgICBub3Rlc1xuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC8vIC5lYXNlKGQzLnNpbkVhc2UpXG4gICAgICAgIC5hdHRyKCdjeCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4geFNjYWxlKGQuaWQpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignY3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHlTY2FsZShkLnZhbHVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3InLCAyKVxuICAgICAgICAuYXR0cignZmlsbCcsICdyZWQnKVxuICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBFWElUXG4gICAgICBub3Rlc1xuICAgICAgICAuZXhpdCgpXG4gICAgICAgIC5yZW1vdmUoKTtcbiAgICB9O1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIC8vIHVwZGF0ZVNvbmdHcmFwaElEID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cbiAgICAvLyAgIHZhciBkYXRhID0gdGhhdC5wcm9wcy5zZWxlY3RlZERhdGEuc2xpY2UoMCArIGF2Z05vdGVBcnJheS5sZW5ndGgsIDEwICsgYXZnTm90ZUFycmF5Lmxlbmd0aCk7XG5cbiAgICAvLyAgIHRoYXQuZHJhd1NvbmdHcmFwaCggZGF0YSApO1xuICAgIC8vIH0sIDEwMDApO1xuXG4gICAgdXBkYXRlUGl0Y2hJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgdXBkYXRlUGl0Y2goKTtcbiAgICB9LCAxMDAwIC8gNjApO1xuXG4gICAgZHJhd1VzZXJHcmFwaElEID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBnZXRBdmdOb3RlKCBub3RlQXJyYXkgKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nICggYXZnTm90ZUFycmF5ICk7XG4gICAgICBkcmF3VXNlckdyYXBoKCBhdmdOb3RlQXJyYXkgKTtcbiAgICB9LCAxMDAwKTtcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwicGl0Y2hkZXRlY3RvclwiPlxuICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczEyIGw0XCI+XG4gICAgICAgICAgICA8ZGl2IGlkPVwiZGV0ZWN0b3JcIiBjbGFzc05hbWU9XCJ2YWd1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpdGNoXCI+PHNwYW4gaWQ9XCJwaXRjaFwiPi0tPC9zcGFuPkh6PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90ZVwiPjxzcGFuIGlkPVwibm90ZVwiPi0tPC9zcGFuPjwvZGl2PiAgIFxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGV0dW5lXCI+PHNwYW4gaWQ9XCJkZXR1bmVfYW10XCI+LS08L3NwYW4+PHNwYW4gaWQ9XCJmbGF0XCI+Y2VudHMgJiM5ODM3Ozwvc3Bhbj48c3BhbiBpZD1cInNoYXJwXCI+Y2VudHMgJiM5ODM5Ozwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiAgICAgICBcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sIHMxMiBsNCBhdWRpb1BsYXllcic+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tZmxvYXRpbmcgYnRuLWxhcmdlIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCB0ZWFsXCIgb25DbGljaz0geygpID0+IHt0aGlzLnByb3BzLm9uUGxheSgpOyB0aGlzLnRvZ2dsZUxpdmVJbnB1dCgpIH19PjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+cGxheV9hcnJvdzwvaT48L2E+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tZmxvYXRpbmcgYnRuLWxhcmdlIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCB0ZWFsXCIgb25DbGljaz17KCkgPT4ge3RoaXMucHJvcHMub25QYXVzZSgpOyB0aGlzLnN0b3BVc2VyQXVkaW8uYXBwbHkodGhpcyl9fT48aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnBhdXNlPC9pPjwvYT5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImJ0bi1mbG9hdGluZyBidG4tbGFyZ2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IHRlYWxcIiBvbkNsaWNrPXsoKSA9PiB7dGhpcy5wcm9wcy5vblN0b3AoKTsgdGhpcy5zdG9wVXNlckF1ZGlvLmFwcGx5KHRoaXMpfX0+PGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5zdG9wPC9pPjwvYT5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmF1ZGlvUGxheWVyfVxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIGlkPVwia2FyYW9rZUlucHV0XCIgbWluPVwiMFwiIG1heD1cIjFcIiBzdGVwPVwiMC4xXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25LYXJhb2tlVm9sdW1lQ2hhbmdlfS8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCJ2b2NhbHNJbnB1dFwiIG1pbj1cIjBcIiBtYXg9XCIxXCIgc3RlcD1cIjAuMVwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uVm9jYWxzVm9sdW1lQ2hhbmdlfS8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczEyIGw0IG92ZXJmbG93XCI+XG4gICAgICAgICAgICA8Y2FudmFzIGlkPVwid2F2ZWZvcm1cIiB3aWR0aD1cIjUxMlwiIGhlaWdodD1cIjI5MFwiPjwvY2FudmFzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGwxMiBzMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cgcGl0Y2hHcmFwaFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsNCBzNCBzY29yZWJvYXJkIG9mZnNldC1sM1wiPlxuICAgICAgICAgICAgPHNwYW4+U2NvcmUgOiB7dGhpcy5wcm9wcy5zY29yZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG53aW5kb3cuUGl0Y2hWaXN1YWxpemVyID0gUGl0Y2hWaXN1YWxpemVyO1xuXG4iXX0=