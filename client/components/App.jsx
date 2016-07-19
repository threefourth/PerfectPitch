class App extends React.Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  songs: this.props.songs,
  	  selectedSong: this.props.songs[0]
  	}
  }

  onChooseSongClick(event) {
    var title = event.target.textContent;
    var that = this;
    console.log('this.state.songs is', this.state.songs);
    this.state.songs.forEach(function(song, index) {
      if (song.title === title) {
        that.setState({
          selectedSong: that.props.songs[index]
        })
      }
    });
    console.log('this.state.selectedSong is', this.state.selectedSong);
  }

  render() {
  	return (
      <div>
        <PlayList songs={this.props.songs} onChooseSongClick={this.onChooseSongClick.bind(this)} selectedSong={this.state.selectedSong}/>
      </div>
  	)
  }
}

window.App = App;