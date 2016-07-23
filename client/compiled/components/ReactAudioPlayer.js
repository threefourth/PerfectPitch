'use strict';

var DEFAULT_LISTEN_INTERVAL = 10000;

var ReactAudioPlayer = React.createClass({
  displayName: 'ReactAudioPlayer',
  componentDidMount: function componentDidMount() {
    var _this = this;

    var audio = this.refs.audio;

    audio.addEventListener('error', function (e) {
      _this.props.onError && _this.props.onError(e);
    });

    // When enough of the file has downloaded to start playing
    audio.addEventListener('canplay', function (e) {
      _this.props.onCanPlay && _this.props.onCanPlay(e);
    });

    // When enough of the file has downloaded to play the entire file
    audio.addEventListener('canplaythrough', function (e) {
      _this.props.onCanPlayThrough && _this.props.onCanPlayThrough(e);
    });

    // When audio play starts
    audio.addEventListener('play', function (e) {
      _this.setListenTrack();
      _this.props.onPlay && _this.props.onPlay(e);
    });

    // When unloading the audio player (switching to another src)
    audio.addEventListener('abort', function (e) {
      _this.clearListenTrack();
      _this.props.onAbort && _this.props.onAbort(e);
    });

    // When the file has finished playing to the end
    audio.addEventListener('ended', function (e) {
      _this.clearListenTrack();
      _this.props.onEnd && _this.props.onEnd(e);
    });

    // When the user pauses playback
    audio.addEventListener('pause', function (e) {
      _this.clearListenTrack();
      _this.props.onPause && _this.props.onPause(e);
    });

    // When the user drags the time indicator to a new time
    audio.addEventListener('seeked', function (e) {
      _this.clearListenTrack();
      _this.props.onSeeked && _this.props.onSeeked(e);
    });
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

    if (nextProps.src === null) {
      var audio = this.refs.audio;
      console.log(audio);
      audio.src = '';
    }

    if (nextProps.selectedPlayerEvent) {
      var _audio = this.refs.audio;

      _audio.currentTime = nextProps.selectedPlayerEvent.playTime;
      _audio.play();
    }
  },
  render: function render() {
    var incompatibilityMessage = this.props.children || React.createElement(
      'p',
      null,
      'Your browser does not support the ',
      React.createElement(
        'code',
        null,
        'audio'
      ),
      ' element.'
    );

    return React.createElement(
      'audio',
      {
        className: 'react-audio-player',
        id: this.props.id,
        src: this.props.src,
        autoPlay: this.props.autoPlay,
        preload: this.props.preload,
        controls: true,
        ref: 'audio',
        onPlay: this.onPlay
      },
      incompatibilityMessage
    );
  },


  /**
   * Set an interval to call props.onListen every props.listenInterval time period
   */
  setListenTrack: function setListenTrack() {
    var _this2 = this;

    if (!this.listenTracker) {
      var listenInterval = this.props.listenInterval || DEFAULT_LISTEN_INTERVAL;
      this.listenTracker = setInterval(function () {
        _this2.props.onListen && _this2.props.onListen(_this2.refs.audio.currentTime);
      }, listenInterval);
    }
  },


  /**
   * Clear the onListen interval
   */
  clearListenTrack: function clearListenTrack() {
    if (this.listenTracker) {
      clearInterval(this.listenTracker);
      this.listenTracker = null;
    }
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUmVhY3RBdWRpb1BsYXllci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLDBCQUEwQixLQUFoQzs7QUFFQSxJQUFNLG1CQUFtQixNQUFNLFdBQU4sQ0FBa0I7QUFBQTtBQUN6QyxtQkFEeUMsK0JBQ3JCO0FBQUE7O0FBQ2xCLFFBQU0sUUFBUSxLQUFLLElBQUwsQ0FBVSxLQUF4Qjs7QUFFQSxVQUFNLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUMsQ0FBRCxFQUFPO0FBQ3JDLFlBQUssS0FBTCxDQUFXLE9BQVgsSUFBc0IsTUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixDQUFuQixDQUF0QjtBQUNELEtBRkQ7O0FBSUE7QUFDQSxVQUFNLGdCQUFOLENBQXVCLFNBQXZCLEVBQWtDLFVBQUMsQ0FBRCxFQUFPO0FBQ3ZDLFlBQUssS0FBTCxDQUFXLFNBQVgsSUFBd0IsTUFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixDQUFyQixDQUF4QjtBQUNELEtBRkQ7O0FBSUE7QUFDQSxVQUFNLGdCQUFOLENBQXVCLGdCQUF2QixFQUF5QyxVQUFDLENBQUQsRUFBTztBQUM5QyxZQUFLLEtBQUwsQ0FBVyxnQkFBWCxJQUErQixNQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixDQUE1QixDQUEvQjtBQUNELEtBRkQ7O0FBSUE7QUFDQSxVQUFNLGdCQUFOLENBQXVCLE1BQXZCLEVBQStCLFVBQUMsQ0FBRCxFQUFPO0FBQ3BDLFlBQUssY0FBTDtBQUNBLFlBQUssS0FBTCxDQUFXLE1BQVgsSUFBcUIsTUFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixDQUFsQixDQUFyQjtBQUNELEtBSEQ7O0FBS0E7QUFDQSxVQUFNLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUMsQ0FBRCxFQUFPO0FBQ3JDLFlBQUssZ0JBQUw7QUFDQSxZQUFLLEtBQUwsQ0FBVyxPQUFYLElBQXNCLE1BQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsQ0FBbkIsQ0FBdEI7QUFDRCxLQUhEOztBQUtBO0FBQ0EsVUFBTSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDLENBQUQsRUFBTztBQUNyQyxZQUFLLGdCQUFMO0FBQ0EsWUFBSyxLQUFMLENBQVcsS0FBWCxJQUFvQixNQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLENBQWpCLENBQXBCO0FBQ0QsS0FIRDs7QUFLQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQyxDQUFELEVBQU87QUFDckMsWUFBSyxnQkFBTDtBQUNBLFlBQUssS0FBTCxDQUFXLE9BQVgsSUFBc0IsTUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixDQUFuQixDQUF0QjtBQUNELEtBSEQ7O0FBS0E7QUFDQSxVQUFNLGdCQUFOLENBQXVCLFFBQXZCLEVBQWlDLFVBQUMsQ0FBRCxFQUFPO0FBQ3RDLFlBQUssZ0JBQUw7QUFDQSxZQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLE1BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsQ0FBcEIsQ0FBdkI7QUFDRCxLQUhEO0FBSUQsR0EvQ3dDO0FBaUR6QywyQkFqRHlDLHFDQWlEZixTQWpEZSxFQWlESjs7QUFFbkMsUUFBSSxVQUFVLEdBQVYsS0FBa0IsSUFBdEIsRUFBNEI7QUFDMUIsVUFBTSxRQUFRLEtBQUssSUFBTCxDQUFVLEtBQXhCO0FBQ0EsY0FBUSxHQUFSLENBQVksS0FBWjtBQUNBLFlBQU0sR0FBTixHQUFZLEVBQVo7QUFDRDs7QUFFRCxRQUFJLFVBQVUsbUJBQWQsRUFBbUM7QUFDakMsVUFBTSxTQUFRLEtBQUssSUFBTCxDQUFVLEtBQXhCOztBQUVBLGFBQU0sV0FBTixHQUFvQixVQUFVLG1CQUFWLENBQThCLFFBQWxEO0FBQ0EsYUFBTSxJQUFOO0FBQ0Q7QUFDRixHQS9Ed0M7QUFpRXpDLFFBakV5QyxvQkFpRWhDO0FBQ1AsUUFBTSx5QkFBeUIsS0FBSyxLQUFMLENBQVcsUUFBWCxJQUM3QjtBQUFBO0FBQUE7QUFBQTtBQUFxQztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQXJDO0FBQUE7QUFBQSxLQURGOztBQUlBLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQVUsb0JBRFo7QUFFRSxZQUFJLEtBQUssS0FBTCxDQUFXLEVBRmpCO0FBR0UsYUFBSyxLQUFLLEtBQUwsQ0FBVyxHQUhsQjtBQUlFLGtCQUFVLEtBQUssS0FBTCxDQUFXLFFBSnZCO0FBS0UsaUJBQVMsS0FBSyxLQUFMLENBQVcsT0FMdEI7QUFNRSxzQkFORjtBQU9FLGFBQUksT0FQTjtBQVFFLGdCQUFRLEtBQUs7QUFSZjtBQVVHO0FBVkgsS0FERjtBQWNELEdBcEZ3Qzs7O0FBc0Z6Qzs7O0FBR0EsZ0JBekZ5Qyw0QkF5RnhCO0FBQUE7O0FBQ2YsUUFBSSxDQUFDLEtBQUssYUFBVixFQUF5QjtBQUN2QixVQUFNLGlCQUFpQixLQUFLLEtBQUwsQ0FBVyxjQUFYLElBQTZCLHVCQUFwRDtBQUNBLFdBQUssYUFBTCxHQUFxQixZQUFZLFlBQU07QUFDckMsZUFBSyxLQUFMLENBQVcsUUFBWCxJQUF1QixPQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLE9BQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsV0FBcEMsQ0FBdkI7QUFDRCxPQUZvQixFQUVsQixjQUZrQixDQUFyQjtBQUdEO0FBQ0YsR0FoR3dDOzs7QUFrR3pDOzs7QUFHQSxrQkFyR3lDLDhCQXFHdEI7QUFDakIsUUFBSSxLQUFLLGFBQVQsRUFBd0I7QUFDdEIsb0JBQWMsS0FBSyxhQUFuQjtBQUNBLFdBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNEO0FBQ0Y7QUExR3dDLENBQWxCLENBQXpCIiwiZmlsZSI6IlJlYWN0QXVkaW9QbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBERUZBVUxUX0xJU1RFTl9JTlRFUlZBTCA9IDEwMDAwO1xuXG5jb25zdCBSZWFjdEF1ZGlvUGxheWVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBhdWRpbyA9IHRoaXMucmVmcy5hdWRpbztcblxuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGUpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25FcnJvciAmJiB0aGlzLnByb3BzLm9uRXJyb3IoZSk7XG4gICAgfSk7XG5cbiAgICAvLyBXaGVuIGVub3VnaCBvZiB0aGUgZmlsZSBoYXMgZG93bmxvYWRlZCB0byBzdGFydCBwbGF5aW5nXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheScsIChlKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2FuUGxheSAmJiB0aGlzLnByb3BzLm9uQ2FuUGxheShlKTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gZW5vdWdoIG9mIHRoZSBmaWxlIGhhcyBkb3dubG9hZGVkIHRvIHBsYXkgdGhlIGVudGlyZSBmaWxlXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbkNhblBsYXlUaHJvdWdoICYmIHRoaXMucHJvcHMub25DYW5QbGF5VGhyb3VnaChlKTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gYXVkaW8gcGxheSBzdGFydHNcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgKGUpID0+IHtcbiAgICAgIHRoaXMuc2V0TGlzdGVuVHJhY2soKTtcbiAgICAgIHRoaXMucHJvcHMub25QbGF5ICYmIHRoaXMucHJvcHMub25QbGF5KGUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiB1bmxvYWRpbmcgdGhlIGF1ZGlvIHBsYXllciAoc3dpdGNoaW5nIHRvIGFub3RoZXIgc3JjKVxuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgKGUpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJMaXN0ZW5UcmFjaygpO1xuICAgICAgdGhpcy5wcm9wcy5vbkFib3J0ICYmIHRoaXMucHJvcHMub25BYm9ydChlKTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gdGhlIGZpbGUgaGFzIGZpbmlzaGVkIHBsYXlpbmcgdG8gdGhlIGVuZFxuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJMaXN0ZW5UcmFjaygpO1xuICAgICAgdGhpcy5wcm9wcy5vbkVuZCAmJiB0aGlzLnByb3BzLm9uRW5kKGUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBwYXVzZXMgcGxheWJhY2tcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIChlKSA9PiB7XG4gICAgICB0aGlzLmNsZWFyTGlzdGVuVHJhY2soKTtcbiAgICAgIHRoaXMucHJvcHMub25QYXVzZSAmJiB0aGlzLnByb3BzLm9uUGF1c2UoZSk7XG4gICAgfSk7XG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIGRyYWdzIHRoZSB0aW1lIGluZGljYXRvciB0byBhIG5ldyB0aW1lXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignc2Vla2VkJywgKGUpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJMaXN0ZW5UcmFjaygpO1xuICAgICAgdGhpcy5wcm9wcy5vblNlZWtlZCAmJiB0aGlzLnByb3BzLm9uU2Vla2VkKGUpO1xuICAgIH0pO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgXG4gICAgaWYgKG5leHRQcm9wcy5zcmMgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGF1ZGlvID0gdGhpcy5yZWZzLmF1ZGlvO1xuICAgICAgY29uc29sZS5sb2coYXVkaW8pO1xuICAgICAgYXVkaW8uc3JjID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKG5leHRQcm9wcy5zZWxlY3RlZFBsYXllckV2ZW50KSB7XG4gICAgICBjb25zdCBhdWRpbyA9IHRoaXMucmVmcy5hdWRpbztcblxuICAgICAgYXVkaW8uY3VycmVudFRpbWUgPSBuZXh0UHJvcHMuc2VsZWN0ZWRQbGF5ZXJFdmVudC5wbGF5VGltZTtcbiAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGluY29tcGF0aWJpbGl0eU1lc3NhZ2UgPSB0aGlzLnByb3BzLmNoaWxkcmVuIHx8IChcbiAgICAgIDxwPllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSA8Y29kZT5hdWRpbzwvY29kZT4gZWxlbWVudC48L3A+XG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8YXVkaW9cbiAgICAgICAgY2xhc3NOYW1lPVwicmVhY3QtYXVkaW8tcGxheWVyXCJcbiAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWR9XG4gICAgICAgIHNyYz17dGhpcy5wcm9wcy5zcmN9XG4gICAgICAgIGF1dG9QbGF5PXt0aGlzLnByb3BzLmF1dG9QbGF5fVxuICAgICAgICBwcmVsb2FkPXt0aGlzLnByb3BzLnByZWxvYWR9XG4gICAgICAgIGNvbnRyb2xzXG4gICAgICAgIHJlZj1cImF1ZGlvXCJcbiAgICAgICAgb25QbGF5PXt0aGlzLm9uUGxheX1cbiAgICAgID5cbiAgICAgICAge2luY29tcGF0aWJpbGl0eU1lc3NhZ2V9XG4gICAgICA8L2F1ZGlvPlxuICAgICk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldCBhbiBpbnRlcnZhbCB0byBjYWxsIHByb3BzLm9uTGlzdGVuIGV2ZXJ5IHByb3BzLmxpc3RlbkludGVydmFsIHRpbWUgcGVyaW9kXG4gICAqL1xuICBzZXRMaXN0ZW5UcmFjaygpIHtcbiAgICBpZiAoIXRoaXMubGlzdGVuVHJhY2tlcikge1xuICAgICAgY29uc3QgbGlzdGVuSW50ZXJ2YWwgPSB0aGlzLnByb3BzLmxpc3RlbkludGVydmFsIHx8IERFRkFVTFRfTElTVEVOX0lOVEVSVkFMO1xuICAgICAgdGhpcy5saXN0ZW5UcmFja2VyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uTGlzdGVuICYmIHRoaXMucHJvcHMub25MaXN0ZW4odGhpcy5yZWZzLmF1ZGlvLmN1cnJlbnRUaW1lKTtcbiAgICAgIH0sIGxpc3RlbkludGVydmFsKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBvbkxpc3RlbiBpbnRlcnZhbFxuICAgKi9cbiAgY2xlYXJMaXN0ZW5UcmFjaygpIHtcbiAgICBpZiAodGhpcy5saXN0ZW5UcmFja2VyKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMubGlzdGVuVHJhY2tlcik7XG4gICAgICB0aGlzLmxpc3RlblRyYWNrZXIgPSBudWxsO1xuICAgIH1cbiAgfSxcbn0pO1xuXG4iXX0=