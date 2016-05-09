module.exports = function (io) {
    'use strict';

    var usernames = {};

    var config = require('../config/myConfig.js');
    var util = require('util');
    var spawn = require('child_process').spawn;
    var ls = spawn(config.myconfig.scriptMotor);

    ls.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });


    io.sockets.on('connection',
        /**
         * Permite conectar um novo cliente a um canal
         *
         * *Exemplo:*
         *      var socket = io.connect('http://192.168.160.98:8080');
         *
         * @param      {String}   socket Endereço do Servidor
         * @return     {Array} an array of string path
         */
        function connect(socket) {

            socket.on('join',
                /**
                 * Permite adicionar um novo cliente a um canal
                 *
                 * *Exemplo:*
                 *      socket.emit('join', "Publisher", "Channel");
                 *
                 * @param      {String}   username Nome do utilizador
                 * @param      {String}   channel Nome do canal
                 * @return     {Array} an array of string path
                 */
                function join(username, channel) {
                    socket.username = username;
                    socket.channel = channel;

                    socket.join(socket.channel);
                });

            socket.on('gamepad',

                function gamepad(data) {

                    ls.stdin.write(data.numMotor + ',' + data.speed + '\n');

                    console.log(data);
                });

            socket.on('send',
                /**
                 * Permite enviar dados através de um canal
                 *
                 * *Exemplo:*
                 *      socket.emit('send', {'DATA':'exampleData'});
                 *
                 * @param      {Object}   data Nome do utilizador
                 * @return     {Array} an array of string path
                 */
                function send(data) {
                    console.log(data);
                    ls.stdin.write(data.numMotor + ',' + data.speed + '\n');
                    //io.sockets.in(socket.channel).emit('update', {username: socket.username, data: data});
                });

            socket.on('switchChannel',
                /**
                 * Permite mudar de canal
                 *
                 * *Exemplo:*
                 *      socket.emit('switchChannel', 'newChannel');
                 *
                 * @param      {String}   newchannel Nome do canal
                 * @return     {Array} an array of string path
                 */
                function switchChannel(newchannel) {
                    socket.leave(socket.channel);
                    socket.join(newchannel);
                    socket.channel = newchannel;
                });

            socket.on('disconnect',
                /**
                 * Permite adicionar um novo cliente a um canal
                 *
                 * *Exemplos:*
                 *      socket.emit('disconnect');
                 *
                 */
                function disconnect() {
                    console.log('disconnect detected');
                });
        });
};