class App extends React.Component {
  constructor(props) {
  	super(props)
  }

  onChooseSongClick() {
    console.log('Just chose a song!');	
  }

  render() {
  	return (
      <div>
        <h1>App is Rendering</h1>
        <h2>This should be our Library</h2>
        <PlayList songs={this.props.songs} onChooseSongClick={this.onChooseSongClick.bind(this)}/>
      </div>
  	)
  }
}

window.App = App;