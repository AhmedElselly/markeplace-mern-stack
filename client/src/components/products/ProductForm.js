import React, {Component} from 'react';
import {isAuthenticated} from '../users/apiUser';
import {create} from './apiProduct';


class ProductForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			price: '',
			category: '',
			image: '',
			quantity: '',
			shop: '',
			description: '',
			loaded: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		const {shopId} = this.props.match.params;
		
		this.setState({shop: shopId})
	}

	handleChange(e){
		const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
		this.setState({[e.target.name]: value});
	}


	handleSubmit(e){
		e.preventDefault();
		const {shopId, userId} = this.props.match.params;
		const {token} = isAuthenticated();
		const {name, loaded, price, image, category, quantity, description, shop} = this.state;

		const formData = new FormData();

		formData.append('name', name);
		formData.append('price', price);
		formData.append('image', image);
		formData.append('category', category);
		formData.append('quantity', quantity);
		formData.append('description', description);
		formData.append('shop', shop);
		console.log(shop)
		create(userId, formData, token).then(res => {
			console.log(res.data);
			this.setState({
				loaded: true,
				name: '',
				description: '',
				price: '',
				category: '',
				quantity: ''
			})
		})
	}

	render(){
		const {name, loaded, price, image, category, quantity, description} = this.state;
		const {shopId, userId} = this.props.match.params;

		if(loaded){
			this.props.history.push(`/shops/show/${shopId}`);
		}

		return(
			<div className='container'>
				<h1>Create a shop</h1>
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Name</label>
				    <input type="text" name='name' value={name} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="icon-button-file">Image</label>
						<input type="file" accept='image/*' id='icon-button-file' name='image' onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
						<span>{image ? image.name : ''}</span>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Price</label>
				    <input type="number" name='price' value={price} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Category</label>
				    <input type="text" name='category' value={category} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Quantity</label>
				    <input type="number" name='quantity' value={quantity} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <input type="hidden" name='shop' value={shopId} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Description</label>
				    <input type="text" name='description' value={description} onChange={this.handleChange} className="form-control" id="exampleInputPassword1"/>
				  </div>
				  <button type="submit" className="btn btn-primary">Create</button>
				</form>	
			</div>
		)
	}
}

export default ProductForm;