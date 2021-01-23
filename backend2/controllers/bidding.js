const Auction = require('../models/auction');

function bidding(server){
	const io = require('socket.io')(server, {
		cors: {
    		origin: "http://localhost:3000"
    	}
  	});

	io.on('connection', socket => {
		socket.on('join auction room', data => {
			console.log('join auction room', data)
			socket.join(data.room);
		});
		socket.on('leave auction room', data => {
			console.log('leave auction room', data)
			socket.leave(data.room);
		});

		socket.on('new bid', data => {
			// console.log(data)
			bid(data.bidInfo, data.room);
		})
	});

	const bid = async (bid, auction) => {
		console.log('bid', bid)
		// let result = await Auction.findOneAndUpdate({
		// 	_id: auction,
		// 	$or: [{'bids.0.bid': {$lt: bid.bid}}, {bids: {$eq: []}}]
		// },{$push: {bids: {$each: [bid], $position: 0}}}, {new: true})
		// .populate('bids.bidder', '_id fullName')
		// .populate('seller').exec();
		let result = await Auction.findOneAndUpdate({_id:auction, $or: [{'bids.0.bid':{$lt:bid.bid}},{bids:{$eq:[]}} ]}, {$push: {bids: {$each:[bid], $position: 0}}}, {new: true})
                                  .populate('bids.bidder', '_id fullName')
                                  .populate('seller', '_id fullName')
                                  .exec()
		 

		io.to(auction).emit('new bid', result);
	}
}



module.exports = bidding;