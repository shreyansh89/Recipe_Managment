const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/Recipe_Management');

const db = mongoose.connection;

db.once('open', (err) => {
    if(err){
        console.log("db not connect");
    }
    console.log("db is connected");
});


module.exports = db;