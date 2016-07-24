var Main = (props) => {

  // var typeVisual;
  // if (!props.userInput) {
  //   console.log('Displaying music video for song');
  //   typeVisual = <SongPlayer selectedAudio={props.selectedSong.audio}/>;
  // } else {
  //   console.log('Displaying pitch visualizer');
  //   typeVisual = <PitchVisualizer />;
  // }

  return (
    <div>
    <SongPlayer selectedAudio={props.selectedSong.audio} selectedVocals={props.selectedSong.vocals} score={props.score} onPlay={props.onPlay} onPause={props.onPause} onStop={props.onStop} onKaraokeVolumeChange={props.onKaraokeVolumeChange} onVocalsVolumeChange={props.onVocalsVolumeChange} />
    </div>
  );
};

window.Main = Main;