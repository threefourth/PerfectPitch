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
      console.log(this.props.selectedData);
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
                  _this2.props.onPlay();getUserAudio.apply(_this2);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGl0Y2hWaXN1YWxpemVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sZTs7Ozs7Ozs7Ozs7d0NBRWdCOztBQUVsQixVQUFJLGVBQWUsU0FBUyxjQUFULENBQXdCLGNBQXhCLENBQW5CO0FBQ0EsbUJBQWEsS0FBYixHQUFxQixDQUFyQjtBQUNBLFVBQUksY0FBYyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBbEI7QUFDQSxrQkFBWSxLQUFaLEdBQW9CLENBQXBCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFlLElBQUksWUFBSixFQUFmOztBQUVBLHFCQUFlLFNBQVMsY0FBVCxDQUF5QixVQUF6QixDQUFmO0FBQ0EsbUJBQWEsU0FBUyxjQUFULENBQXlCLFFBQXpCLENBQWI7QUFDQSxvQkFBYyxTQUFTLGNBQVQsQ0FBeUIsVUFBekIsQ0FBZDs7QUFFQSxVQUFJLFdBQUosRUFBaUI7QUFDZixxQkFBYSxZQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLG1CQUFXLFdBQVgsR0FBeUIsT0FBekI7QUFDQSxtQkFBVyxTQUFYLEdBQXVCLENBQXZCO0FBQ0Q7O0FBRUQsa0JBQVksU0FBUyxjQUFULENBQXlCLE9BQXpCLENBQVo7QUFDQSxpQkFBVyxTQUFTLGNBQVQsQ0FBeUIsTUFBekIsQ0FBWDtBQUNBLG1CQUFhLFNBQVMsY0FBVCxDQUF5QixRQUF6QixDQUFiO0FBQ0EscUJBQWUsU0FBUyxjQUFULENBQXlCLFlBQXpCLENBQWY7O0FBRUE7QUFDQSxVQUFJLFdBQVcsSUFBZjtBQUNBLFVBQUksWUFBWSxHQUFoQjs7QUFFQSxVQUFJLGFBQWEsR0FBRyxNQUFILENBQVUsYUFBVixFQUF5QixNQUF6QixDQUFnQyxLQUFoQyxFQUNkLElBRGMsQ0FDVCxPQURTLEVBQ0EsUUFEQSxFQUVkLElBRmMsQ0FFVCxRQUZTLEVBRUMsU0FGRCxDQUFqQjs7QUFJQSxVQUFJLGdCQUFnQixTQUFoQixh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SyxXQUFVLGdDQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBZSxtQkFBSyxLQUFMLENBQVc7QUFBMUI7QUFERjtBQURGO0FBOUJGLE9BREY7QUF1Q0Q7Ozs7RUExSTJCLE1BQU0sUzs7QUEySW5DOztBQUVELE9BQU8sZUFBUCxHQUF5QixlQUF6QjtBQUNjIiwiZmlsZSI6IlBpdGNoVmlzdWFsaXplci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBpdGNoVmlzdWFsaXplciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG5cbiAgICB2YXIga2FyYW9rZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2thcmFva2VJbnB1dCcpO1xuICAgIGthcmFva2VJbnB1dC52YWx1ZSA9IDE7XG4gICAgdmFyIHZvY2Fsc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvY2Fsc0lucHV0Jyk7XG4gICAgdm9jYWxzSW5wdXQudmFsdWUgPSAwO1xuXG4gICAgLy8gSW5pdGlhbGl6ZXMgdGhlIHZhcmlhYmxlcyB0aGF0IHRoZSBwaXRjaCBkZXRlY3RvciBhbmQgdmlzdWFsaXplclxuICAgIC8vIHdpbGwgbmVlZCB0byB1c2UgKHNlZSBzY3JpcHRzL3BpdGNoRGV0ZWN0b3IuanMpXG5cbiAgICAvLyBjb3JyZXNwb25kcyB0byBhIDVrSHogc2lnbmFsXG4gICAgLy8gTUFYX1NJWkUgPSBNYXRoLm1heCg0LCBNYXRoLmZsb29yKGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlIC8gNTAwMCkpOyAgXG4gICAgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuXG4gICAgZGV0ZWN0b3JFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZXRlY3RvcicgKTtcbiAgICBjYW52YXNFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdvdXRwdXQnICk7XG4gICAgREVCVUdDQU5WQVMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3dhdmVmb3JtJyApO1xuXG4gICAgaWYgKERFQlVHQ0FOVkFTKSB7XG4gICAgICB3YXZlQ2FudmFzID0gREVCVUdDQU5WQVMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHdhdmVDYW52YXMuc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xuICAgICAgd2F2ZUNhbnZhcy5saW5lV2lkdGggPSAxO1xuICAgIH1cblxuICAgIHBpdGNoRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGl0Y2gnICk7XG4gICAgbm90ZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ25vdGUnICk7XG4gICAgZGV0dW5lRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0dW5lJyApO1xuICAgIGRldHVuZUFtb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGV0dW5lX2FtdCcgKTtcblxuICAgIC8vIEF0dGFjaCB0aGUgU1ZHIGVsZW1lbnQgZm9yIGQzIHZpc3VhbGl6ZXJcbiAgICB2YXIgc3ZnV2lkdGggPSAxMDAwO1xuICAgIHZhciBzdmdIZWlnaHQgPSAyNTY7XG5cbiAgICB2YXIgcGl0Y2hHcmFwaCA9IGQzLnNlbGVjdCgnLnBpdGNoR3JhcGgnKS5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignd2lkdGgnLCBzdmdXaWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCBzdmdIZWlnaHQpO1xuXG4gICAgdmFyIGRyYXdTb25nR3JhcGggPSBmdW5jdGlvbiAoIGRhdGEgKSB7XG5cbiAgICAgIHZhciB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oIFswLCBkYXRhLmxlbmd0aF0gKVxuICAgICAgICAucmFuZ2UoIFswLCBzdmdXaWR0aF0gKTtcbiAgICAgIHZhciB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oIFswLCAxNTBdIClcbiAgICAgICAgLnJhbmdlKCBbc3ZnSGVpZ2h0LCAwXSApO1xuXG4gICAgICB2YXIgbm90ZXMgPSBwaXRjaEdyYXBoLnNlbGVjdEFsbCgncmVjdCcpXG4gICAgICAgIC5kYXRhKCBkYXRhICk7XG5cbiAgICAgIC8vIEVOVEVSXG4gICAgICBub3Rlcy5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICByZXR1cm4geFNjYWxlKGkpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4geVNjYWxlKGQudmFsdWUpO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignd2lkdGgnLCBzdmdXaWR0aCAvIGRhdGEubGVuZ3RoKVxuICAgICAgICAuYXR0cignaGVpZ2h0JywgMTApXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJyM1MEM4RkYnKVxuICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc29sZS5sb2codGhpcy5wcm9wcy5zZWxlY3RlZERhdGEpO1xuICAgIGRyYXdTb25nR3JhcGgoIHRoaXMucHJvcHMuc2VsZWN0ZWREYXRhICk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnN0b3BVc2VyQXVkaW8oKTtcbiAgfVxuXG4gIHN0b3BVc2VyQXVkaW8oKSB7XG4gICAgY29uc29sZS5sb2coJ1N0b3BwaW5nIHVzZXIgaW5wdXQnKTtcblxuICAgIGlmIChsb2NhbFN0cmVhbSkge1xuICAgICAgbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXS5zdG9wKCAwICk7XG4gICAgfVxuICAgIFxuICAgIGxvY2FsU3RyZWFtID0gbnVsbDtcbiAgICBjbGVhckludGVydmFsKHVwZGF0ZVBpdGNoSUQpO1xuICB9XG5cbiAgdG9nZ2xlTGl2ZUlucHV0KCkge1xuICAgIGNvbnNvbGUubG9nKCdUb2dnbGluZyBhdWRpbyBpbnB1dCcpO1xuICAgIGNvbnNvbGUubG9nKGxvY2FsU3RyZWFtKTtcblxuICAgIGlmIChsb2NhbFN0cmVhbSA9PT0gbnVsbCkge1xuICAgICAgZ2V0VXNlckF1ZGlvKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFVzZXJBdWRpbygpO1xuICAgIH1cblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwicGl0Y2hkZXRlY3RvclwiPlxuICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczEyIGw0XCI+XG4gICAgICAgICAgICA8ZGl2IGlkPVwiZGV0ZWN0b3JcIiBjbGFzc05hbWU9XCJ2YWd1ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpdGNoXCI+PHNwYW4gaWQ9XCJwaXRjaFwiPi0tPC9zcGFuPkh6PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90ZVwiPjxzcGFuIGlkPVwibm90ZVwiPi0tPC9zcGFuPjwvZGl2PiAgIFxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGV0dW5lXCI+PHNwYW4gaWQ9XCJkZXR1bmVfYW10XCI+LS08L3NwYW4+PHNwYW4gaWQ9XCJmbGF0XCI+Y2VudHMgJiM5ODM3Ozwvc3Bhbj48c3BhbiBpZD1cInNoYXJwXCI+Y2VudHMgJiM5ODM5Ozwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiAgICAgICBcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sIHMxMiBsNCBhdWRpb1BsYXllcic+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tZmxvYXRpbmcgYnRuLWxhcmdlIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCB0ZWFsXCIgb25DbGljaz0geygpID0+IHt0aGlzLnByb3BzLm9uUGxheSgpOyBnZXRVc2VyQXVkaW8uYXBwbHkodGhpcyl9fT48aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnBsYXlfYXJyb3c8L2k+PC9hPlxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuLWZsb2F0aW5nIGJ0bi1sYXJnZSB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgdGVhbFwiIG9uQ2xpY2s9eygpID0+IHt0aGlzLnByb3BzLm9uUGF1c2UoKTsgdGhpcy5zdG9wVXNlckF1ZGlvLmFwcGx5KHRoaXMpfX0+PGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5wYXVzZTwvaT48L2E+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tZmxvYXRpbmcgYnRuLWxhcmdlIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCB0ZWFsXCIgb25DbGljaz17KCkgPT4ge3RoaXMucHJvcHMub25TdG9wKCk7IHRoaXMuc3RvcFVzZXJBdWRpby5hcHBseSh0aGlzKX19PjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+c3RvcDwvaT48L2E+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5hdWRpb1BsYXllcn1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cImthcmFva2VJbnB1dFwiIG1pbj1cIjBcIiBtYXg9XCIxXCIgc3RlcD1cIjAuMVwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uS2FyYW9rZVZvbHVtZUNoYW5nZX0vPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIGlkPVwidm9jYWxzSW5wdXRcIiBtaW49XCIwXCIgbWF4PVwiMVwiIHN0ZXA9XCIwLjFcIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblZvY2Fsc1ZvbHVtZUNoYW5nZX0vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHMxMiBsNCBvdmVyZmxvd1wiPlxuICAgICAgICAgICAgPGNhbnZhcyBpZD1cIndhdmVmb3JtXCIgd2lkdGg9XCI1MTJcIiBoZWlnaHQ9XCIyOTBcIj48L2NhbnZhcz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsMTIgczEyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93IHBpdGNoR3JhcGhcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbDQgczQgc2NvcmVib2FyZCBvZmZzZXQtbDNcIj5cbiAgICAgICAgICAgIDxzcGFuPlNjb3JlIDoge3RoaXMucHJvcHMuc2NvcmV9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxud2luZG93LlBpdGNoVmlzdWFsaXplciA9IFBpdGNoVmlzdWFsaXplcjtcbiAgICAgICAgICAgICAgLy8gPGNhbnZhcyBpZD1cIm91dHB1dFwiID48L2NhbnZhcz4gYmVsb3cgI25vdGUiXX0=