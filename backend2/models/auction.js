const mongoose = require('mongoose');
const {Schema} = mongoose;

const auctionSchema = new Schema({
	itemName: {
		type: String,
		trim: true,
		required: 'Item name is required!'
	},
	description: {
		type: String,
		trim: true,
		required: 'Item description is required!'
	},
	image: {
		data: Buffer,
		contentType: String
	},
	seller: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	bidStart: {
		type: Date,
		default: Date.now
	},
	bidEnd: {
		type: Date,
		default: Date.now,
		required: 'Auction end time is required!'
	},
	startingBid: {
		type: Number,
		default: 0
	},
	bids: [
		{
			bidder: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
			bid: Number,
			time: Date
		}
	]
});

module.exports = mongoose.model('Auction', auctionSchema);