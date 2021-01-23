const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

const {
	isAuth,
	isOwner
} = require('../middlewares');

const {
	getUserById
} = require('../controllers/users');

const {
	create,
	shopIndex,
	shopImage,
	getShopById,
	getShop,
	shopByOwner,
	updateShop,
	getOwner
} = require('../controllers/shops');

router.put('/update/:userId/:shopId', isAuth, isOwner, upload.single('image'), updateShop);


router.post('/create/:userId', isAuth, upload.single('image'), create);
router.get('/', shopIndex);
router.get('/by/:userId', isAuth, isOwner, shopByOwner);
router.get('/:shopId/image', shopImage);
router.get('/:shopId', getShop);

router.get('/:shopId/owner/:userId', getOwner);

router.param('userId', getUserById);
router.param('shopId', getShopById);

module.exports = router;