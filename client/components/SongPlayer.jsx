var SongPlayer = (props) => (
  <div>
    <PitchVisualizer />
    <ReactAudioPlayer
      src={props.selectedAudio}
      autoPlay="false"
    />
  </div>
);

window.SongPlayer = SongPlayer;