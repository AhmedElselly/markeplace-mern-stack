import React, {Component} from 'react';
import {isAuthenticated} from '../users/apiUser';
import {createShop} from './apiShop';
import {Button} from '@material-ui/core';

class ShopForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			description: '',
			image: null,
			loaded: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
		this.setState({[e.target.name]: value});
	}

	handleSubmit(e){
		e.preventDefault();
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		const formData = new FormData();
		const {name, image, description} = this.state;
		formData.append('name', name);
		formData.append('description', description);
		formData.append('image', image);
		createShop(_id, formData, token).then(res => {
			console.log(res.data);
			this.setState({loaded: true});
		})
	}

	render(){
		const {name, loaded, image, description} = this.state;
		if(loaded) {
			this.props.history.push('/');
		}
		return(
			<div className='container'>
				<h1>Create a shop</h1>
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
				  <button type="submit" className="btn btn-primary">Create</button>
				</form>
			</div>
		)
	}
}

export default ShopForm;