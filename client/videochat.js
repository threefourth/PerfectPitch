$(document).ready(function() {
  var c_width = 100;
  var c_height = 200;
  // Setup elements
  var receiver = document.getElementById('receiver');
  var canvas = document.getElementById('preview');
  var ctx = canvas.getContext('2d');
  var video = document.getElementById('client');
  // Set the display region dimensions
  receiver.style.height = c_height;
  receiver.style.width = c_width;
  canvas.width = c_width;
  canvas.height = c_height;
  // Socket connection
  var socket = io.connect('http://localhost:8000');
  /**
   * Display incoming data
   */
  socket.on('update', function(data) {
      receiver.src = data;
  });
  /**
   * Broadcast client
   */
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true}, function(stream) { video.src = stream; }, function(error) { log('Capture error ' + error); });
      function draw(v, ctx, w, h) {
          ctx.drawImage(v, 0, 0, w, h);
          socket.emit('data', canvas.toDataURL("image/png"));
          setTimeout(function() { draw(v, ctx, w, h); }, 500);
      }
      draw(video, ctx, c_width, c_height);
  } else {
      $(canvas).hide();
      $(video).hide();
  }
});
