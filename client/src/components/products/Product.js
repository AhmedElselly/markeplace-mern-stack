import React, {useState, useEffect} from 'react';
import {getSingleProduct, relatedList} from './apiProduct';
import Suggestions from './Suggestions';
import {Card, CardHeader, CardMedia, Typography, Icon} from '@material-ui/core';
import {Link} from 'react-router-dom';
import AddToCart from './AddToCart';

const Product = ({match}) => {
	const [product, setProduct] = useState({shop: {}});
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		console.log(match.params.productId)
		const {productId} = match.params;
		getSingleProduct(productId).then(res => {
			console.log(res.data);
			setProduct(res.data);
		})
	}, [match.params.productId]);

	useEffect(() => {
		const {productId} = match.params;
		relatedList(productId).then(res => {
			console.log(res.data);
			setSuggestions(res.data);
		})
	}, [match.params.productId])

	return(
		<div className='container mt-5'>
			<div className='row'>
				<div className='col-md-4'>
					<div className="card mb-3" style={{maxWidth: '540px'}}>
					  <div className="row no-gutters">
					    <div className="col-md-4">
					      <img height='100%' style={{objectFit: 'cover'}} src={`http://localhost:8000/products/${product._id}/image`} className="card-img" alt="..."/>
					    </div>
					    <div className="col-md-8">
					      <div className="card-body">
					        <h5 className="card-title">{product.name}</h5>
					        <p className="card-text">{product.description}</p>
					        <p className="card-text">${product.price}</p>
					        <p className="card-text">{product.category}</p>
					        {/*isAuthenticated() && isAuthenticated().user._id === ownerId && (
						    		<Link to={`/product/${shop._id}/edit/${productId}`} className="btn btn-primary">Edit</Link>

					    	)*/}
					    	<AddToCart item={product} /> 
					    	<Link to={`/product/${product.shop._id}/edit/${product._id}`} className="btn btn-primary">Edit</Link>
					        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
					      </div>
					    </div>
					  </div>
					</div>
				</div>
				<div className='col-md-8'>
					<Suggestions products={suggestions} title='Related Products'/>
				</div>
			</div>
		</div>
	)
}

export default Product;