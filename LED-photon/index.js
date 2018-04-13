var Barcli = require("barcli");
var five = require("johnny-five");
var Tessel = require("tessel-io");
// var board = new five.Board({
//     io: new Tessel(),
//     // Experiment 3 explains these options
//     repl: false,
//     debug: false,
// });

// board.on("ready", function () {
//     var graph = new Barcli({
//         color: "white",
//         label: "Light Level",
//         range: [0, 1],
//     });
//     var light = new five.Light("a7");
var board = new five.Board({
    io: new Tessel()
});
board.on("ready", () => {
    var light = new five.Light("a7");
    var nightlight = new five.Led("b6");
    var dimmest = 1023;
    var brightest = 0;

    light.on("change", () => {
        var relativeValue;
        if (light.value < dimmest) {
            dimmest = light.value;
        }
        if (light.value > brightest) {
            brightest = light.value;
        }
        relativeValue = five.Fn.scale(light.value, dimmest, brightest, 0, 511);
        if (relativeValue <= 255) {
            nightlight.brightness(255 - relativeValue);
        } else {
            nightlight.off();
        }
    });
});