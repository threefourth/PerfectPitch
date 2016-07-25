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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGxheUxpc3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxXQUFXLFNBQVgsUUFBVyxDQUFDLEtBQUQsRUFBVztBQUN4QixTQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQURGLEtBREY7QUFNRTtBQUFBO0FBQUE7QUFDRyxZQUFNLEtBQU4sQ0FBWSxHQUFaLENBQWdCLFVBQUMsSUFBRCxFQUFPLEtBQVA7QUFBQSxlQUNmLG9CQUFDLGFBQUQsSUFBZSxtQkFBbUIsTUFBTSxpQkFBeEMsRUFBMkQsS0FBSyxLQUFoRSxFQUF1RSxNQUFNLElBQTdFLEdBRGU7QUFBQSxPQUFoQixDQURIO0FBSUUsMEJBQUMsT0FBRCxJQUFTLGNBQWMsTUFBTSxZQUE3QjtBQUpGO0FBTkYsR0FERjtBQWVELENBaEJEOztBQW1CQSxPQUFPLFFBQVAsR0FBa0IsUUFBbEIiLCJmaWxlIjoiUGxheUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUGxheUxpc3QgPSAocHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8dGFibGU+XG4gICAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGg+TGlicmFyeTwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5PlxuICAgICAgICB7cHJvcHMuc29uZ3MubWFwKChzb25nLCBpbmRleCkgPT5cbiAgICAgICAgICA8UGxheUxpc3RFbnRyeSBvbkNob29zZVNvbmdDbGljaz17cHJvcHMub25DaG9vc2VTb25nQ2xpY2t9IGtleT17aW5kZXh9IHNvbmc9e3Nvbmd9IC8+XG4gICAgICAgICl9XG4gICAgICAgIDxBcnR3b3JrIHNlbGVjdGVkU29uZz17cHJvcHMuc2VsZWN0ZWRTb25nfS8+XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG4gICk7XG59XG5cblxud2luZG93LlBsYXlMaXN0ID0gUGxheUxpc3Q7Il19