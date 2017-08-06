var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const uri = process.env.MONGOLAB_URI;
var Uri = require('../models/Uri.model');
var createErrorResponse = require('../helpers/createErrorResponse');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'URL Shortener API' });
});

router.get('/:urlParam', function(req, res, next) {
  var promise = mongoose.connect(uri, {
		useMongoClient: true,
		reconnectTries: 30
	});
  promise.then(function(db) {
		console.log('Connected successfully to mlab database');
		Uri.findOne({ _id:  req.params.urlParam }, function (err, docs) {
			if (docs) {
				res.redirect(docs.original_uri);
			} else {
				var message = 'This URL does not exist in our database';
				createErrorResponse(res, message);
			}
		});
	});
});

module.exports = router;
