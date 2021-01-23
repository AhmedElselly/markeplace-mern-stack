const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	fullName: String,
	password:{
		type: String,
		required: true
	},
	seller: {
		type: Boolean,
		default: false
	},
	stripe_seller: {},
	// stripeCustomer: {}
	paymentId: '',
	stripeAccount: ''
});

userSchema.pre('save', async function(next){
	this.password = await bcrypt.hashSync(this.password, 10);
	this.fullName = `${this.firstName} ${this.lastName}`;
	next();
});

userSchema.methods = {
	async comparePassword(password){
		await bcrypt.compareSync(password, this.password);
	}
}


module.exports = mongoose.model('User', userSchema);