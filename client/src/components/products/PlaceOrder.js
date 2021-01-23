import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
// import {injectStripe, CardElement} from 'react-stripe-elements';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {isAuthenticated} from '../users/apiUser';
import {emptyCart} from './cartHelper';
import {Redirect} from 'react-router-dom';
import {createOrder, createCharge} from './apiProduct';

const PlaceOrder = (props) => {
	const [values, setValues] = useState({
		id: '',
		orderId: '',
		error: '',
		redirect: false
	})

	const stripe = useStripe();
  	const elements = useElements();

	const [card, setCard] = useState({});
	console.log(props.checkoutDetails)
	const placeOrder = () => {
		props.stripe.createToken().then(payload => {
			const {token} = isAuthenticated();
			const {_id} = isAuthenticated().user;
			console.log(payload)
			createOrder(_id, token, props.checkoutDetails, payload.token.card, payload.token.id).then(res => {
				console.log(res.data)
				emptyCart(() => {
					setValues({...values, 'orderId': res.data._id, redirect: true})
				})
			})
			const {orderId} = values;
			// const {shopId} = props.params;

			console.log('orderId, ', orderId);
			
		})
	}

	// if(values.redirect){
	// 	return <Redirect to={`/order/${values.orderId}`} />
	// }
	

	return(
		<div>
			<CardElement {...{style: {
				base: {
					color: '#424770',
					letterSpacing: '0.025em',
					'::placeholder': {
						color: '#aab7c4'
					}
				},
				invalid: {
				color: '#9e2146',
				},
			}}} />
			<Button color="primary" variant="raised" onClick={placeOrder}>Place Order</Button>
		</div>
	)
}

PlaceOrder.propTypes = {
	checkoutDetails: PropTypes.object.isRequired
}


export default PlaceOrder;