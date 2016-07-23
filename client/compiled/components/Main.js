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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvTWFpbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQ0U7QUFBQTtBQUFBO0FBQ0EsaUNBQUssSUFBRyxZQUFSLEVBQXFCLEtBQUssTUFBTSxZQUFOLENBQW1CLFVBQTdDLEdBREE7QUFFQSx3QkFBQyxVQUFELElBQVksZUFBZSxNQUFNLFlBQU4sQ0FBbUIsS0FBOUMsRUFBcUQsZ0JBQWdCLE1BQU0sWUFBTixDQUFtQixNQUF4RixHQUZBO0FBR0Esd0JBQUMsVUFBRCxJQUFZLE9BQU8sTUFBTSxLQUF6QjtBQUhBLEdBREY7QUFPRCxDQWxCRDs7QUFvQkEsT0FBTyxJQUFQLEdBQWMsSUFBZCIsImZpbGUiOiJNYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIE1haW4gPSAocHJvcHMpID0+IHtcclxuXHJcbiAgLy8gdmFyIHR5cGVWaXN1YWw7XHJcbiAgLy8gaWYgKCFwcm9wcy51c2VySW5wdXQpIHtcclxuICAvLyAgIGNvbnNvbGUubG9nKCdEaXNwbGF5aW5nIG11c2ljIHZpZGVvIGZvciBzb25nJyk7XHJcbiAgLy8gICB0eXBlVmlzdWFsID0gPFNvbmdQbGF5ZXIgc2VsZWN0ZWRBdWRpbz17cHJvcHMuc2VsZWN0ZWRTb25nLmF1ZGlvfS8+O1xyXG4gIC8vIH0gZWxzZSB7XHJcbiAgLy8gICBjb25zb2xlLmxvZygnRGlzcGxheWluZyBwaXRjaCB2aXN1YWxpemVyJyk7XHJcbiAgLy8gICB0eXBlVmlzdWFsID0gPFBpdGNoVmlzdWFsaXplciAvPjtcclxuICAvLyB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgPGltZyBpZD1cImJhY2tncm91bmRcIiBzcmM9e3Byb3BzLnNlbGVjdGVkU29uZy5iYWNrZ3JvdW5kfT48L2ltZz5cclxuICAgIDxTb25nUGxheWVyIHNlbGVjdGVkQXVkaW89e3Byb3BzLnNlbGVjdGVkU29uZy5hdWRpb30gc2VsZWN0ZWRWb2NhbHM9e3Byb3BzLnNlbGVjdGVkU29uZy52b2NhbHN9IC8+XHJcbiAgICA8U2NvcmVCb2FyZCBzY29yZT17cHJvcHMuc2NvcmV9Lz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG53aW5kb3cuTWFpbiA9IE1haW47Il19