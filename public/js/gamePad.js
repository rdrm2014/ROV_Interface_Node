/**
 * Created by ricardomendes on 13/05/15.
 * https://dvcs.w3.org/hg/gamepad/raw-file/default/gamepad.html
 */
var hasGP = false;
var repGP;

function canGame() {
    return "getGamepads" in navigator;
}

function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];

    socket.emit('gamepad', {
        'button1':(gp.buttons[0].pressed) ? true : false,
        'button2':(gp.buttons[1].pressed) ? true : false,
        'button3':(gp.buttons[2].pressed) ? true : false,
        'button4':(gp.buttons[3].pressed) ? true : false,
        'buttonL1':(gp.buttons[4].pressed) ? true : false,
        'buttonR1':(gp.buttons[5].pressed) ? true : false,
        'buttonL2':(gp.buttons[6].pressed) ? true : false,
        'buttonR2':(gp.buttons[7].pressed) ? true : false,
        'buttonSelect':(gp.buttons[8].pressed) ? true : false,
        'buttonStart':(gp.buttons[9].pressed) ? true : false,
        'buttonLeftStick':(gp.buttons[10].pressed) ? true : false,
        'buttonRightStick':(gp.buttons[11].pressed) ? true : false,
        'stick2':{'x':gp.axes[3], 'y':gp.axes[2]},
        'stick3':{'x':gp.axes[4], 'y':gp.axes[5]}        
    });
    
    $("#button1").css({'fill': (gp.buttons[0].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#button2").css({'fill': (gp.buttons[1].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#button3").css({'fill': (gp.buttons[2].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#button4").css({'fill': (gp.buttons[3].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#buttonL1").css({'fill': (gp.buttons[4].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#buttonR1").css({'fill': (gp.buttons[5].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#buttonL2").css({'fill': (gp.buttons[6].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#buttonR2").css({'fill': (gp.buttons[7].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#buttonSelect").css({'fill': (gp.buttons[8].pressed) ? '#2989d8' : '#4d4d4d'});
    $("#buttonStart").css({'fill': (gp.buttons[9].pressed) ? '#2989d8' : '#4d4d4d'});
    $("#buttonLeftStick").css({'fill': (gp.buttons[10].pressed) ? '#2989d8' : '#4d4d4d'});
    $("#buttonRightStick").css({'fill': (gp.buttons[11].pressed) ? '#2989d8' : '#4d4d4d'});

    $("#button4L").css({'fill': (gp.axes[3]==-1) ? '#2989d8' : '#5a5a5a'});
    $("#button2L").css({'fill': (gp.axes[3]==1) ? '#2989d8' : '#5a5a5a'});
    $("#button1L").css({'fill': (gp.axes[2]==-1) ? '#2989d8' : '#5a5a5a'});
    $("#button3L").css({'fill': (gp.axes[2]==1) ? '#2989d8' : '#5a5a5a'});
}

$(document).ready(function() {

    if(canGame()) {
        console.log("Iniciar GamePad!");

        $(window).on("gamepadconnected", function() {
            hasGP = true;
            console.log("Gamepad ligado!");
            repGP = window.setInterval(reportOnGamepad,100);
        });

        $(window).on("gamepaddisconnected", function() {
            console.log("Iniciar GamePad!");
            window.clearInterval(repGP);
        });

        var checkGP = window.setInterval(function() {
            console.log('checkGP');
            if(navigator.getGamepads()[0]) {
                if(!hasGP) $(window).trigger("gamepadconnected");
                window.clearInterval(checkGP);
            }
        }, 500);
    }
});