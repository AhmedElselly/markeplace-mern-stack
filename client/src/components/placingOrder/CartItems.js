import React, {useState} from 'react';
import {getCart, updateCart, removeCartItem} from '../products/cartHelper';
import {Link} from 'react-router-dom';
import {TextField} from '@material-ui/core';
import {isAuthenticated} from '../users/apiUser';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Checkout from './Checkout';

const stripePromise = loadStripe('pk_test_fanZLznQoHp09rw1HXuS0vZA0019urp2MB', {
	stripeAccount: 'acct_1I95McJu3zmoQ4cN'
});

const CartItems = props => {
	
	const [cartItems, setCartItems] = useState(getCart());
	const [checkout, setCheckout] = useState(true);

	const handleChange = i => e => {
		let updatedCartItems = cartItems;
		if(e.target.value == 0){
			updatedCartItems[i].quantity = 1;
		} else {
			updatedCartItems[i].quantity = e.target.value;
		}
		setCartItems([...updatedCartItems]);
		updateCart(i, e.target.value);
	}

	const removeItem = i => e => {
		let updatedCartItems = removeCartItem(i);
		if(updatedCartItems.length == 0){

			setCheckout(false);
		}
		setCartItems(updatedCartItems);
	}

	const getTotal = () => {
		return cartItems.reduce((a, b) => {
			return a + (b.quantity * b.product.price);
		}, 0);
	}

	const renderCartItems = cartItems.map((item, i) => {
		return (
			<div key={item.product._id} className="card mb-3" style={{maxWidth: '540'}}>
			  <div className="row no-gutters">
			    <div className="col-md-4">
			      <img height='100%' style={{objectFit: 'cover'}} src={`http://localhost:8000/products/${item.product._id}/image`} className="card-img" alt="..."/>
			    </div>
			    <div className="col-md-8">
			      <div className="card-body">
			        <Link to={`/product/${item.shop}/show/${item.product._id}`}><h5 className="card-title">{item.product.name}</h5></Link>
			        <p className="card-text">{item.product.description}</p>
			        Quantity: <TextField
								value={item.quantity}
								onChange={handleChange(i)}
								type="number"
								inputProps={{ min:1 }}
								InputLabelProps={{
								shrink: true,
								}}
							/>
							<button onClick={removeItem(i)} className='btn btn-warning'>Remove</button>
			        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
			      </div>
			    </div>
			  </div>
			</div>
		)
	})

	const openCheckout = () => {
		setCheckout(true);
	}

	return(
		<div className='row'>
		<div className='col-md-8'> 
			{getCart().length ? (renderCartItems):(
				<div>No items in your cart</div>
			)}
		</div>
		<div className='col-md-4'>
			<span className='mr-5'>{`Total: ${getTotal()}`}</span>
			{isAuthenticated() ? (
				<div>
				{checkout ? (
					<div>
						<button className='btn btn-success' onClick={openCheckout}>Checkout</button>
						<Elements stripe={stripePromise}>
							<Checkout/>
						</Elements>
					</div>
					):(
					<div>You should fill your cart</div>
				)}
				</div>
				):(
				<div>
				you should login first
				<Link to='/login'>Login</Link>
				</div>
				)}
		</div>
		</div>
	)

}

export default CartItems;