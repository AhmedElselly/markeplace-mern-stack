import React, {Component} from 'react';
import {register} from './apiUser';

class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			seller: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSellerChange = this.handleSellerChange.bind(this);
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit(e){
		e.preventDefault();
		const {email, password, firstName, lastName, seller} = this.state;
		register(email, password, firstName, lastName, seller).then(res => {
			console.log(res.data);
		});
	}

	handleSellerChange(e){
		this.setState({seller: !this.state.seller});
	}

	render(){
		const {email, password, firstName, lastName, seller} = this.state;
		return(
			<div className='container'>
			 	<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Email address</label>
				    <input type="email" name='email' value={email} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">First Name</label>
				    <input type="text" name='firstName' value={firstName} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Last Name</label>
				    <input type="text" name='lastName' value={lastName} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Password</label>
				    <input type="password" name='password' value={password} onChange={this.handleChange} className="form-control" id="exampleInputPassword1"/>
				  </div>
				  <div className="custom-control custom-switch">
					  <input type="checkbox" name='seller' value={seller} onClick={this.handleSellerChange} className="custom-control-input" id="customSwitch1"/>
					  <label className="custom-control-label" htmlFor="customSwitch1">Register as a seller</label>
					</div>
				  <button type="submit" className="btn btn-primary">Register</button>
				</form>
			</div>
		)
	}
}

export default Register;