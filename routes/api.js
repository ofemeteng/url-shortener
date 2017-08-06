var os = require('os');
var express = require('express');
var router = express.Router();
const shortid = require('shortid');
var mongoose = require('mongoose');
const uri = process.env.MONGOLAB_URI
var Uri = require('../models/Uri.model');
var createJson = require('../helpers/createJson');
var createErrorResponse = require('../helpers/createErrorResponse');

/* GET home page. */
// route /url/:urlParam(.+)
router.get(/^\/url\/(.+)(?:\/(?=$))?$/i, function(req, res, next) {
	var url = req.params['0']
	var validUrl = isUrlValid(url)
	if (validUrl) {
		var promise = mongoose.connect(uri, {
			useMongoClient: true,
			reconnectTries: 30
		});
		promise.then(function(db) {
			console.log('Connected successfully to mlab database');
			var short_id = shortid.generate()
			Uri.findOneOrCreate({original_uri: url}, {_id: short_id, original_uri: url}, function(err, uri) {
				var hostname = os.hostname();
				var original_url = uri.original_uri
				var short_url = `${hostname}/${uri._id}`
				createJson(res, original_url, short_url);
			});
		});		
	} else {
		var message = 'Wrong URL format, make sure the URL has a protocol and is correct';
		createErrorResponse(res, message);
	}	
});

function isUrlValid(url) {
	var regex = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?');
	if (regex.test(url)) {
		return true;
	} else {
		return false;
	}
}

module.exports = router;
