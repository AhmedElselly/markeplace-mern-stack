import React, {Component} from 'react';
import {isAuthenticated} from '../users/apiUser';
import {shopByUser} from './apiShop';
import {Link} from 'react-router-dom';
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
class UserShops extends Component{
	constructor(props){
		super(props);
		this.state = {
			shops: []
		}
	}

	componentDidMount(){
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		shopByUser(_id, token).then(res => {
			console.log(res.data);
			this.setState({shops: res.data});
		})
	}
	render(){
		const shops = this.state.shops.map((shop, i) => {
			return <Link to={`/shops/show/${shop._id}`} key={i}>
							<Divider/>
							<ListItem button>
								<ListItemAvatar>
									<Avatar src={`http://localhost:8000/shops/${shop._id}/image`}/>
								</ListItemAvatar>
								<div className={''}>
									<Typography type="headline"
									component="h2" color="primary">
									{shop.name}
									</Typography>
									<Typography type="subheading" component="h4">
									{shop.description}
									</Typography>
								</div>
								<ListItemSecondaryAction>
							{isAuthenticated() && isAuthenticated().user._id === shop.owner._id && (
								<div>
								<Link className='mr-3' to={`/shop/edit/${shop._id}`}>
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
		})
		return(
			<div className='container mt-5'>
				<div className='row'>
					<div className='col-8'>
						<h1>User Shops</h1>
						{shops}
					</div>
					<div className='col-4'>
						<Link className='btn btn-primary' to='/shop/new'>Create New Shop</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default UserShops;