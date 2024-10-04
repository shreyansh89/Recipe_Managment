const express = require('express');

const port = 8080;

path = require("path");

const passport = require('passport')

const session = require('express-session');

const db = require('./config/mongoose');
const jwt = require('./config/passport-jwt-stratergy');

const app = express();

app.use(
    session({
        name: "jwt",
        secret: "jwt",
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
    })
)

app.use(passport.initialize());
app.use(passport.session())

app.use(express.urlencoded())

app.use('/user', require('./routes/user'));
app.use('/post', require('./routes/post'));




app.listen(port,(err)=>{
    if(err){
        console.log("server not running");
        return false
    }
    console.log("server running in port " + port);
    
})