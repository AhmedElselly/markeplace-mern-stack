const Shop = require('../models/shop');

module.exports = {
	getShopById(req, res, next, id){
		Shop.findById(id).exec((err, shop) => {
			if(err) return res.status(400).json({error: 'shop with that ID does not exist!'});
			req.shop = shop;
			next();
		});
	},

	async create(req, res){
		const shop = await new Shop(req.body);
		shop.owner._id = req.user._id;
		shop.owner.fullName = req.user.fullName;

		if(req.file){
			shop.image.data = req.file.buffer;
			shop.image.contentType = req.file.mimetype;
		}

		shop.save((err, shop) => {
			if(err) return res.status(400).json({error: err});
			return res.json(shop);
		});
	},

	async updateShop(req, res){
		const shop = await req.shop;
		shop.name = req.body.name;
		shop.description = req.body.description;
		
		if(req.file){
			shop.image.data = req.file.buffer;
			shop.image.contentType = req.file.mimetype;
		}

		shop.save((err, shop) => {
			if(err) return res.status(400).json({error: 'could not update the shop'});
			return res.json(shop);
		})
	},

	async shopIndex(req, res){
		const shops = await Shop.find().select('-image');
		return res.json(shops);
	},

	async getShop(req, res){
		const shop = await req.shop;
		shop.image = undefined;
		return res.json(shop);
	},

	async shopImage(req, res){
		res.set('Content-Type', req.shop.image.contentType);
		return res.send(req.shop.image.data);
	},

	async shopByOwner(req, res){
		const shops = await Shop.find({'owner._id': req.user._id}).select('-image');
		return res.json(shops);
	},

	async getOwner(req, res){
		const shopOwner = await Shop.findOne({'owner._id': req.user._id}).select('owner');
		return res.json(shopOwner);
	}
}