class PitchVisualizer extends React.Component {

  componentDidMount() {

    // Initializes the variables that the pitch detector and visualizer
    // will need to use (see scripts/pitchDetector.js)

    // corresponds to a 5kHz signal
    // MAX_SIZE = Math.max(4, Math.floor(audioContext.sampleRate / 5000));  
    audioContext = new AudioContext();

    detectorElem = document.getElementById( 'detector' );
    canvasElem = document.getElementById( 'output' );
    DEBUGCANVAS = document.getElementById( 'waveform' );
    graphCanvas = document.getElementById( 'pitchGraph' );

    if (DEBUGCANVAS) {
      waveCanvas = DEBUGCANVAS.getContext('2d');
      waveCanvas.strokeStyle = 'black';
      waveCanvas.lineWidth = 1;
    }

    // pitch graph canvas
    if (graphCanvas) {
      noteCanvas = graphCanvas.getContext('2d');
      noteCanvas.strokeStyle = 'black';
      noteCanvas.lineWidth = 1;
    }

    pitchElem = document.getElementById( 'pitch' );
    noteElem = document.getElementById( 'note' );
    detuneElem = document.getElementById( 'detune' );
    detuneAmount = document.getElementById( 'detune_amt' );

  }

  componentWillUnmount() {
    this.stopUserAudio();
  }

  stopUserAudio() {
    console.log('Stopping user input');

    if (localStream) {
      localStream.getAudioTracks()[0].stop( 0 );
    }
    
    localStream = null;
    clearInterval(updatePitchID);
  }

  toggleLiveInput() {
    console.log('Toggling audio input');
    console.log(localStream);

    if (localStream === null) {
      getUserAudio();
    } else {
      this.stopUserAudio();
    }

  }

  render() {
    return (
      <div id="pitchdetector">

        <div className="row">
          <div className="col s12 l4">
            <div id="detector" className="vague">
              <div className="pitch"><span id="pitch">--</span>Hz</div>
              <div className="note"><span id="note">--</span></div>   
              <div id="detune"><span id="detune_amt">--</span><span id="flat">cents &#9837;</span><span id="sharp">cents &#9839;</span></div>
            </div>       
          </div>
          <div className='col s12 l4 audioPlayer'>
            <button type="button" onClick= {() => {this.props.onPlay(); this.toggleLiveInput.apply(this)}}>Play</button>
            <button type="button" onClick={() => {this.props.onPause(); this.toggleLiveInput.apply(this)}}>Pause</button>
            <button type="button" onClick={() => {this.props.onStop(); this.toggleLiveInput.apply(this)}}>Stop</button>
            {this.props.audioPlayer}
          </div>
          <div className="col s12 l4 overflow">
            <canvas id="waveform" width="512" height="290"></canvas>
          </div>
        </div>

        <div className="row">
          <div className="col l12 s12">
            <div className="overflow">
            <canvas id="pitchGraph" width="2560" height="256"></canvas>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col l4 s4 scoreboard offset-l3">
            <span>Score : {this.props.score}</span>
          </div>
        </div>

      </div>
    );
  }
};

window.PitchVisualizer = PitchVisualizer;
              // <canvas id="output" ></canvas> below #note