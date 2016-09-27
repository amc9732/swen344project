var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');

console.log('Server started. Serving dist/ folder.');

//Connect to our MySQL database hosted on Heroku
// var connection = mysql.createConnection({
//     host: "us-cdbr-iron-east-04.cleardb.net",
//     user: "b421d9d0efc603",
//     password: "f96ce1ba",
//     database: "heroku_a783285fe27a1fb"
// });
// connection.connect(function(e) {
//     return e ? 
//         void console.log("Error connecting to database...") : 
//         void console.log("Connection to Heroku MySQL database successfully established.")
// });

/*
This is used for production only. Server usage during development 
is done with a gulp plugin by running: `gulp dev`
*/

//Make express look for static files at project root, not root of node.js
app.use(express.static(__dirname + '/'));

// serve index.html at the / URL using http GET
app.get('/', function(req, res) {
	console.log('PATH NAME: ' + path.join(__dirname));
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);