import React from 'react';
import SongPlayer from './SongPlayer.jsx';

export default class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
	  return (
	    <div>
	    <SongPlayer selectedAudio={this.props.selectedSong.audio}
	    						selectedVocals={this.props.selectedSong.vocals}
	    						selectedData={this.props.selectedSong.data}
	    						score={this.props.score}
	    						onPlay={this.props.onPlay}
	    						onPause={this.props.onPause}
	    						onStop={this.props.onStop}
	    						onKaraokeVolumeChange={this.props.onKaraokeVolumeChange}
	    						onVocalsVolumeChange={this.props.onVocalsVolumeChange}
	    						playSong={this.props.playSong}
                  socket={this.props.socket} 
                  />
	    </div>
	  );
	}
};

//export default Main;
// window.Main = Main;
