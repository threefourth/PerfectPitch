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
    React.createElement(SongPlayer, { selectedAudio: props.selectedSong.audio, selectedVocals: props.selectedSong.vocals }),
    React.createElement(ScoreBoard, { score: props.score })
  );
};

window.Main = Main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvTWFpbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQ0U7QUFBQTtBQUFBO0FBQ0EsaUNBQUssSUFBRyxZQUFSLEVBQXFCLEtBQUssTUFBTSxZQUFOLENBQW1CLFVBQTdDLEdBREE7QUFFQSx3QkFBQyxVQUFELElBQVksZUFBZSxNQUFNLFlBQU4sQ0FBbUIsS0FBOUMsRUFBcUQsZ0JBQWdCLE1BQU0sWUFBTixDQUFtQixNQUF4RixHQUZBO0FBR0Esd0JBQUMsVUFBRCxJQUFZLE9BQU8sTUFBTSxLQUF6QjtBQUhBLEdBREY7QUFPRCxDQWxCRDs7QUFvQkEsT0FBTyxJQUFQLEdBQWMsSUFBZCIsImZpbGUiOiJNYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIE1haW4gPSAocHJvcHMpID0+IHtcblxuICAvLyB2YXIgdHlwZVZpc3VhbDtcbiAgLy8gaWYgKCFwcm9wcy51c2VySW5wdXQpIHtcbiAgLy8gICBjb25zb2xlLmxvZygnRGlzcGxheWluZyBtdXNpYyB2aWRlbyBmb3Igc29uZycpO1xuICAvLyAgIHR5cGVWaXN1YWwgPSA8U29uZ1BsYXllciBzZWxlY3RlZEF1ZGlvPXtwcm9wcy5zZWxlY3RlZFNvbmcuYXVkaW99Lz47XG4gIC8vIH0gZWxzZSB7XG4gIC8vICAgY29uc29sZS5sb2coJ0Rpc3BsYXlpbmcgcGl0Y2ggdmlzdWFsaXplcicpO1xuICAvLyAgIHR5cGVWaXN1YWwgPSA8UGl0Y2hWaXN1YWxpemVyIC8+O1xuICAvLyB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgIDxpbWcgaWQ9XCJiYWNrZ3JvdW5kXCIgc3JjPXtwcm9wcy5zZWxlY3RlZFNvbmcuYmFja2dyb3VuZH0+PC9pbWc+XG4gICAgPFNvbmdQbGF5ZXIgc2VsZWN0ZWRBdWRpbz17cHJvcHMuc2VsZWN0ZWRTb25nLmF1ZGlvfSBzZWxlY3RlZFZvY2Fscz17cHJvcHMuc2VsZWN0ZWRTb25nLnZvY2Fsc30gLz5cbiAgICA8U2NvcmVCb2FyZCBzY29yZT17cHJvcHMuc2NvcmV9Lz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbndpbmRvdy5NYWluID0gTWFpbjsiXX0=