/**
 * Created by ricardomendes on 15/03/15.
 */

var socket;

$(document).ready(function () {

    socket = io.connect('http://127.0.0.1:8080/');

    socket.on('connect', function () {
        socket.emit('join', {username: "Consummer2", room: "MAC_1_1"});
    });

    /*socket.on('update', function (dataSocket) {
        console.log(dataSocket);
    });*/
});

function sendData() {
    console.log('{numMotor : ' + $("#numMotor").val() + ',speed: ' + $("#speed").val() + '}');
    //socket.emit('gamepad', {numMotor: $("#numMotor").val(), speed: $("#speed").val()});
    socket.emit('send', {numMotor: $("#numMotor").val(), speed: $("#speed").val()});
}

