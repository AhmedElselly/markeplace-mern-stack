const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});
const {
	getUserById
} = require('../controllers/users');

const {
	isAuth
} = require('../middlewares');

const {
	create,
	getAuctionImage,
	getAuctionById,
	getAuction,
	auctionIndex,
	auctionsListOpen,
	auctionsByBidder,
	auctionsBySeller
} = require('../controllers/auctions');

router.get('/all-auctions', auctionIndex);
router.get('/all-auctions/open', auctionsListOpen);
router.get('/all-auctions/by-bidder/:userId', auctionsByBidder);
router.get('/all-auctions/by-seller/:userId', auctionsBySeller);
router.post('/create/:userId', isAuth, upload.single('image'), create);
router.get('/:auctionId', isAuth, getAuction);
router.get('/:auctionId/image', getAuctionImage);

router.param('userId', getUserById);
router.param('auctionId', getAuctionById);

module.exports = router;