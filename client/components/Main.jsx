var Main = (props) => (
  <div>
  <img id="background" src={props.selectedSong.background}></img>
  <SongPlayer selectedAudio={props.selectedSong.audio}/>
  <ScoreBoard score={props.score}/>
  </div>
);

window.Main = Main;