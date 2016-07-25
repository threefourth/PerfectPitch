class PitchVisualizer extends React.Component {

  componentDidMount() {

    var karaokeInput = document.getElementById('karaokeInput');
    karaokeInput.value = 1;
    var vocalsInput = document.getElementById('vocalsInput');
    vocalsInput.value = 0;

    // Initializes the variables that the pitch detector and visualizer
    // will need to use (see scripts/pitchDetector.js)
 
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

    // Draw the graphs for the first song 
    pitchGraph = d3.select('.pitchGraph').append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('class', 'songGraph');

    this.drawSongGraph( this.props.selectedData );
  }

  componentWillUpdate() {
    this.stopUserAudio();
    document.getElementById('.songGraph');

    // Refresh graph
    d3.selectAll('svg > *').remove();
    this.drawSongGraph( this.props.selectedData );
  }

  drawSongGraph( data ) {
    var xScale = d3.scaleLinear()
      .domain( [0, data.length] )
      .range( [0, svgWidth] );
    var yScale = d3.scaleLinear()
      .domain( [50, 120] )
      .range( [svgHeight, 0] );

    var notes = pitchGraph.selectAll('rect')
      .data( data, function(d) {
        return d.id;
      } );

    pitchGraph.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'white')
      .attr('fill-opacity', 0.5);

    // ENTER
    notes.enter()
      .append('rect')
      .attr('x', function(d, i) {
        return xScale(i);
      })
      .attr('y', function(d) {
        return yScale(d.value);
      })
      .attr('width', (svgWidth / data.length) * 3)
      .attr('height', 4)
      .attr('fill', '#4DB6AC')
      .attr('id', function(d) {
        return d.id;
      });

    // UPDATE
    notes
      .transition()
      .attr('x', function(d, i) {
        return xScale(i);
      })
      .attr('y', function(d) {
        return yScale(d.value);
      })
      .attr('width', (svgWidth / data.length) * 3)
      .attr('height', 4)
      .attr('fill', '#4DB6AC')
      .attr('id', function(d) {
        return d.id;
      });

    // EXIT
    notes
      .exit()
      .remove();
  }

  stopUserAudio() {
    if (localStream) {
      localStream.getAudioTracks()[0].stop( 0 );
    }
    
    localStream = null;

    // End pitch detection/visualization processes
    clearInterval( updatePitchID );
    clearInterval( drawUserGraphID );

    // Refresh user's avgNoteArray
    avgNoteArray = [];
  }

  toggleLiveInput() {

    if (localStream === null) {
      getUserAudio();
    } else {
      this.stopUserAudio();
    }

    var userPitchGraph = d3.select('.songGraph');

    var drawUserGraph = function( data, songData ) {

      var xScale = d3.scaleLinear()
        .domain( [0, that.props.selectedData.length] )
        .range( [0, svgWidth] );
      var yScale = d3.scaleLinear()
        .domain( [50, 120] )
        .range( [svgHeight, 0] );

      var notes = userPitchGraph.selectAll('ellipse')
        .data( data, function( d ) {
          return d.id;
        });

      // ENTER
      notes.enter()
        .append('ellipse')
        .attr('cx', function(d) {
          return xScale(d.id) + (svgWidth / that.props.selectedData.length);
        })
        .attr('cy', function(d) {
          return yScale(d.value);
        })
        .attr('rx', (svgWidth / that.props.selectedData.length) * 1.5)
        .attr('ry', 2)
        .attr('fill', 'yellow')
        .attr('id', function(d) {
          return d.id;
        });

      // UPDATE
      notes
        .transition()
        .attr('cx', function(d) {
          return xScale(d.id) + (svgWidth / songData.length);
        })
        .attr('cy', function(d) {
          return yScale(d.value);
        })
        .attr('rx', (svgWidth / that.props.selectedData.length) * 1.5)
        .attr('ry', 2)
        .attr('fill', 'red')
        .attr('id', function(d) {
          return d.id;
        });

      // EXIT
      notes
        .exit()
        .remove();
    };
    
    var that = this;

    updatePitchID = setInterval(function() {
      updatePitch();
    }, 1000 / 60);

    drawUserGraphID = setInterval(function() {
      getAvgNote( noteArray );
      drawUserGraph( avgNoteArray, that.props.selectedData );
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

