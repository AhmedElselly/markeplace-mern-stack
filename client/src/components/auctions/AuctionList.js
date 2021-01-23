import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {auctionList} from './apiAuction';
import {isAuthenticated} from '../users/apiUser';
import {
	Divider,
 	Avatar,
  ListItem,
	ListItemAvatar,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Button
  } from '@material-ui/core';

class AuctionList extends Component{
	constructor(props){
		super(props);
		this.state = {
			posts: []
		}
	}

	componentDidMount(){
		auctionList().then(res => {
			console.log(res.data);
			this.setState({posts: res.data});
		})
	}

	render(){
		const allAuctions = this.state.posts.map(post => {
			return(
				<Link to={`/auctions/show/${post._id}`} key={post._id}>
					<Divider/>
					<ListItem button>
						<ListItemAvatar>
							<Avatar src={`http://localhost:8000/auctions/${post._id}/image`}/>
						</ListItemAvatar>
						<div className={''}>
							<Typography type="headline"
							component="h2" color="primary">
							{post.itemName}
							</Typography>
							<Typography type="subheading" component="h4">
							{post.description}
							</Typography>
						</div>
						<ListItemSecondaryAction>
					{isAuthenticated() && isAuthenticated().user._id === post.seller._id && (
						<div>
						<Link className='mr-3' to={`/auction/edit/${post._id}`}>
						<Button variant='contained' color="primary">
							Edit
						</Button>
						</Link>
								
						<Button variant="contained" color="secondary">Delete</Button>
						</div>
					)}
					</ListItemSecondaryAction>
					</ListItem>
					
					<Divider/>
				</Link>
			)
		})
		return(
			<div className='container'>
				<div className='row'>
					<div className='col-md-8'>
					{allAuctions}
					
					</div>
					<div className='col-sm-4'>
						{isAuthenticated() && isAuthenticated().user.seller && (
							<Link style={{float: 'right'}} className='mb-5 btn btn-primary' to={`/auctions/new/${isAuthenticated().user._id}`}>Add New Auction</Link>
						)}
					</div>
				</div>
			</div>
		)
	}
}

export default AuctionList;