'use strict'
var tell1 = new Audio('snd/FFXIV_Incoming_Tell_1.wav');
var tell3 = new Audio('snd/FFXIV_Incoming_Tell_3.wav');

function playSnd(type) {
    switch (type) {
        case 'tell1':
            tell1.play();
            break;
        case 'tell3':
            tell3.play();
            break;
    }
}