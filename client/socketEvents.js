// $(document).ready(function () {
//   var socket = io('http://localhost:8000');
//
//   $(.song-entry).on('click', function(event){
//       console.log('Something has been clicked!');
//       console.dir(event.target);
//       socket.emit('myClick', {id: event.target});
//   });
//
//   socket.on('myClick', function (data) {
//     console.log('event hit other client');
//     $(data.id).trigger('click');
//   });
// });
