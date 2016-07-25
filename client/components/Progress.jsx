class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <h1> Hello {this.props.user.username} ! <h1>
    );
  }
}

window.Progress = Progress;