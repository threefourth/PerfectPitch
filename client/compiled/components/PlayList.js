"use strict";

var PlayList = function PlayList(props) {
  return React.createElement(
    "table",
    null,
    React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "th",
          null,
          "Library"
        )
      )
    ),
    React.createElement(
      "tbody",
      null,
      props.songs.map(function (song, index) {
        return React.createElement(PlayListEntry, { onChooseSongClick: props.onChooseSongClick, key: index, song: song });
      }),
      React.createElement(Artwork, { selectedSong: props.selectedSong })
    )
  );
};

window.PlayList = PlayList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGxheUxpc3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxXQUFXLFNBQVgsUUFBVyxDQUFDLEtBQUQ7QUFBQSxTQUNiO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQURGLEtBREY7QUFNRTtBQUFBO0FBQUE7QUFDRyxZQUFNLEtBQU4sQ0FBWSxHQUFaLENBQWdCLFVBQUMsSUFBRCxFQUFPLEtBQVA7QUFBQSxlQUNmLG9CQUFDLGFBQUQsSUFBZSxtQkFBbUIsTUFBTSxpQkFBeEMsRUFBMkQsS0FBSyxLQUFoRSxFQUF1RSxNQUFNLElBQTdFLEdBRGU7QUFBQSxPQUFoQixDQURIO0FBSUUsMEJBQUMsT0FBRCxJQUFTLGNBQWMsTUFBTSxZQUE3QjtBQUpGO0FBTkYsR0FEYTtBQUFBLENBQWY7O0FBZ0JBLE9BQU8sUUFBUCxHQUFrQixRQUFsQiIsImZpbGUiOiJQbGF5TGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBQbGF5TGlzdCA9IChwcm9wcykgPT4gKFxuICA8dGFibGU+XG4gICAgPHRoZWFkPlxuICAgICAgPHRyPlxuICAgICAgICA8dGg+TGlicmFyeTwvdGg+XG4gICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gICAgPHRib2R5PlxuICAgICAge3Byb3BzLnNvbmdzLm1hcCgoc29uZywgaW5kZXgpID0+XG4gICAgICAgIDxQbGF5TGlzdEVudHJ5IG9uQ2hvb3NlU29uZ0NsaWNrPXtwcm9wcy5vbkNob29zZVNvbmdDbGlja30ga2V5PXtpbmRleH0gc29uZz17c29uZ30gLz5cbiAgICAgICl9XG4gICAgICA8QXJ0d29yayBzZWxlY3RlZFNvbmc9e3Byb3BzLnNlbGVjdGVkU29uZ30vPlxuICAgIDwvdGJvZHk+XG4gIDwvdGFibGU+XG4pO1xuXG53aW5kb3cuUGxheUxpc3QgPSBQbGF5TGlzdDsiXX0=