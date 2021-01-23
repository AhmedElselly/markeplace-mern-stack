import React from 'react';
import {Link} from 'react-router-dom';
import AddToCart from './AddToCart';

const Suggestions = ({products, title}) => {
	const displayProducts = products.map(product => {
		return (
			<div>
				<div className="card mb-3" style={{maxWidth: '540px'}}>
				  <div className="row no-gutters">
				    <div className="col-md-4">
				      <img src={`http://localhost:8000/products/${product._id}/image`} className="card-img" alt="..."/>
				    </div>
				    <div className="col-md-8">
				      <div className="card-body">
				        <Link to={`/product/${product.shop._id}/show/${product._id}`}><h5 className="card-title">{product.name}</h5></Link>
				        <p className="card-text">{product.description}</p>
				    		<AddToCart item={product} /> 

				        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		)
	})
	return(
		<div>
			{displayProducts}
		</div>
	)
}

export default Suggestions;