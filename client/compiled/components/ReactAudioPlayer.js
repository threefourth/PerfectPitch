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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUmVhY3RBdWRpb1BsYXllci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLDBCQUEwQixLQUFoQzs7QUFFQSxJQUFNLG1CQUFtQixNQUFNLFdBQU4sQ0FBa0I7QUFBQTtBQUN6QyxtQkFEeUMsK0JBQ3JCO0FBQUE7O0FBQ2xCLFFBQU0sUUFBUSxLQUFLLElBQUwsQ0FBVSxLQUF4QjtBQUNBLFFBQUksS0FBSyxLQUFMLENBQVcsTUFBZixFQUF1QjtBQUNyQixZQUFNLE1BQU4sR0FBZSxLQUFLLEtBQUwsQ0FBVyxNQUExQjtBQUNEOztBQUVELFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQyxDQUFELEVBQU87QUFDckMsWUFBSyxLQUFMLENBQVcsT0FBWCxJQUFzQixNQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLENBQW5CLENBQXRCO0FBQ0QsS0FGRDs7QUFJQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsU0FBdkIsRUFBa0MsVUFBQyxDQUFELEVBQU87QUFDdkMsWUFBSyxLQUFMLENBQVcsU0FBWCxJQUF3QixNQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLENBQXJCLENBQXhCO0FBQ0QsS0FGRDs7QUFJQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsZ0JBQXZCLEVBQXlDLFVBQUMsQ0FBRCxFQUFPO0FBQzlDLFlBQUssS0FBTCxDQUFXLGdCQUFYLElBQStCLE1BQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLENBQTVCLENBQS9CO0FBQ0QsS0FGRDs7QUFJQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsTUFBdkIsRUFBK0IsVUFBQyxDQUFELEVBQU87QUFDcEMsWUFBSyxjQUFMO0FBQ0EsWUFBSyxLQUFMLENBQVcsTUFBWCxJQUFxQixNQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQWxCLENBQXJCO0FBQ0QsS0FIRDs7QUFLQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQyxDQUFELEVBQU87QUFDckMsWUFBSyxnQkFBTDtBQUNBLFlBQUssS0FBTCxDQUFXLE9BQVgsSUFBc0IsTUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixDQUFuQixDQUF0QjtBQUNELEtBSEQ7O0FBS0E7QUFDQSxVQUFNLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUMsQ0FBRCxFQUFPO0FBQ3JDLFlBQUssZ0JBQUw7QUFDQSxZQUFLLEtBQUwsQ0FBVyxLQUFYLElBQW9CLE1BQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsQ0FBakIsQ0FBcEI7QUFDRCxLQUhEOztBQUtBO0FBQ0EsVUFBTSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDLENBQUQsRUFBTztBQUNyQyxZQUFLLGdCQUFMO0FBQ0EsWUFBSyxLQUFMLENBQVcsT0FBWCxJQUFzQixNQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLENBQW5CLENBQXRCO0FBQ0QsS0FIRDs7QUFLQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsUUFBdkIsRUFBaUMsVUFBQyxDQUFELEVBQU87QUFDdEMsWUFBSyxnQkFBTDtBQUNBLFlBQUssS0FBTCxDQUFXLFFBQVgsSUFBdUIsTUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixDQUFwQixDQUF2QjtBQUNELEtBSEQ7QUFJRCxHQWxEd0M7QUFvRHpDLDJCQXBEeUMscUNBb0RmLFNBcERlLEVBb0RKOztBQUVuQyxRQUFJLFVBQVUsR0FBVixLQUFrQixJQUF0QixFQUE0QjtBQUMxQixVQUFNLFFBQVEsS0FBSyxJQUFMLENBQVUsS0FBeEI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsWUFBTSxHQUFOLEdBQVksRUFBWjtBQUNEOztBQUVELFFBQUksVUFBVSxtQkFBZCxFQUFtQztBQUNqQyxVQUFNLFNBQVEsS0FBSyxJQUFMLENBQVUsS0FBeEI7O0FBRUEsYUFBTSxXQUFOLEdBQW9CLFVBQVUsbUJBQVYsQ0FBOEIsUUFBbEQ7QUFDQSxhQUFNLElBQU47QUFDRDtBQUNGLEdBbEV3QztBQW9FekMsUUFwRXlDLG9CQW9FaEM7QUFDUCxRQUFNLHlCQUF5QixLQUFLLEtBQUwsQ0FBVyxRQUFYLElBQzdCO0FBQUE7QUFBQTtBQUFBO0FBQXFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBckM7QUFBQTtBQUFBLEtBREY7O0FBSUEsV0FDRTtBQUFBO0FBQUE7QUFDRSxtQkFBVSxvQkFEWjtBQUVFLFlBQUksS0FBSyxLQUFMLENBQVcsRUFGakI7QUFHRSxhQUFLLEtBQUssS0FBTCxDQUFXLEdBSGxCO0FBSUUsa0JBQVUsS0FBSyxLQUFMLENBQVcsUUFKdkI7QUFLRSxpQkFBUyxLQUFLLEtBQUwsQ0FBVyxPQUx0QjtBQU1FLHNCQU5GO0FBT0UsYUFBSSxPQVBOO0FBUUUsZ0JBQVEsS0FBSztBQVJmO0FBVUc7QUFWSCxLQURGO0FBY0QsR0F2RndDOzs7QUF5RnpDOzs7QUFHQSxnQkE1RnlDLDRCQTRGeEI7QUFBQTs7QUFDZixRQUFJLENBQUMsS0FBSyxhQUFWLEVBQXlCO0FBQ3ZCLFVBQU0saUJBQWlCLEtBQUssS0FBTCxDQUFXLGNBQVgsSUFBNkIsdUJBQXBEO0FBQ0EsV0FBSyxhQUFMLEdBQXFCLFlBQVksWUFBTTtBQUNyQyxlQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsT0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixXQUFwQyxDQUF2QjtBQUNELE9BRm9CLEVBRWxCLGNBRmtCLENBQXJCO0FBR0Q7QUFDRixHQW5Hd0M7OztBQXFHekM7OztBQUdBLGtCQXhHeUMsOEJBd0d0QjtBQUNqQixRQUFJLEtBQUssYUFBVCxFQUF3QjtBQUN0QixvQkFBYyxLQUFLLGFBQW5CO0FBQ0EsV0FBSyxhQUFMLEdBQXFCLElBQXJCO0FBQ0Q7QUFDRjtBQTdHd0MsQ0FBbEIsQ0FBekIiLCJmaWxlIjoiUmVhY3RBdWRpb1BsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERFRkFVTFRfTElTVEVOX0lOVEVSVkFMID0gMTAwMDA7XG5cbmNvbnN0IFJlYWN0QXVkaW9QbGF5ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IGF1ZGlvID0gdGhpcy5yZWZzLmF1ZGlvO1xuICAgIGlmICh0aGlzLnByb3BzLnZvbHVtZSkge1xuICAgICAgYXVkaW8udm9sdW1lID0gdGhpcy5wcm9wcy52b2x1bWU7XG4gICAgfVxuXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vbkVycm9yICYmIHRoaXMucHJvcHMub25FcnJvcihlKTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gZW5vdWdoIG9mIHRoZSBmaWxlIGhhcyBkb3dubG9hZGVkIHRvIHN0YXJ0IHBsYXlpbmdcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgKGUpID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25DYW5QbGF5ICYmIHRoaXMucHJvcHMub25DYW5QbGF5KGUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiBlbm91Z2ggb2YgdGhlIGZpbGUgaGFzIGRvd25sb2FkZWQgdG8gcGxheSB0aGUgZW50aXJlIGZpbGVcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIChlKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2FuUGxheVRocm91Z2ggJiYgdGhpcy5wcm9wcy5vbkNhblBsYXlUaHJvdWdoKGUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiBhdWRpbyBwbGF5IHN0YXJ0c1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCAoZSkgPT4ge1xuICAgICAgdGhpcy5zZXRMaXN0ZW5UcmFjaygpO1xuICAgICAgdGhpcy5wcm9wcy5vblBsYXkgJiYgdGhpcy5wcm9wcy5vblBsYXkoZSk7XG4gICAgfSk7XG5cbiAgICAvLyBXaGVuIHVubG9hZGluZyB0aGUgYXVkaW8gcGxheWVyIChzd2l0Y2hpbmcgdG8gYW5vdGhlciBzcmMpXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5jbGVhckxpc3RlblRyYWNrKCk7XG4gICAgICB0aGlzLnByb3BzLm9uQWJvcnQgJiYgdGhpcy5wcm9wcy5vbkFib3J0KGUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiB0aGUgZmlsZSBoYXMgZmluaXNoZWQgcGxheWluZyB0byB0aGUgZW5kXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5jbGVhckxpc3RlblRyYWNrKCk7XG4gICAgICB0aGlzLnByb3BzLm9uRW5kICYmIHRoaXMucHJvcHMub25FbmQoZSk7XG4gICAgfSk7XG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIHBhdXNlcyBwbGF5YmFja1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgKGUpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJMaXN0ZW5UcmFjaygpO1xuICAgICAgdGhpcy5wcm9wcy5vblBhdXNlICYmIHRoaXMucHJvcHMub25QYXVzZShlKTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgZHJhZ3MgdGhlIHRpbWUgaW5kaWNhdG9yIHRvIGEgbmV3IHRpbWVcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdzZWVrZWQnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5jbGVhckxpc3RlblRyYWNrKCk7XG4gICAgICB0aGlzLnByb3BzLm9uU2Vla2VkICYmIHRoaXMucHJvcHMub25TZWVrZWQoZSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBcbiAgICBpZiAobmV4dFByb3BzLnNyYyA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgYXVkaW8gPSB0aGlzLnJlZnMuYXVkaW87XG4gICAgICBjb25zb2xlLmxvZyhhdWRpbyk7XG4gICAgICBhdWRpby5zcmMgPSAnJztcbiAgICB9XG5cbiAgICBpZiAobmV4dFByb3BzLnNlbGVjdGVkUGxheWVyRXZlbnQpIHtcbiAgICAgIGNvbnN0IGF1ZGlvID0gdGhpcy5yZWZzLmF1ZGlvO1xuXG4gICAgICBhdWRpby5jdXJyZW50VGltZSA9IG5leHRQcm9wcy5zZWxlY3RlZFBsYXllckV2ZW50LnBsYXlUaW1lO1xuICAgICAgYXVkaW8ucGxheSgpO1xuICAgIH1cbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgaW5jb21wYXRpYmlsaXR5TWVzc2FnZSA9IHRoaXMucHJvcHMuY2hpbGRyZW4gfHwgKFxuICAgICAgPHA+WW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIDxjb2RlPmF1ZGlvPC9jb2RlPiBlbGVtZW50LjwvcD5cbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxhdWRpb1xuICAgICAgICBjbGFzc05hbWU9XCJyZWFjdC1hdWRpby1wbGF5ZXJcIlxuICAgICAgICBpZD17dGhpcy5wcm9wcy5pZH1cbiAgICAgICAgc3JjPXt0aGlzLnByb3BzLnNyY31cbiAgICAgICAgYXV0b1BsYXk9e3RoaXMucHJvcHMuYXV0b1BsYXl9XG4gICAgICAgIHByZWxvYWQ9e3RoaXMucHJvcHMucHJlbG9hZH1cbiAgICAgICAgY29udHJvbHNcbiAgICAgICAgcmVmPVwiYXVkaW9cIlxuICAgICAgICBvblBsYXk9e3RoaXMub25QbGF5fVxuICAgICAgPlxuICAgICAgICB7aW5jb21wYXRpYmlsaXR5TWVzc2FnZX1cbiAgICAgIDwvYXVkaW8+XG4gICAgKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0IGFuIGludGVydmFsIHRvIGNhbGwgcHJvcHMub25MaXN0ZW4gZXZlcnkgcHJvcHMubGlzdGVuSW50ZXJ2YWwgdGltZSBwZXJpb2RcbiAgICovXG4gIHNldExpc3RlblRyYWNrKCkge1xuICAgIGlmICghdGhpcy5saXN0ZW5UcmFja2VyKSB7XG4gICAgICBjb25zdCBsaXN0ZW5JbnRlcnZhbCA9IHRoaXMucHJvcHMubGlzdGVuSW50ZXJ2YWwgfHwgREVGQVVMVF9MSVNURU5fSU5URVJWQUw7XG4gICAgICB0aGlzLmxpc3RlblRyYWNrZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25MaXN0ZW4gJiYgdGhpcy5wcm9wcy5vbkxpc3Rlbih0aGlzLnJlZnMuYXVkaW8uY3VycmVudFRpbWUpO1xuICAgICAgfSwgbGlzdGVuSW50ZXJ2YWwpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQ2xlYXIgdGhlIG9uTGlzdGVuIGludGVydmFsXG4gICAqL1xuICBjbGVhckxpc3RlblRyYWNrKCkge1xuICAgIGlmICh0aGlzLmxpc3RlblRyYWNrZXIpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5saXN0ZW5UcmFja2VyKTtcbiAgICAgIHRoaXMubGlzdGVuVHJhY2tlciA9IG51bGw7XG4gICAgfVxuICB9LFxufSk7XG5cbiJdfQ==