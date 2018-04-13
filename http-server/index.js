// HTTP Request routing library
const router = require('tiny-router'),
    // Websocket library
    ws = require("nodejs-websocket"),
    // Use fs for static files
    fs = require('fs'),
Tessel = require("tessel-io"),
five = require("johnny-five"),
    // Use tessel for changing the LEDs
    tessel = require('tessel');

//Instanciate New Board
const board = new five.Board({
    io: new Tessel()
});
board.on("ready", () => {
    // When the router gets an HTTP request at /leds/[NUMBER]
    router.get("/leds/{led}", function (req, res) {
        console.log('which led?', req.body.led)
        //Multiple LED
        let leds = new five.Leds(["a0", "a1", "a2", "a3", "a4", "a5"]);
        // Grab the LED being toggled
        var index = req.body.led;

        // Toggle the LED
        leds[index].toggle();
        // Send a response
        res.send(200);
    });

});

// The router should use our static folder for client HTML/JS
router.use('static', { path: __dirname +'/static' })
    // Use the onboard file system (as opposed to microsd)
    .use('fs', fs)
    // Listen on port 8080
    .listen(8080);

// Create a websocket server on port 8001
ws.createServer(function (conn) {
    console.log("New connection")
    // When we get a packet from a connection
    conn.on("text", function (str) {

        console.log("Received " + str)
        // Parse it as JSON
        var command = JSON.parse(str);
        // Actually set the LED state
        tessel.led[command.led].output(command.on)
        // Echo it back to confirm
        conn.sendText(JSON.stringify(command));
    });
    // Notify the console when the connection closes
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(8081)

console.log('Running Server');