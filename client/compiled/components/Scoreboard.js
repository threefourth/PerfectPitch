"use strict";

var ScoreBoard = function ScoreBoard(props) {
  return React.createElement(
    "div",
    { id: "scoreboard" },
    React.createElement(
      "span",
      { id: "score" },
      "Score: ",
      props.score
    )
  );
};

window.ScoreBoard = ScoreBoard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvU2NvcmVib2FyZC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLGFBQWEsU0FBYixVQUFhLENBQUMsS0FBRDtBQUFBLFNBQ2Y7QUFBQTtBQUFBLE1BQUssSUFBRyxZQUFSO0FBQ0U7QUFBQTtBQUFBLFFBQU0sSUFBRyxPQUFUO0FBQUE7QUFBeUIsWUFBTTtBQUEvQjtBQURGLEdBRGU7QUFBQSxDQUFqQjs7QUFNQSxPQUFPLFVBQVAsR0FBb0IsVUFBcEIiLCJmaWxlIjoiU2NvcmVib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBTY29yZUJvYXJkID0gKHByb3BzKSA9PiAoXHJcbiAgPGRpdiBpZD1cInNjb3JlYm9hcmRcIj5cclxuICAgIDxzcGFuIGlkPVwic2NvcmVcIj5TY29yZToge3Byb3BzLnNjb3JlfTwvc3Bhbj5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbndpbmRvdy5TY29yZUJvYXJkID0gU2NvcmVCb2FyZDsiXX0=