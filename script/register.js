var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/userdatabase', {useNewUrlParser: true, useUnifiedTopology:true});

var userdb = mongoose.connection;
userdb.on('error', console.log.bind(console, "connection error"));
userdb.once('open', function (callback) {
    console.log("connection succeeded");
})

var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;

    var data = {
        "name": name,
        "email": email,
        "password": password,
        "phone": phone
    }

    userdb.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Register Successfully");
    });

    return res.redirect('login.html');
});

app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    res.redirect('login.html');
}).listen(3000);

console.log("server listening at port 3000");
