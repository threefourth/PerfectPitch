class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: this.props.songs,
      selectedSong: this.props.songs[0],
      score: 100,
      userInput: false
    };

  }

  componentDidMount() {
    //get the audio player that is playing only the vocals 
    var vocals = document.getElementById("vocals");
    //sets the volume at 0, so the vocal player starts silent
    vocals.volume = 0.0;
  }

  onChooseSongClick(event) {
    var title = event.target.textContent;
    var that = this;  
    this.state.songs.forEach(function(song, index) {
      if (song.title === title) {
        that.setState({
          selectedSong: that.props.songs[index]
        });
      }

      if (title === 'Your Voice') {
        that.setState({
          userInput: true
        });
      } else {
        that.setState({
          userInput: false
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Main selectedSong={this.state.selectedSong} score={this.state.score} userInput={this.state.userInput}/>
        <PlayList songs={this.props.songs} onChooseSongClick={this.onChooseSongClick.bind(this)} selectedSong={this.state.selectedSong}/>
      </div>
    );
  }
}

window.App = App;