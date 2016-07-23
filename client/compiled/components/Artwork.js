"use strict";

var Artwork = function Artwork(props) {
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      null,
      React.createElement("img", { src: props.selectedSong.artwork })
    )
  );
};

window.Artwork = Artwork;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvQXJ0d29yay5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLFVBQVUsU0FBVixPQUFVLENBQUMsS0FBRDtBQUFBLFNBQ1o7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsbUNBQUssS0FBSyxNQUFNLFlBQU4sQ0FBbUIsT0FBN0I7QUFERjtBQURGLEdBRFk7QUFBQSxDQUFkOztBQVFBLE9BQU8sT0FBUCxHQUFpQixPQUFqQiIsImZpbGUiOiJBcnR3b3JrLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEFydHdvcmsgPSAocHJvcHMpID0+IChcclxuICA8dHI+XHJcbiAgICA8dGQ+XHJcbiAgICAgIDxpbWcgc3JjPXtwcm9wcy5zZWxlY3RlZFNvbmcuYXJ0d29ya30+PC9pbWc+XHJcbiAgICA8L3RkPlxyXG4gIDwvdHI+XHJcbik7XHJcblxyXG53aW5kb3cuQXJ0d29yayA9IEFydHdvcms7Il19