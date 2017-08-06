const mongoose = require('mongoose');
const shortid = require('shortid');
const findOneOrCreate = require('mongoose-find-one-or-create');
const Schema = mongoose.Schema;

const UriSchema = new Schema({
	_id: {
		type: String,
		'default': shortid.generate
	},
	original_uri: String
});
UriSchema.plugin(findOneOrCreate);

module.exports = mongoose.model('Uri', UriSchema);