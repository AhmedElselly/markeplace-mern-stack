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
	getShopById
} = require('../controllers/shops');


const {
	create,
	getProductById,
	getProducts,
	getProductImage,
	getSingleProduct,
	listRelated,
	update,
	listCategories,
	searchList,
	getStripePublicKey
} = require('../controllers/products');


router.post('/create/:userId', isAuth, upload.single('image'), create);
router.get('/show/shop/:shopId', getProducts);
router.get('/show/:productId', getSingleProduct);
router.get('/categories', listCategories)
router.get('/search', searchList);
router.get('/get-stripe-publickey', getStripePublicKey);
router.get('/:productId/image', getProductImage);

router.get('/:productId/related', listRelated);

router.put('/:productId/update/:userId', isAuth, upload.single('image'), update)

router.param('userId', getUserById);
router.param('productId', getProductById);
router.param('shopId', getShopById);

module.exports = router;