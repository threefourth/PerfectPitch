var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array( bufferLength );

var getUserAudio = function() {
  if (navigator.mediaDevices.getUserMedia) {

    navigator.mediaDevices.getUserMedia({audio:true})
      .then(function(mediaStream) {
        console.log('Getting user audio via mediaDevices.getUserMedia');
        var source = audioContext.createMediaStreamSource(mediaStream);

        source.connect(analyser);

        setInterval(updateGraph.bind(this, dataArray), 100);
      });

  } else if (navigator.webkitGetUserMedia) {

    navigator.webkitGetUserMedia({audio:true}, function(mediaStream) {
        console.log('Getting user audio via webkitGetUserMedia');
        var source = audioContext.createMediaStreamSource(mediaStream);

        source.connect(analyser);

        setInterval(updateGraph.bind(this, dataArray), 100);
      }, function(error) { console.log(error); });
    
  } else {

    alert('This browser does not support user audio input');

  }
}