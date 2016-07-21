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
    React.createElement("img", { id: "background", src: props.selectedSong.background }),
    React.createElement(SongPlayer, { selectedAudio: props.selectedSong.audio }),
    React.createElement(ScoreBoard, { score: props.score })
  );
};

window.Main = Main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvTWFpbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQ0U7QUFBQTtBQUFBO0FBQ0EsaUNBQUssSUFBRyxZQUFSLEVBQXFCLEtBQUssTUFBTSxZQUFOLENBQW1CLFVBQTdDLEdBREE7QUFFQSx3QkFBQyxVQUFELElBQVksZUFBZSxNQUFNLFlBQU4sQ0FBbUIsS0FBOUMsR0FGQTtBQUdBLHdCQUFDLFVBQUQsSUFBWSxPQUFPLE1BQU0sS0FBekI7QUFIQSxHQURGO0FBT0QsQ0FsQkQ7O0FBb0JBLE9BQU8sSUFBUCxHQUFjLElBQWQiLCJmaWxlIjoiTWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBNYWluID0gKHByb3BzKSA9PiB7XG5cbiAgLy8gdmFyIHR5cGVWaXN1YWw7XG4gIC8vIGlmICghcHJvcHMudXNlcklucHV0KSB7XG4gIC8vICAgY29uc29sZS5sb2coJ0Rpc3BsYXlpbmcgbXVzaWMgdmlkZW8gZm9yIHNvbmcnKTtcbiAgLy8gICB0eXBlVmlzdWFsID0gPFNvbmdQbGF5ZXIgc2VsZWN0ZWRBdWRpbz17cHJvcHMuc2VsZWN0ZWRTb25nLmF1ZGlvfS8+O1xuICAvLyB9IGVsc2Uge1xuICAvLyAgIGNvbnNvbGUubG9nKCdEaXNwbGF5aW5nIHBpdGNoIHZpc3VhbGl6ZXInKTtcbiAgLy8gICB0eXBlVmlzdWFsID0gPFBpdGNoVmlzdWFsaXplciAvPjtcbiAgLy8gfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICA8aW1nIGlkPVwiYmFja2dyb3VuZFwiIHNyYz17cHJvcHMuc2VsZWN0ZWRTb25nLmJhY2tncm91bmR9PjwvaW1nPlxuICAgIDxTb25nUGxheWVyIHNlbGVjdGVkQXVkaW89e3Byb3BzLnNlbGVjdGVkU29uZy5hdWRpb30vPlxuICAgIDxTY29yZUJvYXJkIHNjb3JlPXtwcm9wcy5zY29yZX0vPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxud2luZG93Lk1haW4gPSBNYWluOyJdfQ==