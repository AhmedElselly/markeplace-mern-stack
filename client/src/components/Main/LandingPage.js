import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'

class LandingPage extends Component{
	render(){
		return(
			<div className='banner'>
				<header>
					<Link className='logo' to='#'>watch</Link>
					<div className='toggle'></div>
				</header>
			</div>
		)
	}
}

export default LandingPage;