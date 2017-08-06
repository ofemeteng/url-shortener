const createJson = function(res, original_url, short_url) {
	return res.format({
  	'application/json': function() {
  		res.send({
  			original_url: original_url,
  			short_url: short_url
  		});
  	}
  });
}

module.exports = createJson;