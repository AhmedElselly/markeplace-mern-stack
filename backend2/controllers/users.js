const User = require('../models/user');
const jwt = require('jsonwebtoken');
const request = require('request');
const Stripe = require('stripe');
const myStripe = new Stripe(process.env.STRIPE_SECRET_KEY);


module.exports = {
	getUserById(req, res, next, id){
		User.findById(id).exec(function(err, user){
			if(err) return res.status(400).json({error: 'User does not exist!'});
			req.user = user;
			console.log('user', req.user)
			next();
		});
	},

	async register(req, res){
		const existingUser = await User.findOne({email: req.body.email});
		if(existingUser) return res.status(400).json({error: 'User with that email already exists!'});
		const user = await new User(req.body);

		user.save((err, user) => {
			if(err) return res.status(400).json({error: err});			
			return res.json(user);
		});
	},

	async login(req, res){
		const user = await User.findOne({email: req.body.email});
		user.comparePassword(req.body.password);
		const token = await jwt.sign({email: req.body.email, fullName: user.fullName, _id: user._id}, process.env.SECRETKEY);
		return res.json({user, token});
	},

	async getUser(req, res){
		const user = await req.user;
		const publicKey = process.env.STRIPE_PUBLIC_KEY;
		return res.json({user, publicKey});
	},

	async editUser(req, res){
		const user = await req.user;

		user.email = req.body.email;
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		user.seller = req.body.seller;
		user.password = req.body.password;
		user.stripe_seller = req.body.stripe_seller;
		console.log('req.body', req.body)
		user.save((err, user) => {
			if(err) return res.status(400).json({error: err});
			return res.json(user);
		})
	},

	async createStripeSeller(req, res){
		const user = await req.user;
		const account = await myStripe.accounts.create({
			type: 'standard',
			email: req.body.email
		});

		console.log('account', account);
		const accountLink = await myStripe.accountLinks.create({
			account: account.id,
			refresh_url: 'http://localhost:3000',
			return_url: 'http://localhost:3000',
			type: 'account_onboarding'
		});
		user.stripe_seller = accountLink;
		user.stripeAccount = account.id;
		user.save();
		console.log('user', user);
		return res.json(accountLink)

	},

	async createPaymentId(req, res, next){
		// const user = await req.user;
		// user.paymentId = req.body.paymentId;
		// user.save();
		req.session.paymentId = req.body.paymentId;
		next();
	},

	async getAllCustomers(req, res){
		const customers = await myStripe.customers.list({});
		return res.json(customers)
	},

	async createCharge(req, res, next){
		console.log('createCharge', req.body)
		const charge = await myStripe.paymentIntents.create({
		  payment_method_types: ['card'],
			amount: req.body.amount * 100,
			currency: 'usd',
			payment_method: req.order.paymentId,
			confirm: true
		}, {
			stripeAccount: 'acct_1I95McJu3zmoQ4cN'
		})
		console.log('charge', charge);
		next();
	}
}