import React, {useState, useEffect} from 'react';
import {getStatusValues, updateOrderStatus, createCharge} from './apiOrder';
import {isAuthenticated} from '../users/apiUser';

const ProductOrderEdit = (props) => {
	const [values, setValues] = useState([]);
	const {token} = isAuthenticated();
	const {_id} = isAuthenticated().user;
	
	useEffect(() => {
		const {orderId} = props;
		getStatusValues(orderId, token).then(res => {
			console.log(res.data);
			setValues(res.data);
		})
	}, []);

	const handleStatusChange = productIndex => e => {
		console.log(e.target.value)
		let order = props.order;
		order.products[productIndex].status = e.target.value;
		let product = order.products[productIndex]
		console.log('product', product);
		// if(e.target.value === 'Cancelled'){

		// } else if(e.target.value === 'Processing'){

		// } else {
			const {orderId, shopId} = props;

			if(e.target.value === 'Processing'){
				updateOrderStatus(e.target.value, orderId, shopId, product._id, token).then(res => {
				console.log('updated status is: ', res.data);
				props.updateOrders(props.orderIndex, order);
				})
				const amount = product.quantity * product.product.price;
				createCharge(orderId, token, _id, shopId, product._id, e.target.value, amount).then(res => {
					console.log('createCharge, ', res.data);
				})
			}

			
		// }
		
	}
	return (
		<div>
			{props.order.products.map((item, i) => {
				return(
					<div class="card mb-3" style={{maxWidth: '540px'}}>
					  <div class="row no-gutters">
					    <div class="col-md-4">
					      <img height='100%' style={{objectFit: 'cover'}} src={`http://localhost:8000/products/${item.product._id}/image`} class="card-img" alt="..."/>
					    </div>
					    <div class="col-md-8">
					      <div class="card-body">
					        <h5 class="card-title">{item.product.name}</h5>
					        <div class="form-group">
								    
								    <select onChange={handleStatusChange(i)} class="form-control" id="exampleFormControlSelect1">
								    	{values.map(value => {
								    		return (
								    			<option value={value}>{value}</option>
							    			)
								    	})
								    	}
								      
								    </select>
								  </div>
					        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
					      </div>
					    </div>
					  </div>
					</div>
				)
			})}
		</div>
	)
}

export default ProductOrderEdit;