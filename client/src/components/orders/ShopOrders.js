import React, {useEffect, useState} from 'react';
import {isAuthenticated} from '../users/apiUser';
import {listByShop} from './apiOrder';
import {Typography, List, ListItem, ListItemText, Collapse, ExpandLess, ExpandMore} from '@material-ui/core';
import ProductOrderEdit from './ProductOrderEdit';

const ShopOrders = ({match}) => {
	const [orders, setOrders] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const {token} = isAuthenticated();
		const {shopId} = match.params;
		console.log('ShopId', shopId);

		listByShop(shopId, token).then(res => {
			console.log(res.data);
			setOrders(res.data)
		})
	}, [])

	const handleClick = e => {

	}

	const updateOrders = (index, updatedOrder) => {
		let updatedOrders = orders;
		updatedOrders[index] = updatedOrder;
		setOrders([...updatedOrders]);
	}

	console.log('orders', orders)

	return(
		<div>
			<Typography type="title">Shop's orders</Typography>
			<List dense> {orders.map((order, index) => { 
				console.log(order._id)
				return(
				<span key={index}>
				<ListItem button onClick={handleClick(index)}>
				<ListItemText primary={'Order # '+order._id}
				/>
				{/*open == index ? <ExpandLess /> : <ExpandMore />*/}
				{/*order.products.map(item => {
					return (
						<div className="card mb-3" style={{maxWidth: '540px'}}>
						  <div className="row no-gutters">
						    <div className="col-md-4">
						      <img src={`http://localhost:8000/products/${item.product._id}/image`} className="card-img" alt="..."/>
						    </div>
						    <div className="col-md-8">
						      <div className="card-body">
						        <h5 className="card-title">{item.product.name}</h5>
						        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
						      </div>
						    </div>
						  </div>
						</div>
					)
				})*/}
				</ListItem>
				<Collapse component="li" in={open == index}
				timeout="auto" unmountOnExit>
				<ProductOrderEdit shopId={match.params.shopId}
				order={order} orderId={order._id} orderIndex={index} updateOrders={updateOrders}/>
				<Typography type="subheading"> Deliver to:</Typography>
				<Typography type="subheading" color="primary">
				{order.customer_name} ({order.customer_email})
				</Typography>
				<Typography type="subheading" color="primary">
				{order.delivery_address.street}</Typography>
				<Typography type="subheading" color="primary">
				{order.delivery_address.city},
				{order.delivery_address.state}
				{order.delivery_address.zipcode}</Typography>
				<Typography type="subheading" color="primary">
				{order.delivery_address.country}</Typography>
				</Collapse>
			</span>
			)})}
			</List>
		</div>
	)
}

export default ShopOrders;