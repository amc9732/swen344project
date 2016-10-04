var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');

var dbconfig = require('./config');

console.log('Node environment currently set to ' + process.env.NODE_ENV);

switch(process.env.NODE_ENV) {

	case 'production':
    	var connection = mysql.createConnection({
		    host: dbconfig.prod.hostname,
		    user: dbconfig.prod.username,
		    password: dbconfig.prod.password
		});
		connection.connect(function(e) {

			if (e) {
				console.error('Error connecting: \n' + e.stack);
				return;
			}  
		    console.log("Connection to production database successful");
		});
		break;

	default:
		var connection = mysql.createConnection({
	    	host: dbconfig.dev.hostname,
	    	user: dbconfig.dev.username,
	    	password: dbconfig.dev.password,
	    	database: dbconfig.dev.database
	    });
	    connection.connect(function(e) {

	    	if(e) {
	    		console.error('Error connecting: \n' + e.stack);
	    		return;
	    	}
		    console.log("Connection to development database successful")
		});
}

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