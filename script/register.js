var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect('mongodb://locolhost:27017/userdatabase');

var database=mongoose.connection;
database.on('error', console.log.bind(console, "connection error"));
database.once('open', function(callback) {
    console.log("connection secceeded");
})

var app=express();
app.use(bodyParser)