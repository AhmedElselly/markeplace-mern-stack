const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
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
	category: {
		type: String
	},
	quantity: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	shop: {
		type: Schema.Types.ObjectId,
		ref: 'Shop'
	}
})

module.exports = mongoose.model('Pro', productSchema);