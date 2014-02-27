var ApplicantModel = require('../models/applicantmodel.js');

module.exports = {

	index: function(req, res){
	res.render('index');
	},

	listAll: function(req, res){
		ApplicantModel.find({}, function(err, docs) {
			// console.log('data', docs);
			res.render('applicants', {applicants: docs} );
		});
	},

	addNew: function(req, res){
		var newData = req.body;
		newData.skills = newData.skills.split(', ');
		var newApplicant = new ApplicantModel(newData);
		// console.log('req.body',newData);
		newApplicant.save(function(err){
			res.render('success');
			});
	},

	remove: function(req, res){
		var removeID = req.params.id;
		ApplicantModel.remove({_id:removeID}, function(err, doc){
			res.redirect('applicants');
		});
	},

	removeAjax: function(req, res){
		var removeID = req.params.id;
		ApplicantModel.remove({_id:removeID}, function(err, doc){
			err ? res.send(err) : false;
		});
	},

	listOne: function(req, res){
		var listID = req.params.id;
		ApplicantModel.findById(listID, function(err, doc) {
			res.render('applicant', {applicant:doc});
		});
	}
}