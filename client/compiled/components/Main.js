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
    React.createElement(SongPlayer, { selectedAudio: props.selectedSong.audio, selectedVocals: props.selectedSong.vocals, score: props.score })
  );
};

window.Main = Main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvTWFpbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQ0U7QUFBQTtBQUFBO0FBQ0Esd0JBQUMsVUFBRCxJQUFZLGVBQWUsTUFBTSxZQUFOLENBQW1CLEtBQTlDLEVBQXFELGdCQUFnQixNQUFNLFlBQU4sQ0FBbUIsTUFBeEYsRUFBZ0csT0FBTyxNQUFNLEtBQTdHO0FBREEsR0FERjtBQUtELENBaEJEOztBQWtCQSxPQUFPLElBQVAsR0FBYyxJQUFkIiwiZmlsZSI6Ik1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgTWFpbiA9IChwcm9wcykgPT4ge1xuXG4gIC8vIHZhciB0eXBlVmlzdWFsO1xuICAvLyBpZiAoIXByb3BzLnVzZXJJbnB1dCkge1xuICAvLyAgIGNvbnNvbGUubG9nKCdEaXNwbGF5aW5nIG11c2ljIHZpZGVvIGZvciBzb25nJyk7XG4gIC8vICAgdHlwZVZpc3VhbCA9IDxTb25nUGxheWVyIHNlbGVjdGVkQXVkaW89e3Byb3BzLnNlbGVjdGVkU29uZy5hdWRpb30vPjtcbiAgLy8gfSBlbHNlIHtcbiAgLy8gICBjb25zb2xlLmxvZygnRGlzcGxheWluZyBwaXRjaCB2aXN1YWxpemVyJyk7XG4gIC8vICAgdHlwZVZpc3VhbCA9IDxQaXRjaFZpc3VhbGl6ZXIgLz47XG4gIC8vIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgPFNvbmdQbGF5ZXIgc2VsZWN0ZWRBdWRpbz17cHJvcHMuc2VsZWN0ZWRTb25nLmF1ZGlvfSBzZWxlY3RlZFZvY2Fscz17cHJvcHMuc2VsZWN0ZWRTb25nLnZvY2Fsc30gc2NvcmU9e3Byb3BzLnNjb3JlfS8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG53aW5kb3cuTWFpbiA9IE1haW47Il19