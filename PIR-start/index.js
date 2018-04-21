/*********************************************
This basic PIR example emits events when
a body is detected and when a body exits
the field.
*********************************************/

const tessel = require('tessel');
const pir = require('pir').use(tessel.port.A.pin[2]);

pir.on('ready', pir => {
    console.log('Ready and waiting...');
    pir.on('movement:start', time => {
        console.log(`Truck poop! Time ${time}`);
    });
    pir.on('movement:end', time => {
        console.log(`Truck dumped. Time ${time}`);
    });
});