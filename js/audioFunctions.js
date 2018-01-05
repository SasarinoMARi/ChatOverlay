
var audio1 = new Audio('snd/FFXIV_Incoming_Tell_1.wav');
var audio3 = new Audio('snd/FFXIV_Incoming_Tell_3.wav');

function playSnd(type) {
    switch (type) {
        case 1:
            audio1.play();
            break;
        case 3:
            audio3.play();
            break;
    }
}