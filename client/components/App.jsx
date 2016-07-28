import React from 'react';
import PlayList from './PlayList.jsx';
import Main from './Main.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: window.songs,
      selectedSong: window.songs[0],
      score: 100,
      userInput: false,
      playSong: false
    };
  }
  componentDidMount() {
    var socket = io('http://localhost:8000');
    var status = this.state;
    var that = this;
    var playSong = this.songPlay.bind(this);
    var pauseSong = this.songPause.bind(this);
    var stopSong = this.songStop.bind(this);

    socket.on('songClick', function(data) {
      var title = data.id;
      status.songs.forEach(function(song, index) {
        if (song.title === title) {
          that.setState({
            selectedSong: that.state.songs[index]
          });
        }

        if (title === 'Your Voice') {
          that.setState({
            userInput: true
          });
        } else {
          that.setState({
            userInput: false
          });
        }
      });
    });

    socket.on('onPlay', function(event) {
      playSong(event);
    });
    socket.on('paused', function(event) {
      pauseSong(event);
    })
    socket.on('stopped', function(event) {
      console.log('client stop song listener!')
      stopSong(event);
    })
  }

  songClick(event) {
    var socket = io('http://localhost:8000');
    socket.emit('songClicked', {id: event.target.textContent})
  }

  onPlay(event) {
    var socket = io('http://localhost:8000');
    socket.emit('onPlay', event);
    this.songPlay(event);
  }

  songPlay(event) {
    var vocals = document.getElementById('vocals');
    var karaoke = document.getElementById('karaoke');
    if (vocals) {
      vocals.play(); karaoke.play();
    } else {
      karaoke.play();
    }
    this.setState({playSong: true});
  }
  onPause(event) {
    var socket = io('http://localhost:8000');
    socket.emit('paused', event);
    this.songPause(event);
  }

  songPause(event) {
    var vocals = document.getElementById('vocals');
    var karaoke = document.getElementById('karaoke');

    if (vocals) {
      vocals.pause(); karaoke.pause();
    } else {
      karaoke.pause();
    }
    this.setState({playSong: false});
  }
  onStop(event) {
    console.log('emitted song stopped!')
    var socket = io('http://localhost:8000');
    socket.emit('stopped', event);
    this.songStop(event);
  }

  songStop(event) {
    console.log('stopping song!')
    var vocals = document.getElementById('vocals');
    var karaoke = document.getElementById('karaoke');

    if (vocals) {
      vocals.pause(); karaoke.pause();
      vocals.currentTime = 0;
      karaoke.currentTime = 0;
    } else {
      karaoke.pause();
      karaoke.currentTime = 0;
    }
    this.setState({playSong: false});
  }

  onKaraokeVolumeChange(event) {
    var karaoke = document.getElementById('karaoke');
    karaoke.volume = event.target.value;
  }

  onVocalsVolumeChange(event) {
    console.log('changing volume on vocals!!!');
    var vocals = document.getElementById('vocals');
    if (vocals) {
      vocals.volume = event.target.value;
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col l2">
          <PlayList songs={this.state.songs} onChooseSongClick={this.songClick.bind(this)} selectedSong={this.state.selectedSong}/>
        </div>
        <div className="col l10" style={{background: 'url(' + this.state.selectedSong.background + ') center / cover', height: '720px' }} >
          <Main selectedSong={this.state.selectedSong}
                score={this.state.score}
                userInput={this.state.userInput}
                onPlay={this.onPlay.bind(this)}
                onPause={this.onPause.bind(this)}
                onStop={this.onStop.bind(this)}
                KaraokeVolumeChange={this.onKaraokeVolumeChange.bind(this)}
                onVocalsVolumeChange={this.onVocalsVolumeChange}
                playSong={this.state.playSong}
                />
        </div>
      </div>
    );
  }
}

// window.App = App;
