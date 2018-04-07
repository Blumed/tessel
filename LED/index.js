'use strict';

const Tessel = require("tessel-io");
const five = require("johnny-five");

const board = new five.Board({
    io: new Tessel()
});

board.on("ready", () => {
    let led = new five.Led("a5");
    led.blink(500);
});