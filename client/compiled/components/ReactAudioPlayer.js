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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUmVhY3RBdWRpb1BsYXllci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLDBCQUEwQixLQUFoQzs7QUFFQSxJQUFNLG1CQUFtQixNQUFNLFdBQU4sQ0FBa0I7QUFBQTtBQUN6QyxtQkFEeUMsK0JBQ3JCO0FBQUE7O0FBQ2xCLFFBQU0sUUFBUSxLQUFLLElBQUwsQ0FBVSxLQUF4Qjs7QUFFQSxVQUFNLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUMsQ0FBRCxFQUFPO0FBQ3JDLFlBQUssS0FBTCxDQUFXLE9BQVgsSUFBc0IsTUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixDQUFuQixDQUF0QjtBQUNELEtBRkQ7O0FBSUE7QUFDQSxVQUFNLGdCQUFOLENBQXVCLFNBQXZCLEVBQWtDLFVBQUMsQ0FBRCxFQUFPO0FBQ3ZDLFlBQUssS0FBTCxDQUFXLFNBQVgsSUFBd0IsTUFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixDQUFyQixDQUF4QjtBQUNELEtBRkQ7O0FBSUE7QUFDQSxVQUFNLGdCQUFOLENBQXVCLGdCQUF2QixFQUF5QyxVQUFDLENBQUQsRUFBTztBQUM5QyxZQUFLLEtBQUwsQ0FBVyxnQkFBWCxJQUErQixNQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixDQUE1QixDQUEvQjtBQUNELEtBRkQ7O0FBSUE7QUFDQSxVQUFNLGdCQUFOLENBQXVCLE1BQXZCLEVBQStCLFVBQUMsQ0FBRCxFQUFPO0FBQ3BDLFlBQUssY0FBTDtBQUNBLFlBQUssS0FBTCxDQUFXLE1BQVgsSUFBcUIsTUFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixDQUFsQixDQUFyQjtBQUNELEtBSEQ7O0FBS0E7QUFDQSxVQUFNLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUMsQ0FBRCxFQUFPO0FBQ3JDLFlBQUssZ0JBQUw7QUFDQSxZQUFLLEtBQUwsQ0FBVyxPQUFYLElBQXNCLE1BQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsQ0FBbkIsQ0FBdEI7QUFDRCxLQUhEOztBQUtBO0FBQ0EsVUFBTSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDLENBQUQsRUFBTztBQUNyQyxZQUFLLGdCQUFMO0FBQ0EsWUFBSyxLQUFMLENBQVcsS0FBWCxJQUFvQixNQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLENBQWpCLENBQXBCO0FBQ0QsS0FIRDs7QUFLQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQyxDQUFELEVBQU87QUFDckMsWUFBSyxnQkFBTDtBQUNBLFlBQUssS0FBTCxDQUFXLE9BQVgsSUFBc0IsTUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixDQUFuQixDQUF0QjtBQUNELEtBSEQ7O0FBS0E7QUFDQSxVQUFNLGdCQUFOLENBQXVCLFFBQXZCLEVBQWlDLFVBQUMsQ0FBRCxFQUFPO0FBQ3RDLFlBQUssZ0JBQUw7QUFDQSxZQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLE1BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsQ0FBcEIsQ0FBdkI7QUFDRCxLQUhEO0FBSUQsR0EvQ3dDO0FBaUR6QywyQkFqRHlDLHFDQWlEZixTQWpEZSxFQWlESjs7QUFFbkMsUUFBSSxVQUFVLEdBQVYsS0FBa0IsSUFBdEIsRUFBNEI7QUFDMUIsVUFBTSxRQUFRLEtBQUssSUFBTCxDQUFVLEtBQXhCO0FBQ0EsY0FBUSxHQUFSLENBQVksS0FBWjtBQUNBLFlBQU0sR0FBTixHQUFZLEVBQVo7QUFDRDs7QUFFRCxRQUFJLFVBQVUsbUJBQWQsRUFBbUM7QUFDakMsVUFBTSxTQUFRLEtBQUssSUFBTCxDQUFVLEtBQXhCOztBQUVBLGFBQU0sV0FBTixHQUFvQixVQUFVLG1CQUFWLENBQThCLFFBQWxEO0FBQ0EsYUFBTSxJQUFOO0FBQ0Q7QUFDRixHQS9Ed0M7QUFpRXpDLFFBakV5QyxvQkFpRWhDO0FBQ1AsUUFBTSx5QkFBeUIsS0FBSyxLQUFMLENBQVcsUUFBWCxJQUM3QjtBQUFBO0FBQUE7QUFBQTtBQUFxQztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQXJDO0FBQUE7QUFBQSxLQURGOztBQUlBLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQVUsb0JBRFo7QUFFRSxhQUFLLEtBQUssS0FBTCxDQUFXLEdBRmxCO0FBR0Usa0JBQVUsS0FBSyxLQUFMLENBQVcsUUFIdkI7QUFJRSxpQkFBUyxLQUFLLEtBQUwsQ0FBVyxPQUp0QjtBQUtFLHNCQUxGO0FBTUUsYUFBSSxPQU5OO0FBT0UsZ0JBQVEsS0FBSztBQVBmO0FBU0c7QUFUSCxLQURGO0FBYUQsR0FuRndDOzs7QUFxRnpDOzs7QUFHQSxnQkF4RnlDLDRCQXdGeEI7QUFBQTs7QUFDZixRQUFJLENBQUMsS0FBSyxhQUFWLEVBQXlCO0FBQ3ZCLFVBQU0saUJBQWlCLEtBQUssS0FBTCxDQUFXLGNBQVgsSUFBNkIsdUJBQXBEO0FBQ0EsV0FBSyxhQUFMLEdBQXFCLFlBQVksWUFBTTtBQUNyQyxlQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsT0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixXQUFwQyxDQUF2QjtBQUNELE9BRm9CLEVBRWxCLGNBRmtCLENBQXJCO0FBR0Q7QUFDRixHQS9Gd0M7OztBQWlHekM7OztBQUdBLGtCQXBHeUMsOEJBb0d0QjtBQUNqQixRQUFJLEtBQUssYUFBVCxFQUF3QjtBQUN0QixvQkFBYyxLQUFLLGFBQW5CO0FBQ0EsV0FBSyxhQUFMLEdBQXFCLElBQXJCO0FBQ0Q7QUFDRjtBQXpHd0MsQ0FBbEIsQ0FBekIiLCJmaWxlIjoiUmVhY3RBdWRpb1BsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERFRkFVTFRfTElTVEVOX0lOVEVSVkFMID0gMTAwMDA7XG5cbmNvbnN0IFJlYWN0QXVkaW9QbGF5ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IGF1ZGlvID0gdGhpcy5yZWZzLmF1ZGlvO1xuXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbkVycm9yICYmIHRoaXMucHJvcHMub25FcnJvcihlKTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gZW5vdWdoIG9mIHRoZSBmaWxlIGhhcyBkb3dubG9hZGVkIHRvIHN0YXJ0IHBsYXlpbmdcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgKGUpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25DYW5QbGF5ICYmIHRoaXMucHJvcHMub25DYW5QbGF5KGUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiBlbm91Z2ggb2YgdGhlIGZpbGUgaGFzIGRvd25sb2FkZWQgdG8gcGxheSB0aGUgZW50aXJlIGZpbGVcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIChlKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2FuUGxheVRocm91Z2ggJiYgdGhpcy5wcm9wcy5vbkNhblBsYXlUaHJvdWdoKGUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiBhdWRpbyBwbGF5IHN0YXJ0c1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCAoZSkgPT4ge1xuICAgICAgdGhpcy5zZXRMaXN0ZW5UcmFjaygpO1xuICAgICAgdGhpcy5wcm9wcy5vblBsYXkgJiYgdGhpcy5wcm9wcy5vblBsYXkoZSk7XG4gICAgfSk7XG5cbiAgICAvLyBXaGVuIHVubG9hZGluZyB0aGUgYXVkaW8gcGxheWVyIChzd2l0Y2hpbmcgdG8gYW5vdGhlciBzcmMpXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5jbGVhckxpc3RlblRyYWNrKCk7XG4gICAgICB0aGlzLnByb3BzLm9uQWJvcnQgJiYgdGhpcy5wcm9wcy5vbkFib3J0KGUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiB0aGUgZmlsZSBoYXMgZmluaXNoZWQgcGxheWluZyB0byB0aGUgZW5kXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5jbGVhckxpc3RlblRyYWNrKCk7XG4gICAgICB0aGlzLnByb3BzLm9uRW5kICYmIHRoaXMucHJvcHMub25FbmQoZSk7XG4gICAgfSk7XG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIHBhdXNlcyBwbGF5YmFja1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgKGUpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJMaXN0ZW5UcmFjaygpO1xuICAgICAgdGhpcy5wcm9wcy5vblBhdXNlICYmIHRoaXMucHJvcHMub25QYXVzZShlKTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgZHJhZ3MgdGhlIHRpbWUgaW5kaWNhdG9yIHRvIGEgbmV3IHRpbWVcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdzZWVrZWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5jbGVhckxpc3RlblRyYWNrKCk7XG4gICAgICB0aGlzLnByb3BzLm9uU2Vla2VkICYmIHRoaXMucHJvcHMub25TZWVrZWQoZSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBcbiAgICBpZiAobmV4dFByb3BzLnNyYyA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgYXVkaW8gPSB0aGlzLnJlZnMuYXVkaW87XG4gICAgICBjb25zb2xlLmxvZyhhdWRpbyk7XG4gICAgICBhdWRpby5zcmMgPSAnJztcbiAgICB9XG5cbiAgICBpZiAobmV4dFByb3BzLnNlbGVjdGVkUGxheWVyRXZlbnQpIHtcbiAgICAgIGNvbnN0IGF1ZGlvID0gdGhpcy5yZWZzLmF1ZGlvO1xuXG4gICAgICBhdWRpby5jdXJyZW50VGltZSA9IG5leHRQcm9wcy5zZWxlY3RlZFBsYXllckV2ZW50LnBsYXlUaW1lO1xuICAgICAgYXVkaW8ucGxheSgpO1xuICAgIH1cbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgaW5jb21wYXRpYmlsaXR5TWVzc2FnZSA9IHRoaXMucHJvcHMuY2hpbGRyZW4gfHwgKFxuICAgICAgPHA+WW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIDxjb2RlPmF1ZGlvPC9jb2RlPiBlbGVtZW50LjwvcD5cbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxhdWRpb1xuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1hdWRpby1wbGF5ZXJcIlxuICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICBhdXRvUGxheT17dGhpcy5wcm9wcy5hdXRvUGxheX1cbiAgICAgICAgcHJlbG9hZD17dGhpcy5wcm9wcy5wcmVsb2FkfVxuICAgICAgICBjb250cm9sc1xuICAgICAgICByZWY9XCJhdWRpb1wiXG4gICAgICAgIG9uUGxheT17dGhpcy5vblBsYXl9XG4gICAgICA+XG4gICAgICAgIHtpbmNvbXBhdGliaWxpdHlNZXNzYWdlfVxuICAgICAgPC9hdWRpbz5cbiAgICApO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXQgYW4gaW50ZXJ2YWwgdG8gY2FsbCBwcm9wcy5vbkxpc3RlbiBldmVyeSBwcm9wcy5saXN0ZW5JbnRlcnZhbCB0aW1lIHBlcmlvZFxuICAgKi9cbiAgc2V0TGlzdGVuVHJhY2soKSB7XG4gICAgaWYgKCF0aGlzLmxpc3RlblRyYWNrZXIpIHtcbiAgICAgIGNvbnN0IGxpc3RlbkludGVydmFsID0gdGhpcy5wcm9wcy5saXN0ZW5JbnRlcnZhbCB8fCBERUZBVUxUX0xJU1RFTl9JTlRFUlZBTDtcbiAgICAgIHRoaXMubGlzdGVuVHJhY2tlciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkxpc3RlbiAmJiB0aGlzLnByb3BzLm9uTGlzdGVuKHRoaXMucmVmcy5hdWRpby5jdXJyZW50VGltZSk7XG4gICAgICB9LCBsaXN0ZW5JbnRlcnZhbCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgb25MaXN0ZW4gaW50ZXJ2YWxcbiAgICovXG4gIGNsZWFyTGlzdGVuVHJhY2soKSB7XG4gICAgaWYgKHRoaXMubGlzdGVuVHJhY2tlcikge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmxpc3RlblRyYWNrZXIpO1xuICAgICAgdGhpcy5saXN0ZW5UcmFja2VyID0gbnVsbDtcbiAgICB9XG4gIH0sXG59KTtcblxuIl19