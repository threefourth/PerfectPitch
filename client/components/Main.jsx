var Main = (props) => {

  var typeVisual;
  if (!props.userInput) {
    console.log('Displaying music video for song');
    typeVisual = <SongPlayer selectedAudio={props.selectedSong.audio}/>;
  } else {
    console.log('Displaying pitch visualizer');
    typeVisual = <PitchVisualizer />;
  }

  return (
    <div>
    <img id="background" src={props.selectedSong.background}></img>
    {typeVisual}
    <ScoreBoard score={props.score}/>
    </div>
  );
};

window.Main = Main;