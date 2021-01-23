import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuthenticated} from '../users/apiUser';
import {itemTotal} from '../products/cartHelper';

import './Menu.css';

const Menu = () => {
	return(
		<nav className="navbar navbar-expand-lg purple-navbar navbar-dark bg-dark">
		  <Link className="navbar-brand" to="/">Market Place</Link>
		  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    <span className="navbar-toggler-icon"></span>
		  </button>

		  <div className="collapse navbar-collapse" id="navbarSupportedContent">
		    <ul className="navbar-nav mr-auto">
		      <li className="nav-item active">
		        <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
		      </li>
		      {isAuthenticated() && (
		      	<div>
			      	<li className="nav-item">
			        	<Link className="nav-link" to={`/profile/${isAuthenticated().user._id}`}>{isAuthenticated().user.fullName}</Link>
			      	</li>		
		      	</div>
		      	)}
		      {isAuthenticated() && isAuthenticated().user.seller && (
		      	<Fragment>
			      	<li className="nav-item">
			        	<Link className="nav-link" to={`/shops/${isAuthenticated().user._id}`}>Your Shops</Link>
			      	</li>
			      	<li className="nav-item">
			        	<Link className="nav-link" to={`/auctions`}>Auctions</Link>
			      	</li>
		      	</Fragment>
      		)}
		      {
		      	!isAuthenticated() && (
		      		<Fragment>
		      			<li className="nav-item">
					        <Link className="nav-link" to="/login">Login</Link>
					      </li>
					      <li className="nav-item">
					        <Link className="nav-link" to="/register">Register</Link>
					      </li>			
		      		</Fragment>
	      		)
		      }
		      <li className="nav-item">
		        <Link className="nav-link" to="/cart">Cart {itemTotal()}</Link>
		      </li>
		      <li className="nav-item dropdown">
		        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		          Dropdown
		        </Link>
		        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
		          <Link className="dropdown-item" to="#">Action</Link>
		          <Link className="dropdown-item" to="#">Another action</Link>
		          <div className="dropdown-divider"></div>
		          <Link className="dropdown-item" to="#">Something else here</Link>
		        </div>
		      </li>
		      <li className="nav-item">
		        <Link className="nav-link disabled" to="#" tabIndex="-1" aria-disabled="true">Disabled</Link>
		      </li>
		    </ul>
		    
		  </div>
		</nav>
	)
	
}

export default withRouter(Menu);