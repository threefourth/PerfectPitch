require('socket.io-client');
$(document).on('click', function(event){
    console.log('Something has been clicked!' + event.target);
    socket.emit('myClick', {id: event.target});
});

var socket = io.connect('http://localhost');

socket.on('myClick', function (data) {
    $(data.id).trigger('click');
});
