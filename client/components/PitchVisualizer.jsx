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
        <div id="detector" className="vague">
          <div className="pitch"><span id="pitch">--</span>Hz</div>
          <div className="note"><span id="note">--</span></div>   
          <canvas id="output" width="300" height="42"></canvas>
          <div id="detune"><span id="detune_amt">--</span><span id="flat">cents &#9837;</span><span id="sharp">cents &#9839;</span></div>
        </div>

        <br></br>
        <br></br>

        <button onClick={this.toggleLiveInput.bind(this)}>Use Live Input</button>

        <canvas id="pitchGraph" width="2560" height="256"></canvas>
        <canvas id="waveform" width="512" height="256"></canvas>
      </div>
    );
  }
};

window.PitchVisualizer = PitchVisualizer;