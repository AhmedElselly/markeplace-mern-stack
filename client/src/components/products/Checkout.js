import React, {useState} from 'react';
import {isAuthenticated} from '../users/apiUser';
import {getCart} from './cartHelper';
import {TextField} from '@material-ui/core';
import {Elements} from 'react-stripe-elements';
import PlaceOrder from './PlaceOrder';

const Checkout = () => {
	const {fullName, email} = isAuthenticated().user; 
	const [values, setValues] = useState({
		checkoutDetails: {
			products: getCart(),
			customer_name: fullName,
			customer_email: email,
			delivery_address: {
				street: '',
				city: '',
				state: '',
				zipcode: '',
				country: ''
			}
		}, error: ''
	});

	const handleCustomerChange = name => event => {
		let checkoutDetails = values.checkoutDetails;
		checkoutDetails[name] = event.target.value || undefined;
		setValues({...values, checkoutDetails: checkoutDetails});
	}

	const handleAddressChange = name => event => {
		let checkoutDetails = values.checkoutDetails;
		checkoutDetails.delivery_address[name] = event.target.value || undefined;
		setValues({...values, checkoutDetails: checkoutDetails});
	}
	console.log(values)

	return(
		<div>
			
			<TextField id="name" label="Name"
				value={values.checkoutDetails.customer_name}
				onChange={handleCustomerChange('customer_name')}/>
			<TextField id="email" type="email" label="Email"
				value={values.checkoutDetails.customer_email}
				onChange={handleCustomerChange('customer_email')}/>
			<br/>
			<TextField id="street" label="Street Address" value=
				{values.checkoutDetails.delivery_address.street}
				onChange={handleAddressChange('street')}/>
			<TextField id="city" label="City"
				value={values.checkoutDetails.delivery_address.city}
				onChange={handleAddressChange('city')}/>
			<TextField id="state" label="State"
				value={values.checkoutDetails.delivery_address.state}
				onChange={handleAddressChange('state')}/>
			<TextField id="zipcode" label="Zip Code"
				value={values.checkoutDetails.delivery_address.zipcode}
				onChange={handleAddressChange('zipcode')}/>
			<TextField id="country" label="Country"
				value={values.checkoutDetails.delivery_address.country}
				onChange={handleAddressChange('country')}/>
			<Elements className='mt-5'>
				<PlaceOrder checkoutDetails={values.checkoutDetails} />
			</Elements>
		</div>
	)
}

export default Checkout;