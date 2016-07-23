var SongPlayer = (props) => (
  <div>
    <PitchVisualizer />
    <ReactAudioPlayer id={'vocals'}
      src={props.selectedVocals}
      autoPlay="false"
    />
    <ReactAudioPlayer id={'karaoke'}
      src={props.selectedAudio}
      autoPlay="false"
    />
  </div>
);

window.SongPlayer = SongPlayer;