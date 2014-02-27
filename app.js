
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var ApplicantModel = require('./models/applicantmodel.js');
var ApplicantController = require('./controllers/applicantController.js');

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
app.get('/', ApplicantController.index);

// displays a list of applicants
app.get('/applicants', ApplicantController.listAll);

// creates an applicant
app.post('/applicant', ApplicantController.addNew);

// delete an applicant
app.get('/applicants/remove/:id', ApplicantController.remove);
app.get('/applicants/removeAjax/:id', ApplicantController.removeAjax);

// render one applicant
app.get('/applicants/:id', ApplicantController.listOne);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
