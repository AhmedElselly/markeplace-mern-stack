import React, {Component} from 'react';
import {isAuthenticated, getUser, editProfile, updateUser} from './apiUser';
import {FormControlLabel, Switch, Typography} from '@material-ui/core';
class EditProfile extends Component{
	constructor(props){
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			seller: false,
			id: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSellerChange = this.handleSellerChange.bind(this);
	}

	componentDidMount(){
		const {_id} = isAuthenticated().user;
		getUser(_id).then(res => {
			console.log(res.data)
			this.setState({seller: res.data.user.seller, firstName: res.data.user.firstName, lastName: res.data.user.lastName, email: res.data.user.email, id: res.data.user._id});
		});
	}

	handleSubmit(e){
		e.preventDefault();
		const {id, email, firstName, lastName, password, seller} = this.state;
		editProfile(id, firstName, lastName, email, password, seller).then(res => {
			console.log(res.data);
			updateUser(res.data, () => {
				console.log('userupdate')
			})
			this.props.history.push(`/profile/${id}`);
		})
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	handleSellerChange(e, checked){
		this.setState({seller: !this.state.seller});
	}

	render(){
		const {id, email, firstName, lastName, password, seller} = this.state;
		return(
			<div className='container'>
				<h1>Edit Profile</h1>
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
				  <Typography variant="subtitle1" className={''}>
						Seller Account
					</Typography>
					<FormControlLabel
						control={<Switch
							checked={seller}
							onChange={this.handleSellerChange}
							/>}
						label={seller ? 'Active' : 'Inactive'}
					/>
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		)
	}
}

export default EditProfile;