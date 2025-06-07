const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/f8_nodejs');
        console.log('connect successfully!!!');
    } catch (error) {
        console.log('error connect', error);
    }
}

module.exports = { connect };
