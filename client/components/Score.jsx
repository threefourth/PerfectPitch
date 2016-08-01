import React from 'react';

export default class Score extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
      opponentPercentage: 0
    }
  }

  componentDidMount() {
  	// if(this.props.playSong) {
  	this.updateScoreBoard();
  	// }
 	}

  updateScoreBoard () {
  	var that = this;
  	this.props.updateScore(function(result){
  		that.setState({percentage: result.percentage, opponentPercentage: result.opponentPercentage});
  	});
  }

	render() {
		return(
      <div className="col l4 s4 scoreboard offset-l3">
        <span>Your Score : {this.state.percentage} %</span><br />
        <span>Your Friend's Score : {this.state.opponentPercentage} %</span>
      </div>
    );
  }

}