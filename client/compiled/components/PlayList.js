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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvUGxheUxpc3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxXQUFXLFNBQVgsUUFBVyxDQUFDLEtBQUQ7QUFBQSxTQUNiO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQURGLEtBREY7QUFNRTtBQUFBO0FBQUE7QUFDRyxZQUFNLEtBQU4sQ0FBWSxHQUFaLENBQWdCLFVBQUMsSUFBRCxFQUFPLEtBQVA7QUFBQSxlQUNmLG9CQUFDLGFBQUQsSUFBZSxtQkFBbUIsTUFBTSxpQkFBeEMsRUFBMkQsS0FBSyxLQUFoRSxFQUF1RSxNQUFNLElBQTdFLEdBRGU7QUFBQSxPQUFoQixDQURIO0FBSUUsMEJBQUMsT0FBRCxJQUFTLGNBQWMsTUFBTSxZQUE3QjtBQUpGO0FBTkYsR0FEYTtBQUFBLENBQWY7O0FBZ0JBLE9BQU8sUUFBUCxHQUFrQixRQUFsQiIsImZpbGUiOiJQbGF5TGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBQbGF5TGlzdCA9IChwcm9wcykgPT4gKFxyXG4gIDx0YWJsZT5cclxuICAgIDx0aGVhZD5cclxuICAgICAgPHRyPlxyXG4gICAgICAgIDx0aD5MaWJyYXJ5PC90aD5cclxuICAgICAgPC90cj5cclxuICAgIDwvdGhlYWQ+XHJcbiAgICA8dGJvZHk+XHJcbiAgICAgIHtwcm9wcy5zb25ncy5tYXAoKHNvbmcsIGluZGV4KSA9PlxyXG4gICAgICAgIDxQbGF5TGlzdEVudHJ5IG9uQ2hvb3NlU29uZ0NsaWNrPXtwcm9wcy5vbkNob29zZVNvbmdDbGlja30ga2V5PXtpbmRleH0gc29uZz17c29uZ30gLz5cclxuICAgICAgKX1cclxuICAgICAgPEFydHdvcmsgc2VsZWN0ZWRTb25nPXtwcm9wcy5zZWxlY3RlZFNvbmd9Lz5cclxuICAgIDwvdGJvZHk+XHJcbiAgPC90YWJsZT5cclxuKTtcclxuXHJcbndpbmRvdy5QbGF5TGlzdCA9IFBsYXlMaXN0OyJdfQ==