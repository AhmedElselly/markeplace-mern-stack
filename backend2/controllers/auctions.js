const Auction = require('../models/auction');

module.exports = {
	getAuctionById(req, res, next, id){
		Auction.findById(id).populate('seller', '-password').populate('bids.bidder').exec((err, auction) => {
			if(err) return res.status(400).json({err});
			req.auction = auction;
			next();
		});
	},

	create(req, res){
		const auction = new Auction(req.body);
		auction.seller = req.user;
		auction.bidStart = req.body.bidStart;
		auction.bidEnd = req.body.bidEnd;
		if(req.file){
			auction.image.data = req.file.buffer;
			auction.image.contentType = req.file.mimetype;
		}
		auction.save((err, auction) => {
			if(err) return res.status(400).json({err});
			return res.json(auction);
		});
	},

	getAuctionImage(req, res){
		res.set('Content-Type', req.auction.image.contentType);
		return res.send(req.auction.image.data);
	},

	getAuction(req, res){
		req.auction.image = undefined;
		return res.json(req.auction);
	},

	async auctionIndex(req, res){
		const auctions = await Auction.find({}).populate('seller').select('-image');
		return res.json(auctions);
	},

	async auctionsListOpen(req, res){
		const auctions = await Auction.find({bidEnd: {$gt: new Date()}})
			.sort('bidStart')
			.populate('seller')
			.select('-image');
		return res.json(auctions);
	},

	async auctionsByBidder(req, res){
		const auctions = await Auction.find({'bids.bidder': req.user._id})
			.populate('seller')
			.populate('bids.bidder')
			.select('-image');
		return res.json(auctions);
	},

	async auctionsBySeller(req, res){
		const auctions = await Auction.find({seller: req.user._id})
			.populate('seller')
			.populate('bids.bidder')
			.select('-image');

		return res.json(auctions);
	}
}