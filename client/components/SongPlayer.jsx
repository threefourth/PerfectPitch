class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var audioPlayer;
    if (this.props.selectedVocals) {
      audioPlayer = <div><ReactAudioPlayer id={'karaoke'}
            src={this.props.selectedAudio}
            autoPlay="false"
          />
          <ReactAudioPlayer id={'vocals'}
            src={this.props.selectedVocals}
            autoPlay="false"
            volume={'0.0'}
          /></div>
      return (
        <div>
          <PitchVisualizer audioPlayer={audioPlayer} score={this.props.score}/>
        </div>)
    } else {
      audioPlayer = <div><ReactAudioPlayer id={'karaoke'}
          src={this.props.selectedAudio}
          autoPlay="false"
        /></div>
      return (
        <div>
          <PitchVisualizer audioPlayer={audioPlayer} score={this.props.score}/>
        </div>)
    }    
  }
};

window.SongPlayer = SongPlayer;