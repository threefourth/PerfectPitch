class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="container">
        <h3> Hello, {this.props.user.username}!</h3>
      </div>
    );
  }
}

window.Progress = Progress;