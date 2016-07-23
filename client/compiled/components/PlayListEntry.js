"use strict";

var PlayListEntry = function PlayListEntry(props) {
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      { onClick: props.onChooseSongClick },
      props.song.title
    )
  );
};

window.PlayListEntry = PlayListEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGxheUxpc3RFbnRyeS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLGdCQUFnQixTQUFoQixhQUFnQixDQUFDLEtBQUQ7QUFBQSxTQUNsQjtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsUUFBSSxTQUFTLE1BQU0saUJBQW5CO0FBQ0csWUFBTSxJQUFOLENBQVc7QUFEZDtBQURGLEdBRGtCO0FBQUEsQ0FBcEI7O0FBUUEsT0FBTyxhQUFQLEdBQXVCLGFBQXZCIiwiZmlsZSI6IlBsYXlMaXN0RW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUGxheUxpc3RFbnRyeSA9IChwcm9wcykgPT4gKFxyXG4gIDx0cj5cclxuICAgIDx0ZCBvbkNsaWNrPXtwcm9wcy5vbkNob29zZVNvbmdDbGlja30+XHJcbiAgICAgIHtwcm9wcy5zb25nLnRpdGxlfVxyXG4gICAgPC90ZD5cclxuICA8L3RyPlxyXG4pO1xyXG5cclxud2luZG93LlBsYXlMaXN0RW50cnkgPSBQbGF5TGlzdEVudHJ5OyJdfQ==