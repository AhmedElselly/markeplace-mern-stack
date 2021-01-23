const express = require('express');
const router = express.Router();

const {
	isAuth
} = require('../middlewares');

const {
	register,
	login,
	getUserById,
	getUser,
	editUser,
	createStripeSeller,
	updateStripe,
	getAllCustomers
} = require('../controllers/users');

router.post('/register', register);
router.post('/login', login);
router.put('/stripe_auth/:userId', isAuth, createStripeSeller);
router.put('/:userId/edit', editUser);
router.get('/get-all-customers', getAllCustomers);

router.get('/:userId', getUser);

router.param('userId', getUserById);


module.exports = router;