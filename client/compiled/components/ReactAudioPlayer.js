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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUmVhY3RBdWRpb1BsYXllci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLDBCQUEwQixLQUFoQzs7QUFFQSxJQUFNLG1CQUFtQixNQUFNLFdBQU4sQ0FBa0I7QUFBQTtBQUN6QyxtQkFEeUMsK0JBQ3JCO0FBQUE7O0FBQ2xCLFFBQU0sUUFBUSxLQUFLLElBQUwsQ0FBVSxLQUF4Qjs7QUFFQSxVQUFNLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUMsQ0FBRCxFQUFPO0FBQ3JDLFlBQUssS0FBTCxDQUFXLE9BQVgsSUFBc0IsTUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixDQUFuQixDQUF0QjtBQUNELEtBRkQ7O0FBSUE7QUFDQSxVQUFNLGdCQUFOLENBQXVCLFNBQXZCLEVBQWtDLFVBQUMsQ0FBRCxFQUFPO0FBQ3ZDLFlBQUssS0FBTCxDQUFXLFNBQVgsSUFBd0IsTUFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixDQUFyQixDQUF4QjtBQUNELEtBRkQ7O0FBSUE7QUFDQSxVQUFNLGdCQUFOLENBQXVCLGdCQUF2QixFQUF5QyxVQUFDLENBQUQsRUFBTztBQUM5QyxZQUFLLEtBQUwsQ0FBVyxnQkFBWCxJQUErQixNQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixDQUE1QixDQUEvQjtBQUNELEtBRkQ7O0FBSUE7QUFDQSxVQUFNLGdCQUFOLENBQXVCLE1BQXZCLEVBQStCLFVBQUMsQ0FBRCxFQUFPO0FBQ3BDLFlBQUssY0FBTDtBQUNBLFlBQUssS0FBTCxDQUFXLE1BQVgsSUFBcUIsTUFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixDQUFsQixDQUFyQjtBQUNELEtBSEQ7O0FBS0E7QUFDQSxVQUFNLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUMsQ0FBRCxFQUFPO0FBQ3JDLFlBQUssZ0JBQUw7QUFDQSxZQUFLLEtBQUwsQ0FBVyxPQUFYLElBQXNCLE1BQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsQ0FBbkIsQ0FBdEI7QUFDRCxLQUhEOztBQUtBO0FBQ0EsVUFBTSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDLENBQUQsRUFBTztBQUNyQyxZQUFLLGdCQUFMO0FBQ0EsWUFBSyxLQUFMLENBQVcsS0FBWCxJQUFvQixNQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLENBQWpCLENBQXBCO0FBQ0QsS0FIRDs7QUFLQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQyxDQUFELEVBQU87QUFDckMsWUFBSyxnQkFBTDtBQUNBLFlBQUssS0FBTCxDQUFXLE9BQVgsSUFBc0IsTUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixDQUFuQixDQUF0QjtBQUNELEtBSEQ7O0FBS0E7QUFDQSxVQUFNLGdCQUFOLENBQXVCLFFBQXZCLEVBQWlDLFVBQUMsQ0FBRCxFQUFPO0FBQ3RDLFlBQUssZ0JBQUw7QUFDQSxZQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLE1BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsQ0FBcEIsQ0FBdkI7QUFDRCxLQUhEO0FBSUQsR0EvQ3dDO0FBaUR6QywyQkFqRHlDLHFDQWlEZixTQWpEZSxFQWlESjs7QUFFbkMsUUFBSSxVQUFVLEdBQVYsS0FBa0IsSUFBdEIsRUFBNEI7QUFDMUIsVUFBTSxRQUFRLEtBQUssSUFBTCxDQUFVLEtBQXhCO0FBQ0EsY0FBUSxHQUFSLENBQVksS0FBWjtBQUNBLFlBQU0sR0FBTixHQUFZLEVBQVo7QUFDRDs7QUFFRCxRQUFJLFVBQVUsbUJBQWQsRUFBbUM7QUFDakMsVUFBTSxTQUFRLEtBQUssSUFBTCxDQUFVLEtBQXhCOztBQUVBLGFBQU0sV0FBTixHQUFvQixVQUFVLG1CQUFWLENBQThCLFFBQWxEO0FBQ0EsYUFBTSxJQUFOO0FBQ0Q7QUFDRixHQS9Ed0M7QUFpRXpDLFFBakV5QyxvQkFpRWhDO0FBQ1AsUUFBTSx5QkFBeUIsS0FBSyxLQUFMLENBQVcsUUFBWCxJQUM3QjtBQUFBO0FBQUE7QUFBQTtBQUFxQztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQXJDO0FBQUE7QUFBQSxLQURGOztBQUlBLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQVUsb0JBRFo7QUFFRSxZQUFJLEtBQUssS0FBTCxDQUFXLEVBRmpCO0FBR0UsYUFBSyxLQUFLLEtBQUwsQ0FBVyxHQUhsQjtBQUlFLGtCQUFVLEtBQUssS0FBTCxDQUFXLFFBSnZCO0FBS0UsaUJBQVMsS0FBSyxLQUFMLENBQVcsT0FMdEI7QUFNRSxzQkFORjtBQU9FLGFBQUksT0FQTjtBQVFFLGdCQUFRLEtBQUs7QUFSZjtBQVVHO0FBVkgsS0FERjtBQWNELEdBcEZ3Qzs7O0FBc0Z6Qzs7O0FBR0EsZ0JBekZ5Qyw0QkF5RnhCO0FBQUE7O0FBQ2YsUUFBSSxDQUFDLEtBQUssYUFBVixFQUF5QjtBQUN2QixVQUFNLGlCQUFpQixLQUFLLEtBQUwsQ0FBVyxjQUFYLElBQTZCLHVCQUFwRDtBQUNBLFdBQUssYUFBTCxHQUFxQixZQUFZLFlBQU07QUFDckMsZUFBSyxLQUFMLENBQVcsUUFBWCxJQUF1QixPQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLE9BQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsV0FBcEMsQ0FBdkI7QUFDRCxPQUZvQixFQUVsQixjQUZrQixDQUFyQjtBQUdEO0FBQ0YsR0FoR3dDOzs7QUFrR3pDOzs7QUFHQSxrQkFyR3lDLDhCQXFHdEI7QUFDakIsUUFBSSxLQUFLLGFBQVQsRUFBd0I7QUFDdEIsb0JBQWMsS0FBSyxhQUFuQjtBQUNBLFdBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNEO0FBQ0Y7QUExR3dDLENBQWxCLENBQXpCIiwiZmlsZSI6IlJlYWN0QXVkaW9QbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBERUZBVUxUX0xJU1RFTl9JTlRFUlZBTCA9IDEwMDAwO1xyXG5cclxuY29uc3QgUmVhY3RBdWRpb1BsYXllciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IGF1ZGlvID0gdGhpcy5yZWZzLmF1ZGlvO1xyXG5cclxuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGUpID0+IHtcclxuICAgICAgdGhpcy5wcm9wcy5vbkVycm9yICYmIHRoaXMucHJvcHMub25FcnJvcihlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFdoZW4gZW5vdWdoIG9mIHRoZSBmaWxlIGhhcyBkb3dubG9hZGVkIHRvIHN0YXJ0IHBsYXlpbmdcclxuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXknLCAoZSkgPT4ge1xyXG4gICAgICB0aGlzLnByb3BzLm9uQ2FuUGxheSAmJiB0aGlzLnByb3BzLm9uQ2FuUGxheShlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFdoZW4gZW5vdWdoIG9mIHRoZSBmaWxlIGhhcyBkb3dubG9hZGVkIHRvIHBsYXkgdGhlIGVudGlyZSBmaWxlXHJcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIChlKSA9PiB7XHJcbiAgICAgIHRoaXMucHJvcHMub25DYW5QbGF5VGhyb3VnaCAmJiB0aGlzLnByb3BzLm9uQ2FuUGxheVRocm91Z2goZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBXaGVuIGF1ZGlvIHBsYXkgc3RhcnRzXHJcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgKGUpID0+IHtcclxuICAgICAgdGhpcy5zZXRMaXN0ZW5UcmFjaygpO1xyXG4gICAgICB0aGlzLnByb3BzLm9uUGxheSAmJiB0aGlzLnByb3BzLm9uUGxheShlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFdoZW4gdW5sb2FkaW5nIHRoZSBhdWRpbyBwbGF5ZXIgKHN3aXRjaGluZyB0byBhbm90aGVyIHNyYylcclxuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgKGUpID0+IHtcclxuICAgICAgdGhpcy5jbGVhckxpc3RlblRyYWNrKCk7XHJcbiAgICAgIHRoaXMucHJvcHMub25BYm9ydCAmJiB0aGlzLnByb3BzLm9uQWJvcnQoZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBXaGVuIHRoZSBmaWxlIGhhcyBmaW5pc2hlZCBwbGF5aW5nIHRvIHRoZSBlbmRcclxuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKGUpID0+IHtcclxuICAgICAgdGhpcy5jbGVhckxpc3RlblRyYWNrKCk7XHJcbiAgICAgIHRoaXMucHJvcHMub25FbmQgJiYgdGhpcy5wcm9wcy5vbkVuZChlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFdoZW4gdGhlIHVzZXIgcGF1c2VzIHBsYXliYWNrXHJcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIChlKSA9PiB7XHJcbiAgICAgIHRoaXMuY2xlYXJMaXN0ZW5UcmFjaygpO1xyXG4gICAgICB0aGlzLnByb3BzLm9uUGF1c2UgJiYgdGhpcy5wcm9wcy5vblBhdXNlKGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gV2hlbiB0aGUgdXNlciBkcmFncyB0aGUgdGltZSBpbmRpY2F0b3IgdG8gYSBuZXcgdGltZVxyXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignc2Vla2VkJywgKGUpID0+IHtcclxuICAgICAgdGhpcy5jbGVhckxpc3RlblRyYWNrKCk7XHJcbiAgICAgIHRoaXMucHJvcHMub25TZWVrZWQgJiYgdGhpcy5wcm9wcy5vblNlZWtlZChlKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICBcclxuICAgIGlmIChuZXh0UHJvcHMuc3JjID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IGF1ZGlvID0gdGhpcy5yZWZzLmF1ZGlvO1xyXG4gICAgICBjb25zb2xlLmxvZyhhdWRpbyk7XHJcbiAgICAgIGF1ZGlvLnNyYyA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0ZWRQbGF5ZXJFdmVudCkge1xyXG4gICAgICBjb25zdCBhdWRpbyA9IHRoaXMucmVmcy5hdWRpbztcclxuXHJcbiAgICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gbmV4dFByb3BzLnNlbGVjdGVkUGxheWVyRXZlbnQucGxheVRpbWU7XHJcbiAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBpbmNvbXBhdGliaWxpdHlNZXNzYWdlID0gdGhpcy5wcm9wcy5jaGlsZHJlbiB8fCAoXHJcbiAgICAgIDxwPllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSA8Y29kZT5hdWRpbzwvY29kZT4gZWxlbWVudC48L3A+XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxhdWRpb1xyXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWF1ZGlvLXBsYXllclwiXHJcbiAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWR9XHJcbiAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNyY31cclxuICAgICAgICBhdXRvUGxheT17dGhpcy5wcm9wcy5hdXRvUGxheX1cclxuICAgICAgICBwcmVsb2FkPXt0aGlzLnByb3BzLnByZWxvYWR9XHJcbiAgICAgICAgY29udHJvbHNcclxuICAgICAgICByZWY9XCJhdWRpb1wiXHJcbiAgICAgICAgb25QbGF5PXt0aGlzLm9uUGxheX1cclxuICAgICAgPlxyXG4gICAgICAgIHtpbmNvbXBhdGliaWxpdHlNZXNzYWdlfVxyXG4gICAgICA8L2F1ZGlvPlxyXG4gICAgKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBTZXQgYW4gaW50ZXJ2YWwgdG8gY2FsbCBwcm9wcy5vbkxpc3RlbiBldmVyeSBwcm9wcy5saXN0ZW5JbnRlcnZhbCB0aW1lIHBlcmlvZFxyXG4gICAqL1xyXG4gIHNldExpc3RlblRyYWNrKCkge1xyXG4gICAgaWYgKCF0aGlzLmxpc3RlblRyYWNrZXIpIHtcclxuICAgICAgY29uc3QgbGlzdGVuSW50ZXJ2YWwgPSB0aGlzLnByb3BzLmxpc3RlbkludGVydmFsIHx8IERFRkFVTFRfTElTVEVOX0lOVEVSVkFMO1xyXG4gICAgICB0aGlzLmxpc3RlblRyYWNrZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkxpc3RlbiAmJiB0aGlzLnByb3BzLm9uTGlzdGVuKHRoaXMucmVmcy5hdWRpby5jdXJyZW50VGltZSk7XHJcbiAgICAgIH0sIGxpc3RlbkludGVydmFsKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgb25MaXN0ZW4gaW50ZXJ2YWxcclxuICAgKi9cclxuICBjbGVhckxpc3RlblRyYWNrKCkge1xyXG4gICAgaWYgKHRoaXMubGlzdGVuVHJhY2tlcikge1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMubGlzdGVuVHJhY2tlcik7XHJcbiAgICAgIHRoaXMubGlzdGVuVHJhY2tlciA9IG51bGw7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG4iXX0=