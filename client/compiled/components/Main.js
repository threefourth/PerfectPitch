"use strict";

var Main = function Main(props) {

  // var typeVisual;
  // if (!props.userInput) {
  //   console.log('Displaying music video for song');
  //   typeVisual = <SongPlayer selectedAudio={props.selectedSong.audio}/>;
  // } else {
  //   console.log('Displaying pitch visualizer');
  //   typeVisual = <PitchVisualizer />;
  // }

  return React.createElement(
    "div",
    null,
    React.createElement(SongPlayer, { selectedAudio: props.selectedSong.audio, selectedVocals: props.selectedSong.vocals, score: props.score, onPlay: props.onPlay, onPause: props.onPause })
  );
};

window.Main = Main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvTWFpbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQ0U7QUFBQTtBQUFBO0FBQ0Esd0JBQUMsVUFBRCxJQUFZLGVBQWUsTUFBTSxZQUFOLENBQW1CLEtBQTlDLEVBQXFELGdCQUFnQixNQUFNLFlBQU4sQ0FBbUIsTUFBeEYsRUFBZ0csT0FBTyxNQUFNLEtBQTdHLEVBQW9ILFFBQVEsTUFBTSxNQUFsSSxFQUEwSSxTQUFTLE1BQU0sT0FBeko7QUFEQSxHQURGO0FBS0QsQ0FoQkQ7O0FBa0JBLE9BQU8sSUFBUCxHQUFjLElBQWQiLCJmaWxlIjoiTWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBNYWluID0gKHByb3BzKSA9PiB7XG5cbiAgLy8gdmFyIHR5cGVWaXN1YWw7XG4gIC8vIGlmICghcHJvcHMudXNlcklucHV0KSB7XG4gIC8vICAgY29uc29sZS5sb2coJ0Rpc3BsYXlpbmcgbXVzaWMgdmlkZW8gZm9yIHNvbmcnKTtcbiAgLy8gICB0eXBlVmlzdWFsID0gPFNvbmdQbGF5ZXIgc2VsZWN0ZWRBdWRpbz17cHJvcHMuc2VsZWN0ZWRTb25nLmF1ZGlvfS8+O1xuICAvLyB9IGVsc2Uge1xuICAvLyAgIGNvbnNvbGUubG9nKCdEaXNwbGF5aW5nIHBpdGNoIHZpc3VhbGl6ZXInKTtcbiAgLy8gICB0eXBlVmlzdWFsID0gPFBpdGNoVmlzdWFsaXplciAvPjtcbiAgLy8gfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICA8U29uZ1BsYXllciBzZWxlY3RlZEF1ZGlvPXtwcm9wcy5zZWxlY3RlZFNvbmcuYXVkaW99IHNlbGVjdGVkVm9jYWxzPXtwcm9wcy5zZWxlY3RlZFNvbmcudm9jYWxzfSBzY29yZT17cHJvcHMuc2NvcmV9IG9uUGxheT17cHJvcHMub25QbGF5fSBvblBhdXNlPXtwcm9wcy5vblBhdXNlfS8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG53aW5kb3cuTWFpbiA9IE1haW47Il19