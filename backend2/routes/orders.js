const express = require('express');
const router = express.Router();

const {
	isAuth
} = require('../middlewares');

const {
	getShopById
} = require('../controllers/shops');

const {
	getUserById,
	createPaymentId,
	createCharge
} = require('../controllers/users');

const {
	decreaseQuantity
} = require('../controllers/products');

const {
	getOrderById,
	createOrder,
	listByShop,
	getOrderStatuses,
	updateOrderStatus
} = require('../controllers/orders');

router.put('/:orderId/charge/:userId/:shopId', isAuth, createCharge, updateOrderStatus);

router.put('/status/:shopId', isAuth, updateOrderStatus);

router.get('/shop/:shopId', isAuth, listByShop);
router.post('/create/order/:userId', isAuth, createPaymentId, decreaseQuantity, createOrder);
router.get('/:orderId/get-all-status', isAuth, getOrderStatuses);

router.param('userId', getUserById);
router.param('shopId', getShopById);
router.param('orderId', getOrderById);

module.exports = router;