"use strict";

var PlayList = function PlayList(props) {
  console.log(props);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGxheUxpc3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxXQUFXLFNBQVgsUUFBVyxDQUFDLEtBQUQsRUFBVztBQUMxQixVQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0UsU0FDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFERixLQURGO0FBTUU7QUFBQTtBQUFBO0FBQ0csWUFBTSxLQUFOLENBQVksR0FBWixDQUFnQixVQUFDLElBQUQsRUFBTyxLQUFQO0FBQUEsZUFDZixvQkFBQyxhQUFELElBQWUsbUJBQW1CLE1BQU0saUJBQXhDLEVBQTJELEtBQUssS0FBaEUsRUFBdUUsTUFBTSxJQUE3RSxHQURlO0FBQUEsT0FBaEIsQ0FESDtBQUlFLDBCQUFDLE9BQUQsSUFBUyxjQUFjLE1BQU0sWUFBN0I7QUFKRjtBQU5GLEdBREY7QUFlRCxDQWpCRDs7QUFvQkEsT0FBTyxRQUFQLEdBQWtCLFFBQWxCIiwiZmlsZSI6IlBsYXlMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFBsYXlMaXN0ID0gKHByb3BzKSA9PiB7XG5jb25zb2xlLmxvZyhwcm9wcyk7XG4gIHJldHVybiAoXG4gICAgPHRhYmxlPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPkxpYnJhcnk8L3RoPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAge3Byb3BzLnNvbmdzLm1hcCgoc29uZywgaW5kZXgpID0+XG4gICAgICAgICAgPFBsYXlMaXN0RW50cnkgb25DaG9vc2VTb25nQ2xpY2s9e3Byb3BzLm9uQ2hvb3NlU29uZ0NsaWNrfSBrZXk9e2luZGV4fSBzb25nPXtzb25nfSAvPlxuICAgICAgICApfVxuICAgICAgICA8QXJ0d29yayBzZWxlY3RlZFNvbmc9e3Byb3BzLnNlbGVjdGVkU29uZ30vPlxuICAgICAgPC90Ym9keT5cbiAgICA8L3RhYmxlPlxuICApO1xufVxuXG5cbndpbmRvdy5QbGF5TGlzdCA9IFBsYXlMaXN0OyJdfQ==