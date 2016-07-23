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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvU29uZ1BsYXllci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLGFBQWEsU0FBYixVQUFhLENBQUMsS0FBRDtBQUFBLFNBQ2Y7QUFBQTtBQUFBO0FBQ0Usd0JBQUMsZUFBRCxPQURGO0FBRUUsd0JBQUMsZ0JBQUQsSUFBa0IsSUFBSSxRQUF0QjtBQUNFLFdBQUssTUFBTSxjQURiO0FBRUUsZ0JBQVM7QUFGWCxNQUZGO0FBTUUsd0JBQUMsZ0JBQUQsSUFBa0IsSUFBSSxTQUF0QjtBQUNFLFdBQUssTUFBTSxhQURiO0FBRUUsZ0JBQVM7QUFGWDtBQU5GLEdBRGU7QUFBQSxDQUFqQjs7QUFjQSxPQUFPLFVBQVAsR0FBb0IsVUFBcEIiLCJmaWxlIjoiU29uZ1BsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBTb25nUGxheWVyID0gKHByb3BzKSA9PiAoXG4gIDxkaXY+XG4gICAgPFBpdGNoVmlzdWFsaXplciAvPlxuICAgIDxSZWFjdEF1ZGlvUGxheWVyIGlkPXsndm9jYWxzJ31cbiAgICAgIHNyYz17cHJvcHMuc2VsZWN0ZWRWb2NhbHN9XG4gICAgICBhdXRvUGxheT1cImZhbHNlXCJcbiAgICAvPlxuICAgIDxSZWFjdEF1ZGlvUGxheWVyIGlkPXsna2FyYW9rZSd9XG4gICAgICBzcmM9e3Byb3BzLnNlbGVjdGVkQXVkaW99XG4gICAgICBhdXRvUGxheT1cImZhbHNlXCJcbiAgICAvPlxuICA8L2Rpdj5cbik7XG5cbndpbmRvdy5Tb25nUGxheWVyID0gU29uZ1BsYXllcjsiXX0=