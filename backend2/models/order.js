const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartItemsSchema = new Schema({
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Pro'
	},
	quantity: Number,
	shop: {
		type: Schema.Types.ObjectId,
		ref: 'Shop'
	},
	status: {
		type: String,
		default: 'Not processed',
		enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
	}

});

const CartItem = mongoose.model('CartItem', cartItemsSchema);

const orderSchema = new Schema({
	customer_name: {
		type: String,
		trim: true,
		required: 'Name is required!'
	},
	customer_email: {
		type: String,
		trim: true,
		match: [/.+\@.+\..+/, 'please fill a valid email address.'],
		required: 'Email is required!'
	},
	order_by: {
		type: Schema.Types.ObjectId, 
		ref: 'User'
	},
	delivery_address: {
		street: {
			type: String,
			required: 'Street is required!'
		},
		city: {
			type: String,
			required: 'City is required!'
		},
		state: {
			type: String
		},
		zipcode:{
			type: String,
			required: 'Zipcode is required!'
		},
		country: {
			type: String,
			required: 'Country is required!'
		}
	},
	paymentId: {
		type: String
	},
	card: {},
	products: [cartItemsSchema]
});


const Order = mongoose.model('Order', orderSchema);

module.exports = {CartItem, Order};