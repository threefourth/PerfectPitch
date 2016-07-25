class NoMatch extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="container">
        <h3>It seems you are lost, we will take you back home!</h3>
      </div>
    );
  }
}

window.NoMatch = NoMatch;