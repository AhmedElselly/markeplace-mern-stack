const Pro = require('../models/product');

module.exports = {
	getProductById(req, res, next, id){
		Pro.findById(id).populate('shop', '_id name').exec((err, product) => {
			if(err) return res.status(400).json({error: 'product with that ID does not exist!'});
			req.product = product;
			next();
		});
	},

	async create(req, res){
		const pro = await new Pro(req.body);
		pro.shop = req.body.shop;

		if(req.file){
			pro.image.data = req.file.buffer;
			pro.image.contentType = req.file.mimetype;
		}

		pro.save((err, pro) => {
			if(err) return res.status(400).json({error: err});
			return res.json(pro);
		});
	},

	async getProducts(req, res){
		const products = await Pro.find({shop: req.shop._id}).populate('shop', '_id name').select('-image');
		// product.image.data = undefined;
		// console.log('products')
		return res.json(products);
	},

	getProductImage(req, res){
		res.set('Content-Type', req.product.image.contentType);
		return res.send(req.product.image.data);
	},

	async getSingleProduct(req, res){
		req.product.image = undefined;
		return res.json(req.product);
	},

	async listRelated(req, res){
		const products = await Pro.find({'_id': {'$ne': req.product}, 'category': req.product.category}).select('-image')
			.limit(5).populate('shop', '_id name').exec();
		return res.json(products);
	},

	async update(req, res){
		const product = await req.product;
		product.shop = await req.body.shop;
		product.name = await req.body.name;
		product.description = await req.body.description;
		product.price = await req.body.price;
		product.category = await req.body.category;
		product.quantity = await req.body.quantity;

		if(req.file){
			product.image.data = req.file.buffer;
			product.image.contentType = req.file.mimetype;
		}

		product.save((err, product) => {
			if(err) return res.status(400).json({error: err});
			return res.json(product);
		});
	},

	async listCategories(req, res){
		const products = await Pro.distinct('category', {});
		return res.json(products);
	},

	async searchList(req, res){
		const query = {};
		console.log(req.query);
		if(req.query.search){
			query.name = {$regex: req.query.search, $options: 'i'};
		}

		if(req.query.category && req.query.category != 'All'){
			query.category = req.query.category;
		}
		console.log(query)
		try {
			let products = await Pro.find(query).populate('shop', '_id name owner').select('-image').exec();
			// console.log(products)
			return res.json(products);
		} catch(err){
			return res.status(400).json({error: 'something wrong occured'});
		}
	},

	getStripePublicKey(req, res){
		console.log(process.env.STRIPE_PUBLIC_KEY);
		return res.json(process.env.STRIPE_PUBLIC_KEY);
	},

	async decreaseQuantity(req, res, next){
		console.log('req.body', req.body)
		let bulkOps = req.body.checkoutDetails.products.map(item => {
			return {
				'updateOne': {
					'filter': {'_id': item.product._id},
					'update': {'$inc': {'quantity': -item.quantity}}
				}
			}
		})

		try{
			await Pro.bulkWrite(bulkOps, {});
			next()
		} catch(err){
			return res.status(400).json({error: 'Could not update product'});
		}
	}
}