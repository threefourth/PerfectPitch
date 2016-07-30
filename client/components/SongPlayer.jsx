import React from 'react';
import PitchVisualizer from './PitchVisualizer.jsx';
import ReactAudioPlayer from './ReactAudioPlayer.jsx';

export default class SongPlayer extends React.Component {
  constructor() {
    super();
  }

  render() {
    var audioPlayer;
    if (this.props.selectedVocals) {
      audioPlayer = <div><ReactAudioPlayer id={'karaoke'}
            src={this.props.selectedAudio}
          />
          <ReactAudioPlayer id={'vocals'}
            src={this.props.selectedVocals}
            volume={'0.0'}
          /></div>
      return (
        <div>
          <PitchVisualizer selectedData={this.props.selectedData}
                          audioPlayer={audioPlayer}
                          score={this.props.score}
                          onPlay={this.props.onPlay}
                          onPause={this.props.onPause}
                          onStop={this.props.onStop}
                          onKaraokeVolumeChange={this.props.onKaraokeVolumeChange}
                          onVocalsVolumeChange={this.props.onVocalsVolumeChange}
                          playSong={this.props.playSong}
                          />
        </div>)
    } else {
      audioPlayer = <div><ReactAudioPlayer id={'karaoke'}
          src={this.props.selectedAudio}
        /></div>
      return (
        <div>
          <PitchVisualizer selectedData={this.props.selectedData} audioPlayer={audioPlayer} score={this.props.score} onPlay={this.props.onPlay} onPause={this.props.onPause} onStop={this.props.onStop} onKaraokeVolumeChange={this.props.onKaraokeVolumeChange} onVocalsVolumeChange={this.props.onVocalsVolumeChange}/>
        </div>)
    }
  }
};
