var Main = (props) => {
  return (
    <div>
    <SongPlayer selectedAudio={props.selectedSong.audio} selectedVocals={props.selectedSong.vocals} selectedData={props.selectedSong.data} score={props.score} onPlay={props.onPlay} onPause={props.onPause} onStop={props.onStop} onKaraokeVolumeChange={props.onKaraokeVolumeChange} onVocalsVolumeChange={props.onVocalsVolumeChange} />
    </div>
  );
};

window.Main = Main;