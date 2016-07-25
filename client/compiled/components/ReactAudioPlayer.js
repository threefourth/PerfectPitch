'use strict';

var DEFAULT_LISTEN_INTERVAL = 10000;

var ReactAudioPlayer = React.createClass({
  displayName: 'ReactAudioPlayer',
  componentDidMount: function componentDidMount() {
    var _this = this;

    var audio = this.refs.audio;
    if (this.props.volume) {
      audio.volume = this.props.volume;
    }

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
      console.log('Song is over');
      // Stop pitch detection/visualization
      clearInterval(updatePitchID);
      clearInterval(drawUserGraphID);

      // Stop getting user audio input
      if (localStream) {
        localStream.getAudioTracks()[0].stop(0);
      }

      localStream = null;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUmVhY3RBdWRpb1BsYXllci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLDBCQUEwQixLQUFoQzs7QUFFQSxJQUFNLG1CQUFtQixNQUFNLFdBQU4sQ0FBa0I7QUFBQTtBQUN6QyxtQkFEeUMsK0JBQ3JCO0FBQUE7O0FBQ2xCLFFBQU0sUUFBUSxLQUFLLElBQUwsQ0FBVSxLQUF4QjtBQUNBLFFBQUksS0FBSyxLQUFMLENBQVcsTUFBZixFQUF1QjtBQUNyQixZQUFNLE1BQU4sR0FBZSxLQUFLLEtBQUwsQ0FBVyxNQUExQjtBQUNEOztBQUVELFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQyxDQUFELEVBQU87QUFDckMsWUFBSyxLQUFMLENBQVcsT0FBWCxJQUFzQixNQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLENBQW5CLENBQXRCO0FBQ0QsS0FGRDs7QUFJQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsU0FBdkIsRUFBa0MsVUFBQyxDQUFELEVBQU87QUFDdkMsWUFBSyxLQUFMLENBQVcsU0FBWCxJQUF3QixNQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLENBQXJCLENBQXhCO0FBQ0QsS0FGRDs7QUFJQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsZ0JBQXZCLEVBQXlDLFVBQUMsQ0FBRCxFQUFPO0FBQzlDLFlBQUssS0FBTCxDQUFXLGdCQUFYLElBQStCLE1BQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLENBQTVCLENBQS9CO0FBQ0QsS0FGRDs7QUFJQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsTUFBdkIsRUFBK0IsVUFBQyxDQUFELEVBQU87QUFDcEMsWUFBSyxjQUFMO0FBQ0EsWUFBSyxLQUFMLENBQVcsTUFBWCxJQUFxQixNQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQWxCLENBQXJCO0FBQ0QsS0FIRDs7QUFLQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQyxDQUFELEVBQU87QUFDckMsWUFBSyxnQkFBTDtBQUNBLFlBQUssS0FBTCxDQUFXLE9BQVgsSUFBc0IsTUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixDQUFuQixDQUF0QjtBQUNELEtBSEQ7O0FBS0E7QUFDQSxVQUFNLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUMsQ0FBRCxFQUFPO0FBQ3JDLGNBQVEsR0FBUixDQUFZLGNBQVo7QUFDQTtBQUNBLG9CQUFlLGFBQWY7QUFDQSxvQkFBZSxlQUFmOztBQUVBO0FBQ0EsVUFBSSxXQUFKLEVBQWlCO0FBQ2Ysb0JBQVksY0FBWixHQUE2QixDQUE3QixFQUFnQyxJQUFoQyxDQUFzQyxDQUF0QztBQUNEOztBQUVILG9CQUFjLElBQWQ7O0FBRUUsWUFBSyxnQkFBTDtBQUNBLFlBQUssS0FBTCxDQUFXLEtBQVgsSUFBb0IsTUFBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixDQUFqQixDQUFwQjtBQUNELEtBZkQ7O0FBaUJBO0FBQ0EsVUFBTSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDLENBQUQsRUFBTztBQUNyQyxZQUFLLGdCQUFMO0FBQ0EsWUFBSyxLQUFMLENBQVcsT0FBWCxJQUFzQixNQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLENBQW5CLENBQXRCO0FBQ0QsS0FIRDs7QUFLQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsUUFBdkIsRUFBaUMsVUFBQyxDQUFELEVBQU87QUFDdEMsWUFBSyxnQkFBTDtBQUNBLFlBQUssS0FBTCxDQUFXLFFBQVgsSUFBdUIsTUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixDQUFwQixDQUF2QjtBQUNELEtBSEQ7QUFJRCxHQTlEd0M7QUFnRXpDLDJCQWhFeUMscUNBZ0VmLFNBaEVlLEVBZ0VKOztBQUVuQyxRQUFJLFVBQVUsR0FBVixLQUFrQixJQUF0QixFQUE0QjtBQUMxQixVQUFNLFFBQVEsS0FBSyxJQUFMLENBQVUsS0FBeEI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsWUFBTSxHQUFOLEdBQVksRUFBWjtBQUNEOztBQUVELFFBQUksVUFBVSxtQkFBZCxFQUFtQztBQUNqQyxVQUFNLFNBQVEsS0FBSyxJQUFMLENBQVUsS0FBeEI7O0FBRUEsYUFBTSxXQUFOLEdBQW9CLFVBQVUsbUJBQVYsQ0FBOEIsUUFBbEQ7QUFDQSxhQUFNLElBQU47QUFDRDtBQUNGLEdBOUV3QztBQWdGekMsUUFoRnlDLG9CQWdGaEM7QUFDUCxRQUFNLHlCQUF5QixLQUFLLEtBQUwsQ0FBVyxRQUFYLElBQzdCO0FBQUE7QUFBQTtBQUFBO0FBQXFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBckM7QUFBQTtBQUFBLEtBREY7O0FBSUEsV0FDRTtBQUFBO0FBQUE7QUFDRSxtQkFBVSxvQkFEWjtBQUVFLFlBQUksS0FBSyxLQUFMLENBQVcsRUFGakI7QUFHRSxhQUFLLEtBQUssS0FBTCxDQUFXLEdBSGxCO0FBSUUsa0JBQVUsS0FBSyxLQUFMLENBQVcsUUFKdkI7QUFLRSxpQkFBUyxLQUFLLEtBQUwsQ0FBVyxPQUx0QjtBQU1FLHNCQU5GO0FBT0UsYUFBSSxPQVBOO0FBUUUsZ0JBQVEsS0FBSztBQVJmO0FBVUc7QUFWSCxLQURGO0FBY0QsR0FuR3dDOzs7QUFxR3pDOzs7QUFHQSxnQkF4R3lDLDRCQXdHeEI7QUFBQTs7QUFDZixRQUFJLENBQUMsS0FBSyxhQUFWLEVBQXlCO0FBQ3ZCLFVBQU0saUJBQWlCLEtBQUssS0FBTCxDQUFXLGNBQVgsSUFBNkIsdUJBQXBEO0FBQ0EsV0FBSyxhQUFMLEdBQXFCLFlBQVksWUFBTTtBQUNyQyxlQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsT0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixXQUFwQyxDQUF2QjtBQUNELE9BRm9CLEVBRWxCLGNBRmtCLENBQXJCO0FBR0Q7QUFDRixHQS9Hd0M7OztBQWlIekM7OztBQUdBLGtCQXBIeUMsOEJBb0h0QjtBQUNqQixRQUFJLEtBQUssYUFBVCxFQUF3QjtBQUN0QixvQkFBYyxLQUFLLGFBQW5CO0FBQ0EsV0FBSyxhQUFMLEdBQXFCLElBQXJCO0FBQ0Q7QUFDRjtBQXpId0MsQ0FBbEIsQ0FBekIiLCJmaWxlIjoiUmVhY3RBdWRpb1BsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERFRkFVTFRfTElTVEVOX0lOVEVSVkFMID0gMTAwMDA7XG5cbmNvbnN0IFJlYWN0QXVkaW9QbGF5ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IGF1ZGlvID0gdGhpcy5yZWZzLmF1ZGlvO1xuICAgIGlmICh0aGlzLnByb3BzLnZvbHVtZSkge1xuICAgICAgYXVkaW8udm9sdW1lID0gdGhpcy5wcm9wcy52b2x1bWU7XG4gICAgfVxuXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbkVycm9yICYmIHRoaXMucHJvcHMub25FcnJvcihlKTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gZW5vdWdoIG9mIHRoZSBmaWxlIGhhcyBkb3dubG9hZGVkIHRvIHN0YXJ0IHBsYXlpbmdcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgKGUpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25DYW5QbGF5ICYmIHRoaXMucHJvcHMub25DYW5QbGF5KGUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiBlbm91Z2ggb2YgdGhlIGZpbGUgaGFzIGRvd25sb2FkZWQgdG8gcGxheSB0aGUgZW50aXJlIGZpbGVcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIChlKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2FuUGxheVRocm91Z2ggJiYgdGhpcy5wcm9wcy5vbkNhblBsYXlUaHJvdWdoKGUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiBhdWRpbyBwbGF5IHN0YXJ0c1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCAoZSkgPT4ge1xuICAgICAgdGhpcy5zZXRMaXN0ZW5UcmFjaygpO1xuICAgICAgdGhpcy5wcm9wcy5vblBsYXkgJiYgdGhpcy5wcm9wcy5vblBsYXkoZSk7XG4gICAgfSk7XG5cbiAgICAvLyBXaGVuIHVubG9hZGluZyB0aGUgYXVkaW8gcGxheWVyIChzd2l0Y2hpbmcgdG8gYW5vdGhlciBzcmMpXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5jbGVhckxpc3RlblRyYWNrKCk7XG4gICAgICB0aGlzLnByb3BzLm9uQWJvcnQgJiYgdGhpcy5wcm9wcy5vbkFib3J0KGUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiB0aGUgZmlsZSBoYXMgZmluaXNoZWQgcGxheWluZyB0byB0aGUgZW5kXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1NvbmcgaXMgb3ZlcicpO1xuICAgICAgLy8gU3RvcCBwaXRjaCBkZXRlY3Rpb24vdmlzdWFsaXphdGlvblxuICAgICAgY2xlYXJJbnRlcnZhbCggdXBkYXRlUGl0Y2hJRCApO1xuICAgICAgY2xlYXJJbnRlcnZhbCggZHJhd1VzZXJHcmFwaElEICk7XG5cbiAgICAgIC8vIFN0b3AgZ2V0dGluZyB1c2VyIGF1ZGlvIGlucHV0XG4gICAgICBpZiAobG9jYWxTdHJlYW0pIHtcbiAgICAgICAgbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXS5zdG9wKCAwICk7XG4gICAgICB9XG4gICAgXG4gICAgbG9jYWxTdHJlYW0gPSBudWxsO1xuXG4gICAgICB0aGlzLmNsZWFyTGlzdGVuVHJhY2soKTtcbiAgICAgIHRoaXMucHJvcHMub25FbmQgJiYgdGhpcy5wcm9wcy5vbkVuZChlKTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgcGF1c2VzIHBsYXliYWNrXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5jbGVhckxpc3RlblRyYWNrKCk7XG4gICAgICB0aGlzLnByb3BzLm9uUGF1c2UgJiYgdGhpcy5wcm9wcy5vblBhdXNlKGUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBkcmFncyB0aGUgdGltZSBpbmRpY2F0b3IgdG8gYSBuZXcgdGltZVxuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3NlZWtlZCcsIChlKSA9PiB7XG4gICAgICB0aGlzLmNsZWFyTGlzdGVuVHJhY2soKTtcbiAgICAgIHRoaXMucHJvcHMub25TZWVrZWQgJiYgdGhpcy5wcm9wcy5vblNlZWtlZChlKTtcbiAgICB9KTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIFxuICAgIGlmIChuZXh0UHJvcHMuc3JjID09PSBudWxsKSB7XG4gICAgICBjb25zdCBhdWRpbyA9IHRoaXMucmVmcy5hdWRpbztcbiAgICAgIGNvbnNvbGUubG9nKGF1ZGlvKTtcbiAgICAgIGF1ZGlvLnNyYyA9ICcnO1xuICAgIH1cblxuICAgIGlmIChuZXh0UHJvcHMuc2VsZWN0ZWRQbGF5ZXJFdmVudCkge1xuICAgICAgY29uc3QgYXVkaW8gPSB0aGlzLnJlZnMuYXVkaW87XG5cbiAgICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gbmV4dFByb3BzLnNlbGVjdGVkUGxheWVyRXZlbnQucGxheVRpbWU7XG4gICAgICBhdWRpby5wbGF5KCk7XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBpbmNvbXBhdGliaWxpdHlNZXNzYWdlID0gdGhpcy5wcm9wcy5jaGlsZHJlbiB8fCAoXG4gICAgICA8cD5Zb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgPGNvZGU+YXVkaW88L2NvZGU+IGVsZW1lbnQuPC9wPlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGF1ZGlvXG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LWF1ZGlvLXBsYXllclwiXG4gICAgICAgIGlkPXt0aGlzLnByb3BzLmlkfVxuICAgICAgICBzcmM9e3RoaXMucHJvcHMuc3JjfVxuICAgICAgICBhdXRvUGxheT17dGhpcy5wcm9wcy5hdXRvUGxheX1cbiAgICAgICAgcHJlbG9hZD17dGhpcy5wcm9wcy5wcmVsb2FkfVxuICAgICAgICBjb250cm9sc1xuICAgICAgICByZWY9XCJhdWRpb1wiXG4gICAgICAgIG9uUGxheT17dGhpcy5vblBsYXl9XG4gICAgICA+XG4gICAgICAgIHtpbmNvbXBhdGliaWxpdHlNZXNzYWdlfVxuICAgICAgPC9hdWRpbz5cbiAgICApO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXQgYW4gaW50ZXJ2YWwgdG8gY2FsbCBwcm9wcy5vbkxpc3RlbiBldmVyeSBwcm9wcy5saXN0ZW5JbnRlcnZhbCB0aW1lIHBlcmlvZFxuICAgKi9cbiAgc2V0TGlzdGVuVHJhY2soKSB7XG4gICAgaWYgKCF0aGlzLmxpc3RlblRyYWNrZXIpIHtcbiAgICAgIGNvbnN0IGxpc3RlbkludGVydmFsID0gdGhpcy5wcm9wcy5saXN0ZW5JbnRlcnZhbCB8fCBERUZBVUxUX0xJU1RFTl9JTlRFUlZBTDtcbiAgICAgIHRoaXMubGlzdGVuVHJhY2tlciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkxpc3RlbiAmJiB0aGlzLnByb3BzLm9uTGlzdGVuKHRoaXMucmVmcy5hdWRpby5jdXJyZW50VGltZSk7XG4gICAgICB9LCBsaXN0ZW5JbnRlcnZhbCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgb25MaXN0ZW4gaW50ZXJ2YWxcbiAgICovXG4gIGNsZWFyTGlzdGVuVHJhY2soKSB7XG4gICAgaWYgKHRoaXMubGlzdGVuVHJhY2tlcikge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmxpc3RlblRyYWNrZXIpO1xuICAgICAgdGhpcy5saXN0ZW5UcmFja2VyID0gbnVsbDtcbiAgICB9XG4gIH0sXG59KTtcblxuIl19