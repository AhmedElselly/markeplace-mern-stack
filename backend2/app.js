require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/marketplace', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(() => console.log('Connect to database'));

const userRoutes = require('./routes/users');
const shopRoutes = require('./routes/shops');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const auctionRoutes = require('./routes/auctions');
const bidding = require('./controllers/bidding');

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(session({
	secret: 'I miss ladyblond',
	resave: false,
	saveUninitialized: false
}))

app.use((req, res, next) => {
	res.locals.payment_id = req.session.payment_id;
	res.locals.card = req.session.card;
	next();
})

app.use('/orders', orderRoutes);
app.use('/shops', shopRoutes);
app.use('/products', productRoutes);
app.use('/', userRoutes);
app.use('/auctions', auctionRoutes);

const server = app.listen(PORT, function(){
	console.log(`Server is on port ${PORT}`);
});

bidding(server);