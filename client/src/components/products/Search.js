import React, {Component} from 'react';
import {TextField, MenuItem, Button} from '@material-ui/core';
import {postSearch} from './apiProduct';
import {Link} from 'react-router-dom';
import AddToCart from './AddToCart';

class Search extends Component{
	constructor(props){
		super(props);
		this.state = {
			category: 'All',
			search: '',
			result: [],
			searched: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.search = this.search.bind(this);
		this.searchProducts = this.searchProducts.bind(this);
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	search(e){
		e.preventDefault();
		const {category, search} = this.state;
		console.log(category)
		postSearch(search, category).then(res => {
			console.log(res.data);
			this.setState({result: res.data, searched: true});
		})
	}

	searchProducts(val = []) {
    return(
        <div>
          <div className='row'>
            {val.map((product, i) => (
                <div key={product._id} className="card mb-3" style={{maxWidth: '540px'}}>
							  <div className="row no-gutters">
							    <div className="col-md-4">
							      <img height='100%' style={{objectFit: 'cover'}} src={`http://localhost:8000/products/${product._id}/image`} className="card-img" alt="..."/>
							    </div>
							    <div className="col-md-8">
							      <div className="card-body">
							        <Link to={`/product/${product.shop._id}/show/${product._id}`}><h5 className="card-title">{product.name}</h5></Link>
							        <p className="card-text">{product.description}</p>
							        <p className="card-text">${product.price}</p>
							        <p className="card-text">{product.category}</p>
						    	<AddToCart item={product} /> 

							    	<Link to={`/product/${product.shop._id}/edit/${product._id}`} className="btn btn-primary">Edit</Link>
							        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
							      </div>
							    </div>
							  </div>
							</div>
            ))}
          </div>
        </div>
    )
    }

	render(){
		const {category, search, result, searched} = this.state;
		console.log('category', category)
		return(
			<div>
				{/*<TextField id="select-category" select label="Select category"
								value={category}
								onChange={handleChange}
								selectProps={{ MenuProps: { className: ''} }}>
								<MenuItem value="All"> All </MenuItem>
									{categories.map(option => (
									<MenuItem key={option} value={option}> {option} </MenuItem>
									))}
								</TextField>
								<TextField id="search" label="Search products" type="search"
								onKeyDown={enterKey}
								onChange={handleChange('search')}
								/>
							<Button raised onClick={search}> Search </Button>*/}
				<form onSubmit={this.search}>
					<div class="form-group">
				    <label htmlFor="search">Search</label>
				    <select name="category" onChange={this.handleChange} id="">
					    <option value="All">All</option>
					    {this.props.categories.map((category, i) => {
					    	return(
					    		<option key={i} value={category}>{category}</option>
					    	)
					    })}
				    </select>
				    <input type="text" className="form-control"
				    value={search} name='search' onChange={this.handleChange} htmlFor="search" placeholder="Search"/>
				    <button className='btn btn-primary'>Search</button>
				  </div>
				  {searched && result.length && (
				  	<div>
				  		{this.searchProducts(result)}
				  	</div>
			  	)}
				</form>
			</div>
		)
	}
}

export default Search;