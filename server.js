

// call the packages we need

var express	= require('express');
var cors 	= require('cors');
var app		= express();
var http = require('http').Server(app);
var bodyParser	= require('body-parser');

var dbConfig = require('./app/config/db');
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

app.use(cors());

app.set('bookshelf', bookshelf);

//Creating a Model for the User Table
//var Users = require('./app/models/user_model.js')(bookshelf);


//Creating a Model for the gcm table
//var GCMDB = require('./app/models/gcm_model.js')(bookshelf,Users);

//configure app to use bodyParser()
// this will let us get the data from a POST
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
 
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = 8080;

//ROUTES FOR OUR API
//==============================================
var router = express.Router();

//test route to make sure everything is working

router.use(function(req, res, next) {
	//do logging
	console.log('Something Happens!');
	next();
});


router.get('/', function(req,res){
	res.json({ message: 'horray! welcome to our api!' });
});

// more routes for our API will happen here


//API Call for /api/gcm to register gcm reg_ids with the backend
//require('./app/routes/gcm/gcm_route')(router, Session, GCMDB, error_json, success_json, check_session);

//API Call for /api/gcm/send to test gcm
//require('./app/routes/gcm/gcm_send_route')(router,GCMDB, knex, error_json, success_json, check_session);

// REGISTER OUR ROUTES ----------
// all of our routes will be prefixed with /api

app.use('/api', router);

http.listen(port, function(){
  console.log('listening on *:'+ port);
});

console.log('Magic happens on port ' + port);

