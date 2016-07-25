/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var setIntervalTimeRate = 1000 / 60; // milliseconds
var audioContext = null;
var isPlaying = false;
var sourceNode = null;
var analyser = null;
var theBuffer = null;
var DEBUGCANVAS = null;
var graphCanvas = null;
var mediaStreamSource = null;
var localStream = null; // Used when stopping microphone input
var updatePitchID = null; // Used to stop the updateGraph interval
var drawUserGraphID = null; // Used to stop drawing of the user pitch
var updateSongGraphID = null;

var noteArray = [];
var avgNoteArray = [];

var detectorElem, 
    canvasElem,
    waveCanvas,
    noteCanvas,
    pitchElem,
    noteElem,
    detuneElem,
    detuneAmount;

// Variables used for the D3 visualizer
var svgWidth = 800;
var svgHeight = 256;
var pitchGraph;

var getUserAudio = function() {
  // The user will be prompted whether he will permit the browser
  // to record the audio. If given permission, this script will
  // create a MediaStream object from user input. 
  // The script then connects the audio source to the analyser
  // node. Visualization is then run on ten times a second.
  // NOTE that the source is not connected to any destination.
  // This is allowed by Web Audio, and it just means that 
  // the user audio won't be played back.

  if (navigator.mediaDevices.getUserMedia) {
    
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(function(mediaStream) {
        console.log('Getting user audio');
        localStream = mediaStream;
        mediaStreamSource = audioContext.createMediaStreamSource(mediaStream);

        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        mediaStreamSource.connect( analyser );

        isPlaying = true;

      });
  
  } else if (navigator.webkitGetUserMedia) {

    navigator.webkitGetUserMedia({audio: true}, function(mediaStream) {
      console.log('Getting user audio');
      localStream = mediaStream;
      mediaStreamSource = audioContext.createMediaStreamSource( mediaStream );

      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      mediaStreamSource.connect( analyser );

      isPlaying = true;

    }, function(error) { console.log(error); });

  } else {

    alert('This browser does not support use audio input');

  }

};

var rafID = null;
var tracks = null;
var buflen = 1024;
var buf = new Float32Array( buflen );

var noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

var noteFromPitch = function( frequency ) {
  var noteNum = 12 * (Math.log( frequency / 440 ) / Math.log(2) );
  return Math.round( noteNum ) + 69;
};

var frequencyFromNoteNumber = function( note ) {
  return 440 * Math.pow(2, (note - 69) / 12);
};

var centsOffFromPitch = function( frequency, note ) {
  return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note )) / Math.log(2) );
};

var MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
var GOOD_ENOUGH_CORRELATION = 0.9; // this is the 'bar' for how close a correlation needs to be


// The algorithm that calculates the autocorrelation (ac) which is equal to the pitch
var autoCorrelate = function( buf, sampleRate ) {
  var SIZE = buf.length;
  var MAX_SAMPLES = Math.floor(SIZE / 2);
  var bestOffset = -1;
  var bestCorrelation = 0;
  var rms = 0;
  var foundGoodCorrelation = false;
  var correlations = new Array(MAX_SAMPLES);

  for (var i = 0; i < SIZE; i++) {
    var val = buf[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) { // not enough signal
    return -1;
  }

  var lastCorrelation = 1;
  for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
    var correlation = 0;

    for (var i = 0; i < MAX_SAMPLES; i++) {
      correlation += Math.abs((buf[i]) - (buf[i + offset]));
    }
    correlation = 1 - (correlation / MAX_SAMPLES);
    correlations[offset] = correlation; // store it, for the tweaking we need to do below.
    if ((correlation > GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
      foundGoodCorrelation = true;
      if (correlation > bestCorrelation) {
        bestCorrelation = correlation;
        bestOffset = offset;
      }
    } else if (foundGoodCorrelation) {
      // short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
      // Now we need to tweak the offset - by interpolating between the values to the left and right of the
      // best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
      // we need to do a curve fit on correlations[] around bestOffset in order to better determine precise
      // (anti-aliased) offset.

      // we know bestOffset >=1, 
      // since foundGoodCorrelation cannot go to true until the second pass (offset=1), and 
      // we can't drop into this clause until the following pass (else if).
      var shift = (correlations[ bestOffset + 1] - correlations[ bestOffset - 1 ]) / correlations[bestOffset];  
      return sampleRate / ( bestOffset + (8 * shift));
    }
    lastCorrelation = correlation;
  }
  if (bestCorrelation > 0.01) {
    // console.log('f = ' + sampleRate/bestOffset + 'Hz (rms: ' + rms + ' confidence: ' + bestCorrelation + ')')
    return sampleRate / bestOffset;
  }
  return -1;
  //  var best_frequency = sampleRate/bestOffset;
};

var updatePitch = function() {
  analyser.getFloatTimeDomainData( buf );
  var ac = autoCorrelate( buf, audioContext.sampleRate );

  if (DEBUGCANVAS) {  // This draws the current waveform, useful for debugging
    waveCanvas.clearRect(0, 0, 512, 256);
    waveCanvas.strokeStyle = 'red';
    waveCanvas.beginPath();
    waveCanvas.moveTo(0, 0);
    waveCanvas.lineTo(0, 256);
    waveCanvas.moveTo(128, 0);
    waveCanvas.lineTo(128, 256);
    waveCanvas.moveTo(256, 0);
    waveCanvas.lineTo(256, 256);
    waveCanvas.moveTo(384, 0);
    waveCanvas.lineTo(384, 256);
    waveCanvas.moveTo(512, 0);
    waveCanvas.lineTo(512, 256);
    waveCanvas.stroke();
    waveCanvas.strokeStyle = 'black';
    waveCanvas.beginPath();
    waveCanvas.moveTo(0, buf[0]);
    for (var i = 1; i < 512; i++) {
      waveCanvas.lineTo(i, 128 + (buf[i] * 128));
    }
    waveCanvas.stroke();
  }

  if (ac === -1) {
    detectorElem.className = 'vague';
    // console.log('vague autocorrelation');
    pitchElem.innerText = '--';
    noteElem.innerText = '-';
    detuneElem.className = '';
    detuneAmount.innerText = '--';

    var note = 0;
    // console.log('Vague: ', note);
    noteArray.push( note );

  } else {
    detectorElem.className = 'confident';
    // console.log('confident autocorrelation');
    var pitch = ac;
    pitchElem.innerText = Math.round( pitch );


    var note = noteFromPitch( pitch );
    noteElem.innerHTML = noteStrings[note % 12];

    // store pitch into noteArray
    // 
    // in order to solve the octave issue
    // we are using the raw note value instead of (note % 12)
    // console.log('Updating pitch');
    // console.log('Confident: ', note);
    if (isNaN(note)) {
      note = 0;
    }

    noteArray.push(note);
    // console.log(noteArray.length);
    // console.log('note array: ', noteArray);
    // drawNoteGraph();

    var detune = centsOffFromPitch( pitch, note );
    if (detune === 0 ) {
      detuneElem.className = '';
      detuneAmount.innerHTML = '--';
    } else {
      if (detune < 0) {
        detuneElem.className = 'flat';
      } else {
        detuneElem.className = 'sharp';
      }
      detuneAmount.innerHTML = Math.abs( detune );
    }
  }
};

var getMax = function(array) {
  var max = array[0];
  array.forEach(function(el) {
    if (el > max) {
      max = el;
    }
  });
  return max;
};

var getAvgNote = function( noteArray ) {
  
  // var startIndex = avgNoteArray.length * 60;
  // var noteSet = noteArray.slice( startIndex, startIndex + 60 );

  var noteSet = noteArray.slice(-60);
  noteSet = noteSet.filter( function(note) {
    if (note!== 0) {
      return note;
    }
  });
  console.log(noteSet);
  var sum = 0;

  noteSet.forEach( function(note) {
    sum += note;
  });

  if (noteSet.length === 0) {
    noteSet = [0];
  }

  var avgNote = {
    id: avgNoteArray.length,
    value: Math.round(sum / noteSet.length)
  };

  console.log( avgNote.value );

  avgNoteArray.push ( avgNote );
};


// visualization of notes
var drawNoteGraph = function() {
  if (!graphCanvas) {
    return;
  }

  var factor = 256 / getMax(noteArray);

  noteCanvas.clearRect(0, 0, 2560, 256);
  noteCanvas.strokeStyle = 'red';
  noteCanvas.beginPath();
  noteCanvas.moveTo(0, 0);
  noteCanvas.lineTo(0, 256);
  noteCanvas.moveTo(0, 256);
  noteCanvas.lineTo(2560, 256);
  noteCanvas.stroke();

  noteCanvas.strokeStyle = 'black';
  noteCanvas.beginPath();

  var remainder = counter % 60;
  var seconds = (counter - counter % 60) / 60;

  if (seconds === 0) {
    avgNotes.push(noteArray[0]);
  } else if (remainder === 0) {
    avgNotes.push(getAvgNote(noteArray.slice((seconds - 1) * 60, seconds * 60)));
  } else {
    avgNotes.push(getAvgNote(noteArray.slice(seconds * 60)));
  } 

  console.log('avgNotes is: ', avgNotes);
  noteCanvas.moveTo(0, 256 - (avgNotes[0]) * factor);
  for (var i = 1; i < counter + 1; i++) {
    noteCanvas.lineTo(i, 256 - (avgNotes[i]) * factor);
  }
  noteCanvas.stroke();

  // noteCanvas.moveTo(0, 256 - (noteArray[0] + 1) * factor);
  // for (var i = 5; i < 5 * noteArray.length; i = i + 5) {
  //   noteCanvas.lineTo(i, 256 - (noteArray[i / 5] + 1) * factor);
  // }

  counter++;
};
