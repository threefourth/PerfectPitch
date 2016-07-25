class PitchVisualizer extends React.Component {

  componentDidMount() {

    var karaokeInput = document.getElementById('karaokeInput');
    karaokeInput.value = 1;
    var vocalsInput = document.getElementById('vocalsInput');
    vocalsInput.value = 0;

    // Initializes the variables that the pitch detector and visualizer
    // will need to use (see scripts/pitchDetector.js)

    // corresponds to a 5kHz signal
    // MAX_SIZE = Math.max(4, Math.floor(audioContext.sampleRate / 5000));  
    audioContext = new AudioContext();

    detectorElem = document.getElementById( 'detector' );
    canvasElem = document.getElementById( 'output' );
    DEBUGCANVAS = document.getElementById( 'waveform' );

    if (DEBUGCANVAS) {
      waveCanvas = DEBUGCANVAS.getContext('2d');
      waveCanvas.strokeStyle = 'black';
      waveCanvas.lineWidth = 1;
    }

    pitchElem = document.getElementById( 'pitch' );
    noteElem = document.getElementById( 'note' );
    detuneElem = document.getElementById( 'detune' );
    detuneAmount = document.getElementById( 'detune_amt' );

    // Attach the SVG element for d3 visualizer
    var svgWidth = 800;
    var svgHeight = 256;

    var pitchGraph = d3.select('.pitchGraph').append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('class', 'songGraph');

    var drawSongGraph = function ( data ) {

      var xScale = d3.scaleLinear()
        .domain( [0, data.length] )
        .range( [0, svgWidth] );
      var yScale = d3.scaleLinear()
        .domain( [0, 150] )
        .range( [svgHeight, 0] );

      var notes = pitchGraph.selectAll('rect')
        .data( data, function(d) {
          return d.id;
        } );

      // ENTER
      notes.enter()
        .append('rect')
        .attr('x', function(d, i) {
          return xScale(i);
        })
        .attr('y', function(d) {
          return yScale(d.value);
        })
        .attr('width', svgWidth / data.length)
        .attr('height', 10)
        .attr('fill', '#50C8FF')
        .attr('id', function(d) {
          return d.id;
        });
    };
    
    drawSongGraph( this.props.selectedData );
  }

  componentWillUpdate() {
    console.log('Updating PitchVisualizer');
    this.stopUserAudio();
    document.getElementById('.songGraph');
  }

  stopUserAudio() {
    console.log('Stopping user input');
    console.log(localStream);
    if (localStream) {
      localStream.getAudioTracks()[0].stop( 0 );
    }
    
    localStream = null;
    clearInterval( updatePitchID );
    clearInterval( drawUserGraphID );
  }

  toggleLiveInput() {
    console.log('Toggling audio input');
    console.log(localStream);

    if (localStream === null) {
      getUserAudio();
    } else {
      this.stopUserAudio();
    }

    var that = this;
    var svgWidth = 800;
    var svgHeight = 256;

    var userPitchGraph = d3.select('.songGraph');

    var drawUserGraph = function( data ) {

      var xScale = d3.scaleLinear()
        .domain( [0, that.props.selectedData.length] )
        .range( [0, svgWidth] );
      var yScale = d3.scaleLinear()
        .domain( [0, 150] )
        .range( [svgHeight, 0] );

      var notes = userPitchGraph.selectAll('circle')
        .data(data, function(d) {
          return d.id;
        });

      // ENTER
      notes.enter()
        .append('circle')
        .attr('cx', function(d) {
          return xScale(d.id);
        })
        .attr('cy', function(d) {
          return yScale(d.value);
        })
        .attr('r', 2)
        .attr('fill', 'red');
    };

    updatePitchID = setInterval(function() {
      updatePitch();
    }, setIntervalTimeRate);

    drawUserGraphID = setInterval(function() {
      getAvgNote();
      // console.log ( avgNoteArray );
      drawUserGraph( avgNoteArray );
    }, 1000);

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
            <a className="btn-floating btn-large waves-effect waves-light teal" onClick= {() => {this.props.onPlay(); this.toggleLiveInput() }}><i className="material-icons">play_arrow</i></a>
            <a className="btn-floating btn-large waves-effect waves-light teal" onClick={() => {this.props.onPause(); this.stopUserAudio.apply(this)}}><i className="material-icons">pause</i></a>
            <a className="btn-floating btn-large waves-effect waves-light teal" onClick={() => {this.props.onStop(); this.stopUserAudio.apply(this)}}><i className="material-icons">stop</i></a>
            {this.props.audioPlayer}
            <input type="range" id="karaokeInput" min="0" max="1" step="0.1" onChange={this.props.onKaraokeVolumeChange}/>
            <input type="range" id="vocalsInput" min="0" max="1" step="0.1" onChange={this.props.onVocalsVolumeChange}/>
          </div>
          <div className="col s12 l4 overflow">
            <canvas id="waveform" width="512" height="290"></canvas>
          </div>
        </div>

        <div className="row">
          <div className="col l12 s12">
            <div className="overflow pitchGraph">
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