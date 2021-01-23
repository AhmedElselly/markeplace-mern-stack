import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getSingleProduct, relatedList} from './apiProduct';
import Card from './Card';
import Products from './Products';
import '../shops/Shop.css';

class ShowProduct extends Component{
	constructor(props){
		super(props);
		this.state = {
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
		const {productId, shopId} = this.props.match.params;
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
		relatedList(productId).then(res => {
			console.log('related list', res.data)
			this.setState({reList: res.data});
		})
	}

	render(){
		const {productId, shopId} = this.props.match.params;
		const {name, description, quantity, price, reList, category, shop} = this.state;
		
		return(
			<div className='container'>
				<div className='row'>
					<div className='col-sm-4 box'>
						<Card 
						productId={productId} 
						shopId={shopId}
						/>
					</div>
					<div className='col-md-8 box'>
						<h1>Related Products</h1>
						<Products shopId={shop._id} products={reList} />
					</div>
				</div>
			</div>
		)
	}
}

export default ShowProduct;