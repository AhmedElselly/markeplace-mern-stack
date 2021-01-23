import React, {Component} from 'react';
import {postAuction} from './apiAuction';
import {isAuthenticated} from '../users/apiUser';

class AuctionForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			itemName: '',
			image: '',
			description: '',
			bidStart: '',
			bidEnd: '',
			startingBid: '',
			error: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getDateString = this.getDateString.bind(this);
		this.handleBiddingTimeChange = this.handleBiddingTimeChange.bind(this);
	}

	handleChange(e){
		const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
		// const formData = new FormData();
		// const currentDate = new Date();
		// const bidStart = this.getDateString(currentDate);
		// const bidEnd = this.getDateString(new Date(currentDate.setHours(currentDate.getHours() + 1)));;

		this.setState({[e.target.name]: value});
	}

	getDateString(date){
		let year = date.getFullYear();
		let day = date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate();
		let month = date.getMonth().toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
		let hours = date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours();
		let minutes = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
		let dateString = `${year}-${month}-${day}T${hours}:${minutes}`;
		return dateString;
	}

	handleBiddingTimeChange(e){
		if(e.target.name === 'bidStart' || e.target.name === 'bidEnd'){
			this.setState({[e.target.name]: e.target.value});
		}
	}

	handleSubmit(e){
		e.preventDefault();
		const {userId} = this.props.match.params;
		const {token} = isAuthenticated();
		const {itemName, image, description, startingBid, error, bidEnd} = this.state;
		const formData = new FormData();
		const currentDate = new Date();
		const bidStart = this.getDateString(currentDate);
		// const bidEnd = this.getDateString(new Date(currentDate.setHours(currentDate.getHours() + 1)));;
		// if(this.state.bidEnd < this.state.bidStart){
		// 	this.setState({error: 'Auction can not end before it starts!'});
		// }
		console.log(bidStart, bidEnd)
		formData.append('itemName', itemName)
		formData.append('image', image)
		formData.append('description', description)
		formData.append('startingBid', startingBid)
		formData.append('bidStart', bidStart)
		formData.append('bidEnd', bidEnd)
		postAuction(userId, token, formData).then(res => {
			console.log(res.data);
		})
	}

	render(){
		const {itemName, image, description, startingBid, bidStart, bidEnd, error} = this.state;
		// const {userId} = this.props.match.params;
		return(
			<div className='container'>
				<h1>New Auction</h1>
				{error && (
					<div class="alert alert-danger" role="alert">
					  {error}
					</div>
				)}
				<form onSubmit={this.handleSubmit}>
  				<div className="form-group">
				    <label htmlFor="exampleInputEmail1">Name</label>
				    <input type="text" name='itemName' value={itemName} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="icon-button-file">Image</label>
						<input type="file" accept='image/*' id='icon-button-file' name='image' onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
						<span>{image ? image.name : ''}</span>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Starting Bid</label>
				    <input type="number" name='startingBid' value={startingBid} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Description</label>
				    <input type="text" name='description' value={description} onChange={this.handleChange} className="form-control" id="exampleInputPassword1"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Auction Start Time</label>
				    <input type="datetime-local" name='bidStart' value={bidStart} onChange={this.handleBiddingTimeChange} className="form-control" id="exampleInputPassword1"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Auction End Time</label>
				    <input type="datetime-local" name='bidEnd' value={bidEnd} onChange={this.handleBiddingTimeChange} className="form-control" id="exampleInputPassword1"/>
				  </div>
				  <button type="submit" className="btn btn-primary">Create</button>	
				</form>
			</div>
		)
	}
}

export default AuctionForm;