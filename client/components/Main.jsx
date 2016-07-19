var Main = (props) => (
  <div>
  <img id="background" src={props.selectedSong.background}></img>
  <SongPlayer selectedAudio={props.selectedSong.audio}/>
  </div>
);

window.Main = Main;