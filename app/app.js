var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
require('dotenv').config();//allows us to use the environment variables from Heroku, which are also in .env

console.log('Node environment currently set to ' + process.env.NODE_ENV);

//process.env['xxxxx'] are environment variables set in Heroku, so its securely located
//and dont need a config file anymore
switch(process.env.NODE_ENV) {
	case 'production':
    	var connection = mysql.createConnection({
		    host: process.env['PROD_HOSTNAME'],
		    user: process.env['PROD_USERNAME'],
		    password: process.env['PROD_PASSWORD']
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
	    	host: process.env['DEV_HOSTNAME'],
		    user: process.env['DEV_USERNAME'],
		    password: process.env['DEV_PASSWORD'],
	    	database: process.env['DEV_DATABASE']
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

app.listen(process.env.PORT || 5000);