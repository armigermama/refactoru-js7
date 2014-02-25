var mongoose = require('mongoose');


var ApplicantSchema = mongoose.Schema ({
	name: 	String,
	bio: 	String,
	skills: [String],
	years: 	Number,
	why: 	String
});

var ApplicantModel = module.exports = mongoose.model('applicant', ApplicantSchema);

