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

    socket.on('songClick', function(data) {
      // this.onChooseSongClicks(data.id);
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
<<<<<<< 14633b7ca61cfec663d834c5954e68c88dba40cd
    var playSong = this.songPlay.bind(this);
    socket.on('onPlay', function(event){
      playSong(event);
    });
=======

    socket.on('play', function(data) {
      console.log('playing...')
      var vocals = document.getElementById('vocals');
      var karaoke = document.getElementById('karaoke');

      if (vocals) {
        vocals.play(); karaoke.play();
      } else {
        karaoke.play();
      }
    })
    socket.on('paused', function() {
      var vocals = document.getElementById('vocals');
      var karaoke = document.getElementById('karaoke');

      if (vocals) {
        vocals.pause(); karaoke.pause();
      } else {
        karaoke.pause();
      }
    })
>>>>>>> Play and Pause Sockets set up
  }
  songClick(event) {
    var socket = io('http://localhost:8000');
    console.dir(event.target.textContent);
    socket.emit('songClicked', {id: event.target.textContent});
  }

  onPlay(event) {
    var socket = io('http://localhost:8000');
<<<<<<< 14633b7ca61cfec663d834c5954e68c88dba40cd
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
=======
    socket.emit('play', {id: 'play'});
>>>>>>> Play and Pause Sockets set up
  }

  onPause(event) {
    var socket = io('http://localhost:8000');
    socket.emit('paused');
  }

  onStop(event) {
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
                playSong={this.state.playSong} />
        </div>
      </div>
    );
  }
}

// window.App = App;
