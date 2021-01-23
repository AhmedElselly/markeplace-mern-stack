import React, {Component} from 'react';
import {addItem} from './cartHelper';
import {Redirect} from 'react-router-dom';

class AddToCart extends Component{
	constructor(props){
		super(props);
		this.state = {
			redirect: false
		}
		this.addToCart = this.addToCart.bind(this);
	}

	addToCart(){
		addItem(this.props.item, () => {
			this.setState({redirect: true});
		})
	}

	render(){
		const {item} = this.props;
		if(this.state.redirect){
			return <Redirect to='/cart' />
		}
		return(
			<div>
				<button onClick={this.addToCart} className='btn btn-success'>AddToCart</button>
			</div>
		)
	}
}

export default AddToCart;