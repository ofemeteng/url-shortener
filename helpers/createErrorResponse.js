const createErrorResponse = function(res, message) {
	return res.format({
  	'application/json': function() {
  		res.send({
  			error: message
  		});
  	}
  });
}

module.exports = createErrorResponse;