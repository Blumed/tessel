'use strict';

//Node Modules
const Tessel = require("tessel-io");
const five = require("johnny-five");

//Instanciate New Board
const board = new five.Board({
    io: new Tessel()
});

// Single LED
// board.on("ready", () => {
//     let led = new five.Led("a5");
//     led.blink(500);
// });

//Multiple LED
board.on("ready", () => {
    let leds = new five.Leds(["a2", "a3", "a4", "a5", "a6", "a7"]);
    let index = 0;
    let step = 1;

    board.loop(200, () => {

        // One at a time loop
        leds.off();
        leds[index].on();
        index += step;
        if (index === 0 || index === leds.length - 1) {
            step *= -1;
        }

        // On until max length loop
        // if (index === leds.length) {
        //     leds.off();
        //     index = 0;
        // } else {
        //     leds[index].on();
        //     index++;
        // }

        // Collision loop
        // leds.off();
        // leds[index].on();
        // leds[leds.length - index - 1].on();

        // index += step;

        // if (index === 0 || index === leds.length - 1) {
        //     step *= -1;
        // }
    });
});