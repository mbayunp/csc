const { Booking } = require('./src/models');
Booking.findAll().then(b => console.log(JSON.stringify(b, null, 2))).catch(e => console.error(e));
