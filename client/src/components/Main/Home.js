import React, {Component} from 'react';
import {isAuthenticated} from '../users/apiUser';
import {shopIndex} from '../shops/apiShop';
import {getCategories} from '../products/apiProduct';
import {Link} from 'react-router-dom';
import {Divider, Avatar, ListItem, ListItemAvatar, Typography} from '@material-ui/core';
import Search from '../products/Search';

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			shops: [],
			categories: []
		}
	}

	componentDidMount(){
		shopIndex().then(res => {
			this.setState({shops: res.data});
		});
		getCategories().then(res => {
			console.log(res.data);
			this.setState({categories: res.data});
		})
	}

	render(){
		const shops = this.state.shops.map((shop, i) => {
			return <Link to={`/shops/show/${shop._id}`} key={shop._id}>
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
						</ListItem>
						<Divider/>
					</Link>
		})
		return(
			<div className='container mt-4'>
				<Search categories={this.state.categories} />
				<h1>All Shops</h1>
				{shops}
			</div>
		)
	}
}

export default Home;