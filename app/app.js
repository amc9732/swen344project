var express = require('express');
var app = express();
var path = require('path');

// serve index.html at the / URL using http GET
app.get('/', function(req, res) {
	app.use(express.static(__dirname + '/'));
    res.sendFile(path.join(__dirname + '/index.html'));
});

// app.get('/home', function(req, res) {
// 	app.use(express.static(__dirname + '/'));
// 	res.sendFile(path.join(__dirname + '/templates/home.html'));
// });

app.listen(process.env.PORT || 5000);

