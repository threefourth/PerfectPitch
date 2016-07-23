class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.selectedVocals) {
      return (
        <div>
          <PitchVisualizer />
          <ReactAudioPlayer id={'karaoke'}
            src={this.props.selectedAudio}
            autoPlay="false"
          />
          <ReactAudioPlayer id={'vocals'}
            src={this.props.selectedVocals}
            autoPlay="false"
            volume={'0.0'}
          />
        </div>)
    } else {
      return (
        <div>
          <PitchVisualizer />
          <ReactAudioPlayer id={'karaoke'}
            src={this.props.selectedAudio}
            autoPlay="false"
          />
        </div>)
    }    
  }
};

window.SongPlayer = SongPlayer;