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
      playSong: false,
      socket: io('https://legacypitch.herokuapp.com/')
    };
  }
  componentDidMount() {
    console.log('this is user: ', this.props.user);
    var status = this.state;
    var that = this;
    var playSong = this.songPlay.bind(this);
    var pauseSong = this.songPause.bind(this);
    var stopSong = this.songStop.bind(this);

    status.socket.on('songClick', function(data) {
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

    status.socket.on('played', function(event) {
      playSong(event);
    });
    status.socket.on('paused', function(event) {
      pauseSong(event);
    })
    status.socket.on('stopped', function(event) {
      stopSong(event);
    })
  }

  songClick(event) {
    this.state.socket.emit('songClicked', {id: event.target.textContent});
  }

  onPlay(event) {
    console.log('onPlay is called');
    this.state.socket.emit('played', event);
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
    this.state.socket.emit('paused', event);
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
    console.log('in onStop ', event.score);
    if (this.props.user) {
      var userObj = {
        username: this.props.user.username,
        title: this.state.selectedSong.title,
        score: event.score
      }
    }
    var target = userObj || {};
    console.log('here in onStop: ', event);
    this.state.socket.emit('stopped', target);
    this.songStop(event);
  }

  songStop(event) {
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
                socket={this.state.socket}
                />
        </div>
      </div>
    );
  }
}

// window.App = App;
