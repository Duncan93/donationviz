var mongo = require('../models/mongo.js');

// modify this to send title as well
function findDocument(collection, query, template, res) {
	mongo.find(collection, query, function(doc) {
		var header;
		if (query.cid) {
			header = doc[0].first_name + ' ' + doc[0].last_name;
		} else {
			header = query.name;
		}
		res.render(template, {obj: doc, header: header});
	});
}

exports.loadSenator = function(req, res) {
	var query = {"cid": req.params.cid}
	findDocument('senators', query, 'senator', res);
}
exports.loadOrganization = function(req, res) {
	var query = {"name": req.params.encodedname}
	findDocument('organizations', query, 'organization', res);
}

// In the case that no route has been matched
exports.errorMessage = function(req, res){
  var message = '<p>Error, did not understand path '+req.path+"</p>";
	// Set the status to 404 not found, and render a message to the user.
  res.status(404).send(message);
};