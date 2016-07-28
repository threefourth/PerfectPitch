import React from 'react';

export default class Score extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      score: 0,
      perfect: 0
    }
  }

  componentDidMount() {
  	// if(this.props.playSong) {
  		this.updateScore();
  	// }
 	}

  updateScore () {
  	var that = this;
  	var currentScore = this.state.score;
  	this.props.setIntervalDrawUserGraphID(function(result){
  		that.setState({score: result});
  	}, currentScore);
  }

	render() {
		return(
        <div className="col l4 s4 scoreboard offset-l3">
          <span>Score : {this.state.score}</span>
        </div>
    );
  }

}