import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../users/apiUser';
import {getOwner} from '../shops/apiShop';
import {getSingleProduct, relatedList} from './apiProduct';

class Card extends Component{
	constructor(props){
		super(props);
		this.state = {
			ownerId: '',
			name: '',
			description: '',
			quantity: '',
			price: '',
			category: '',
			reList: [],
			shop: {}
		}
	}

	componentDidMount(){
		const {_id} = isAuthenticated().user;
		const {productId, shopId} = this.props;
		// const {shopId} = this.props.match.params;
		console.log(shopId)
		const {name, description, quantity, price, category} = this.state;
		getSingleProduct(productId).then(res => {
			console.log(res.data);
			this.setState({
				name: res.data.name,
				description: res.data.description,
				quantity: res.data.quantity,
				price: res.data.price,
				category: res.data.category,
				shop: res.data.shop
			});
		});
		console.log(shopId)
		getOwner(_id, shopId).then(res => {
			console.log(res.data);
			this.setState({ownerId: res.data.owner._id})
		})
	}
	render(){
		const {name, description, quantity, ownerId, price, category, shop} = this.state;
		// const {ownerId} = this.state;
		console.log(this.state)
		const {productId} = this.props;
		return(
			<div>
				<div className="card" style={{'width': '18rem'}}>
				  <img src={`http://localhost:8000/products/${productId}/image`} className="card-img-top" alt={name}/>
				  <div className="card-body">
				    <h5 className="card-title">{name}</h5>
				    <p className="card-text">{description}</p>
				    <p className="card-text">Price: {price}</p>
				    <p className="card-text">Quantity: {quantity}</p>
				    <p className="card-text">Category: {category}</p>
				    {isAuthenticated() && isAuthenticated().user._id === ownerId && (
					    <Link to={`/product/${shop._id}/edit/${productId}`} className="btn btn-primary">Edit</Link>

				    	)}
				  </div>
				</div>
			</div>
		)
	}
}

export default Card;