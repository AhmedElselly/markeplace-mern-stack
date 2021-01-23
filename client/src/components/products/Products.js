import React, {Component} from 'react';
import {GridList, GridListTile, GridListTileBar, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import AddToCart from './AddToCart';

class Products extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const {products, shopId} = this.props;
		const allProducts = products.map(product => {
			return(
				<div key={product._id} className="card mb-3" style={{maxWidth: '540'}}>
				  <div className="row no-gutters">
				    <div className="col-md-4">
				      <img height='100%' style={{objectFit: 'cover'}} src={`http://localhost:8000/products/${product._id}/image`} className="card-img" alt="..."/>
				    </div>
				    <div className="col-md-8">
				      <div className="card-body">
				        <Link to={`/product/${shopId}/show/${product._id}`}><h5 className="card-title">{product.name}</h5></Link>
				        <p className="card-text">{product.description}</p>
				    	<AddToCart item={product} /> 

				        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
				      </div>
				    </div>
				  </div>
				</div>
			)
		})
		return(
			<div>
				{allProducts}
			</div>
		)
	}
}


export default Products;