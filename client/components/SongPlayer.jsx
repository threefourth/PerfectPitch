var SongPlayer = (props) => (
  <div>
    <div id="graph">
    </div>
  <ReactAudioPlayer
    src={props.selectedAudio}
    autoPlay="false"
  />
  </div>
);

window.SongPlayer = SongPlayer;