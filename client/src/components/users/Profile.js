import React, {Component} from 'react';
import {isAuthenticated, getUser, stripeConnectingReq} from './apiUser';
import {Link, Redirect, Route} from 'react-router-dom';
import queryString from 'query-string';
import TabPanel from './TabPanel';
import {
	AppBar,
	Tabs,
	Tab
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';

class Profile extends Component{
	constructor(props){
		super(props);
		this.state = {
			fullName: '',
			id: '',
			seller: '',
			publicKey: '',
			stripe_seller: null,
			stripeConnecting: false,
			stripeConnectingLink: '',
			value: 0
		}
		this.handleConnectStripe = this.handleConnectStripe.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.a11yProps = this.a11yProps.bind(this);
	}

	componentDidMount(){
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		getUser(_id).then(res => {
			console.log(res.data)
			this.setState({
				fullName: res.data.user.fullName,
				seller: res.data.user.seller, 
				id: res.data.user._id,
				publicKey: res.data.publicKey,
				stripe_seller: res.data.user.stripe_seller
			});
		});
		const parsed = queryString.parse(this.props.location.search);
		console.log(parsed)
		
	}

	handleConnectStripe(e){
		const {_id, email} = isAuthenticated().user;
		const {token} = isAuthenticated();
		stripeConnectingReq(_id, email,token).then(res => {
			console.log(res.data);
			this.setState({
				stripeConnecting: true,
				stripeConnectingLink: res.data.url
			})
		})
	}

	handleChange(e, value){
		this.setState({value})
	}

	a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

	render(){
		const {
			fullName,
			id, 
			seller, 
			stripe_seller, 
			stripeConnecting, 
			stripeConnectingLink, 
			publicKey,
			value
		} = this.state;
		if(stripeConnecting){
			// return <Route to='/' render={() => window.location={stripeConnectingLink} />
			return window.location.href = `${stripeConnectingLink}`
		}
		// console.log(this.state)
		// const client_id = 'ca_IhcPdaIJXBtbyl6Qab4X9KlAMGIOqdMo';
		return(
			<div className='container mt-3'>
			<h1>User's Profile</h1>
				<div className='row'>
				<div className='col-8'>
					{fullName}
				</div>
				<div className='col-4'>
					{seller && (stripe_seller ? (
						<button className='btn btn-disabled' disabled>Stripe Connected</button>
					):(
						<button onClick={this.handleConnectStripe} className='btn btn-primary'>Connect to Stripe</button>
					))}
					<Link className='btn btn-warning' to={`/profile/${id}/edit`}>Edit Profile</Link>
					
				</div>
				</div>
				<AppBar position="static">
	        <Tabs
	          value={value}
	          onChange={this.handleChange}
	          variant="scrollable"
	          scrollButtons="off"
	          aria-label="scrollable prevent tabs example"
	        >
	          <Tab icon={<PhoneIcon />} aria-label="phone" {...this.a11yProps(0)} />
	          <Tab icon={<FavoriteIcon />} aria-label="favorite" {...this.a11yProps(1)} />
	          <Tab icon={<PersonPinIcon />} aria-label="person" {...this.a11yProps(2)} />
	          <Tab icon={<HelpIcon />} aria-label="help" {...this.a11yProps(3)} />
	          <Tab icon={<ShoppingBasket />} aria-label="shopping" {...this.a11yProps(4)} />
	          <Tab icon={<ThumbDown />} aria-label="up" {...this.a11yProps(5)} />
	          <Tab icon={<ThumbUp />} aria-label="down" {...this.a11yProps(6)} />
	        </Tabs>
	      </AppBar>
	      <TabPanel value={value} index={0}>
	        Item One
	      </TabPanel>
	      <TabPanel value={value} index={1}>
	        Item Two
	      </TabPanel>
	      <TabPanel value={value} index={2}>
	        Item Three
	      </TabPanel>
	      <TabPanel value={value} index={3}>
	        Item Four
	      </TabPanel>
	      <TabPanel value={value} index={4}>
	        Item Five
	      </TabPanel>
	      <TabPanel value={value} index={5}>
	        Item Six
	      </TabPanel>
	      <TabPanel value={value} index={6}>
	        Item Seven
	      </TabPanel>
			</div>
		)
	}
}

export default Profile;