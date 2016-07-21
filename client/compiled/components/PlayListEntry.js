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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGxheUxpc3RFbnRyeS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLGdCQUFnQixTQUFoQixhQUFnQixDQUFDLEtBQUQ7QUFBQSxTQUNsQjtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsUUFBSSxTQUFTLE1BQU0saUJBQW5CO0FBQ0csWUFBTSxJQUFOLENBQVc7QUFEZDtBQURGLEdBRGtCO0FBQUEsQ0FBcEI7O0FBUUEsT0FBTyxhQUFQLEdBQXVCLGFBQXZCIiwiZmlsZSI6IlBsYXlMaXN0RW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUGxheUxpc3RFbnRyeSA9IChwcm9wcykgPT4gKFxuICA8dHI+XG4gICAgPHRkIG9uQ2xpY2s9e3Byb3BzLm9uQ2hvb3NlU29uZ0NsaWNrfT5cbiAgICAgIHtwcm9wcy5zb25nLnRpdGxlfVxuICAgIDwvdGQ+XG4gIDwvdHI+XG4pO1xuXG53aW5kb3cuUGxheUxpc3RFbnRyeSA9IFBsYXlMaXN0RW50cnk7Il19