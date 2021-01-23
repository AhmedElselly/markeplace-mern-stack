const mongoose = require('mongoose');
const {Schema} = mongoose;

const shopSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		data: Buffer,
		contentType: String
	},
	owner: {
		_id: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		fullName: String
	}
});

module.exports = mongoose.model('Shop', shopSchema);