import React, {Component} from 'react';
import {getCart} from './cartHelper';
import {Link} from 'react-router-dom';
import CartItems from '../placingOrder/CartItems';

class Cart extends Component{
	render(){

		return(
			<div className='container'>		
				<CartItems/>				
			</div>
		)
	}
}

export default Cart;