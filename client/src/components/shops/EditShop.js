import React, {Component} from 'react';
import {getShop, updateShop} from './apiShop';
import {getShopProducts} from '../products/apiProduct';
import {isAuthenticated} from '../users/apiUser';
import Products from '../products/Products';

import './Shop.css';

class EditShop extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			description: '',
			owner: '',
			products: [],
			image: null,
			loaded: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		const {shopId} = this.props.match.params;
		getShop(shopId).then(res => {
			this.setState({name: res.data.name, description: res.data.description, owner: res.data.owner});
		});
		getShopProducts(shopId).then(res => {
			console.log(res.data)
			this.setState({products: res.data});
		})
	}

	handleChange(e){
		const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
		this.setState({[e.target.name]: value});
	}

	handleSubmit(e){
		e.preventDefault();
		const {shopId} = this.props.match.params;
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		const formData = new FormData();
		const {name, image, description} = this.state;
		formData.append('name', name);
		formData.append('description', description);
		formData.append('image', image);
		updateShop(_id, formData, shopId, token).then(res => {
			console.log(res.data);
			this.setState({loaded: true});
		})
	}

	render(){
		const {_id} = isAuthenticated().user;
		const {name, loaded, image, description, owner, products} = this.state;

		if(this.state.loaded){
			this.props.history.push(`/shops/${_id}`);
		}
		return(
			<div className='container'>
				<h1>Edit {name} shop</h1>
				<div className='row'>
				<div style={{padding: 50}} className='col-md-4 box'>
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Shop's Name</label>
				    <input type="text" name='name' value={name} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="icon-button-file">Shop's Logo</label>
						<input type="file" accept='image/*' id='icon-button-file' name='image' onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
						<span>{image ? image.name : ''}</span>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Description</label>
				    <input type="text" name='description' value={description} onChange={this.handleChange} className="form-control" id="exampleInputPassword1"/>
				  </div>
				  <div className='mb-2'>
				  	Owner: {owner.fullName}
				  </div>
				  <button type="submit" className="btn btn-primary">Update</button>
				</form>
				</div>
				<div className='col-md-8 box'>
					<h3>Products</h3> 
					<Products products={products} />
				</div>
				</div>
			</div>
		)
	}
}

export default EditShop;