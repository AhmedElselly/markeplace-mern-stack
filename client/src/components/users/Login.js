import React, {Component} from 'react';
import {login, authenticate} from './apiUser';
import {Redirect} from 'react-router-dom';

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			loaded: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit(e){
		e.preventDefault();
		const {email, password} = this.state;
		login(email, password).then(res => {
			console.log(res.data);
			this.setState({loaded: true});
			authenticate(res.data, () => {
				console.log('User Logged In');
			});
			this.props.history.push('/');
		});
	}

	render(){
		const {email, password, loaded} = this.state;
		
		return(
			<div className='container'>
			 	<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Email address</label>
				    <input type="email" name='email' value={email} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Password</label>
				    <input type="password" name='password' value={password} onChange={this.handleChange} className="form-control" id="exampleInputPassword1"/>
				  </div>
				  <button type="submit" className="btn btn-primary">Login</button>
				</form>
			</div>
		)
	}
}

export default Login;