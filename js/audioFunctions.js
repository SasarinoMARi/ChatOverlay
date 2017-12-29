
var audio = new Audio('snd/FFXIV_Incoming_Tell_3.wav');

function playSnd(type) {
    if (type >= 18 && type <= 20)
        audio.play();
}