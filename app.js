
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var ApplicantModel = require('./models/applicantmodel.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// connect to MongoDB
mongoose.connect('mongodb://localhost/insights');

//renders the index page
app.get('/', function(req, res){
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	var data = ApplicantModel.find({}, function(err, docs) {
		console.log('data', docs);
		res.render('applicants', {applicants: docs} );
	});
	
});

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it
	var newApplicant = new ApplicantModel(req.body);
	console.log('req.body',req.body);
	newApplicant.save(function(err){
		res.render('success');
	});
	
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
