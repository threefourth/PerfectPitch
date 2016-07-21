"use strict";

var SongPlayer = function SongPlayer(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(PitchVisualizer, null),
    React.createElement(ReactAudioPlayer, {
      src: props.selectedAudio,
      autoPlay: "false"
    })
  );
};

window.SongPlayer = SongPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvU29uZ1BsYXllci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLGFBQWEsU0FBYixVQUFhLENBQUMsS0FBRDtBQUFBLFNBQ2Y7QUFBQTtBQUFBO0FBQ0Usd0JBQUMsZUFBRCxPQURGO0FBRUUsd0JBQUMsZ0JBQUQ7QUFDRSxXQUFLLE1BQU0sYUFEYjtBQUVFLGdCQUFTO0FBRlg7QUFGRixHQURlO0FBQUEsQ0FBakI7O0FBVUEsT0FBTyxVQUFQLEdBQW9CLFVBQXBCIiwiZmlsZSI6IlNvbmdQbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgU29uZ1BsYXllciA9IChwcm9wcykgPT4gKFxuICA8ZGl2PlxuICAgIDxQaXRjaFZpc3VhbGl6ZXIgLz5cbiAgICA8UmVhY3RBdWRpb1BsYXllclxuICAgICAgc3JjPXtwcm9wcy5zZWxlY3RlZEF1ZGlvfVxuICAgICAgYXV0b1BsYXk9XCJmYWxzZVwiXG4gICAgLz5cbiAgPC9kaXY+XG4pO1xuXG53aW5kb3cuU29uZ1BsYXllciA9IFNvbmdQbGF5ZXI7Il19