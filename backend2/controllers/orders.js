const {Order, CartItem} = require('../models/order');

module.exports = {
	getOrderById(req, res, next, id){
		Order.findById(id).populate('products.product', 'name price')
			.populate('products.shop', 'name').exec((err, order) => {
			if(err) return res.status(400).json({error: 'Could not find the order with that ID!'});
			req.order = order;
			next();
		});
	},

	async createOrder(req, res){
		console.log('order.req.body', req.body)
		let order = await new Order(req.body.checkoutDetails);
		// order.delivery_address.street = req.body.delivery_address;
		order.order_by = req.user;
		order.paymentId = req.session.paymentId;
		// order.card = req.session.card;
		order.save((err, order) => {
			console.log(err)
			if(err) return res.status(400).json({error: err});
			console.log('callback order, ', order)
			return res.json(order);
		})
	},

	async listByShop(req, res){
		let orders = await Order.find({'products.shop': req.shop._id})
			.populate({path: 'products.product', select: '_id name price'})
			.sort('-created')
			.exec()
		return res.json(orders);
	},

	async getOrderStatuses(req, res){
		const statuses = await CartItem.schema.path('status').enumValues;
		return res.json(statuses);
	},

	async updateOrderStatus(req, res){
		console.log('finding CartItemId',req.body)
		const status = await Order.updateOne({'products._id': req.body.cartItemId}, {'products.$.status': req.body.status});
		return res.json(status);
	}
}