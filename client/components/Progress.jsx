import React from 'react';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var username = '';
    var scores = [];

    if (this.props.user) {
      username = this.props.user.username;
      scores = this.props.user.scores;
    }

    return (
      <div className="container">
        <h3> Hello, {username}!</h3>
        <br></br>
        <h6> here is a table of all the songs you have sang so far with your best scores to date</h6>
        <br></br>
        <br></br>
        <table>
          <thead>
            <tr>
              <th>Song</th>
              <th>Best Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((obj, index) =>
              <tr key={index}>
                <td>{obj.title}</td>
                <td>{obj.score}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

// window.Progress = Progress;

