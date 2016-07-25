"use strict";

var PlayListEntry = function PlayListEntry(props) {
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      { className: "song-entry", onClick: props.onChooseSongClick },
      props.song.title
    )
  );
};

window.PlayListEntry = PlayListEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGxheUxpc3RFbnRyeS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLGdCQUFnQixTQUFoQixhQUFnQixDQUFDLEtBQUQ7QUFBQSxTQUNsQjtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsUUFBSSxXQUFVLFlBQWQsRUFBMkIsU0FBUyxNQUFNLGlCQUExQztBQUNHLFlBQU0sSUFBTixDQUFXO0FBRGQ7QUFERixHQURrQjtBQUFBLENBQXBCOztBQVFBLE9BQU8sYUFBUCxHQUF1QixhQUF2QiIsImZpbGUiOiJQbGF5TGlzdEVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFBsYXlMaXN0RW50cnkgPSAocHJvcHMpID0+IChcbiAgPHRyPlxuICAgIDx0ZCBjbGFzc05hbWU9XCJzb25nLWVudHJ5XCIgb25DbGljaz17cHJvcHMub25DaG9vc2VTb25nQ2xpY2t9PlxuICAgICAge3Byb3BzLnNvbmcudGl0bGV9XG4gICAgPC90ZD5cbiAgPC90cj5cbik7XG5cbndpbmRvdy5QbGF5TGlzdEVudHJ5ID0gUGxheUxpc3RFbnRyeTsiXX0=