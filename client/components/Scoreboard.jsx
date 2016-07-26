import React from 'react';

var ScoreBoard = (props) => (
  <div id="scoreboard">
    <span id="score">Score: {props.score}</span>
  </div>
);

export default ScoreBoard;