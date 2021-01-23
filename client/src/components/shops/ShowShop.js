import React, {Component} from 'react';
import {getShop} from './apiShop';
import {CardContent, Typography, Avatar, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../users/apiUser';
import {getShopProducts} from '../products/apiProduct';
import Products from '../products/Products';

import './Shop.css';

class ShowShop extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			owner: '',
			description: '',
			products: []
		}
	}

	componentDidMount(){
		const {shopId} = this.props.match.params;
		console.log(shopId)
		getShop(shopId).then(res => {
			// console.log(res.data);
			this.setState({name: res.data.name, owner: res.data.owner, description: res.data.description});
		})

		getShopProducts(shopId).then(res => {
			console.log(res.data)
			this.setState({products: res.data});
		})
	}

	render(){
		const {name, owner, description, products} = this.state;
		const {shopId} = this.props.match.params;
		console.log(products)
		
		return(
			<div className='container'>
			<h1>Welcome to {owner.fullName}'s Shop</h1>
			
			<div className='row'>
				
				<div className='col-sm-4 box'>
					<CardContent>
						<Typography type="headline" style={{fontWeight: 'bold', margin: '0 auto', color: 'green'}} component="h2">
						<Link to={`/orders/${shopId}`} >{name}</Link>
						
						</Typography><br/>
						<Avatar style={{margin: '0 auto', width: 100, height: 100}} src={`http://localhost:8000/shops/${shopId}/image`}/><br/>
						<Typography type="subheading" style={{fontWeight: 'bold'}} component="h2">
						{description}
						</Typography><br/>
						{isAuthenticated() && isAuthenticated().user._id === owner._id && (
								<div>
								<Link className='mr-3' to={`/shop/edit/${shopId}`}>
								<Button variant='contained' color="primary">
									Edit
								</Button>
								</Link>
										
								<Button variant="contained" color="secondary">Delete</Button>
								</div>
							)}
						</CardContent>
				</div>
				<div className='col-md-8 box'>
					{ isAuthenticated() && isAuthenticated().user._id === owner._id &&(
					<div style={{marginLeft: '70%'}}>
						<Link className='btn btn-primary' to={`/product/${shopId}/create/${isAuthenticated().user._id}`}>Create New Product</Link>
					</div>
					)}
					<h3>Products</h3>
					<Products shopId={shopId} products={products} />
				</div>
			</div>
			</div>
		)
	}
}

export default ShowShop;