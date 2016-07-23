'use strict';

var SongPlayer = function SongPlayer(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(PitchVisualizer, null),
    React.createElement(ReactAudioPlayer, { id: 'vocals',
      src: props.selectedVocals,
      autoPlay: 'false'
    }),
    React.createElement(ReactAudioPlayer, { id: 'karaoke',
      src: props.selectedAudio,
      autoPlay: 'false'
    })
  );
};

window.SongPlayer = SongPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvU29uZ1BsYXllci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLGFBQWEsU0FBYixVQUFhLENBQUMsS0FBRDtBQUFBLFNBQ2Y7QUFBQTtBQUFBO0FBQ0Usd0JBQUMsZUFBRCxPQURGO0FBRUUsd0JBQUMsZ0JBQUQsSUFBa0IsSUFBSSxRQUF0QjtBQUNFLFdBQUssTUFBTSxjQURiO0FBRUUsZ0JBQVM7QUFGWCxNQUZGO0FBTUUsd0JBQUMsZ0JBQUQsSUFBa0IsSUFBSSxTQUF0QjtBQUNFLFdBQUssTUFBTSxhQURiO0FBRUUsZ0JBQVM7QUFGWDtBQU5GLEdBRGU7QUFBQSxDQUFqQjs7QUFjQSxPQUFPLFVBQVAsR0FBb0IsVUFBcEIiLCJmaWxlIjoiU29uZ1BsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBTb25nUGxheWVyID0gKHByb3BzKSA9PiAoXHJcbiAgPGRpdj5cclxuICAgIDxQaXRjaFZpc3VhbGl6ZXIgLz5cclxuICAgIDxSZWFjdEF1ZGlvUGxheWVyIGlkPXsndm9jYWxzJ31cclxuICAgICAgc3JjPXtwcm9wcy5zZWxlY3RlZFZvY2Fsc31cclxuICAgICAgYXV0b1BsYXk9XCJmYWxzZVwiXHJcbiAgICAvPlxyXG4gICAgPFJlYWN0QXVkaW9QbGF5ZXIgaWQ9eydrYXJhb2tlJ31cclxuICAgICAgc3JjPXtwcm9wcy5zZWxlY3RlZEF1ZGlvfVxyXG4gICAgICBhdXRvUGxheT1cImZhbHNlXCJcclxuICAgIC8+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG53aW5kb3cuU29uZ1BsYXllciA9IFNvbmdQbGF5ZXI7Il19