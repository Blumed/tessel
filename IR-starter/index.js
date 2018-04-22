
var tessel = require('tessel');

var infraredlib = require('ir-attx4');
var infrared = infraredlib.use(tessel.port['A']);

var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['B']);

var play = new Buffer('238ceed00258fdda0226f98e0258f98e0226f98e0226fdda0258f98e0226f98e0258f98e0226f98e0258f98e0226f98e0258fdda0226fdda0258fdda0226fdda0258f98e0226f98e0258f98e0226f98e0226f95c0226f98e0258fdda0226f98e0258fdda0226f98e0258f9c00258fdda0226fdda0258f98e0226fdda0258f98e0226f95c0226', 'hex');
var pause = new Buffer('235aee9e0258fdda0226f98e0258f98e0226f98e0258fdda0226f98e0258f98e0226f98e0258f98e0226f98e0258f98e0226fdda0226fda80226fdda0226fda80226f98e0226f95c0226f98e0226f98e0258f98e0226f95c0226fdda0226f98e0258fdda0226f98e0258f98e0226fdda0258fdda0226f98e0258fdda0226f98e0258f98e0226', 'hex');

ambient.on('ready', function () {
    // Get points of light and sound data.
    setInterval(function () {
        ambient.getSoundLevel(function (err, sounddata) {
            // if (err) throw err;
            // console.log("Sound Level:", sounddata.toFixed(8));
            if(sounddata > 0.05) {
                infrared.sendRawSignal(38, play, function(err) {
                    if (err) {
                        console.log('errorfest', err);
                    } else {
                        console.log('signal sent');
                    }
                });
            }
        });
    }, 250); // The readings will happen every .25 seconds
});

ambient.on('error', function (err) {
    console.log(err);
});