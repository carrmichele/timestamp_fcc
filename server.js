'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./app/routes/index.js');
var api = require('./app/api/timestamp_fcc.js');

// enables CORS for implementing cross-domain requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Conten-Type, Accept");
    next();
    
});

//returns middleware for parsing urlencoded bodies
app.use(bodyParser.urlencoded({extended: true})); 
// returns middleware that parses only JSON 
app.use(bodyParser.json()); 

//shows public folder
app.use('/public', express.static(process.cwd() + '/public'));

//sets port
var port = process.env.PORT || 8080;

routes(app);
api(app);

app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});