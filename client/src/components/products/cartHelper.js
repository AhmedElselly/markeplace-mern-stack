export const addItem = (item, cb) => {
	let cart = [];
	if(typeof window !== 'undefined'){
		if(localStorage.getItem('cart')){
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		cart.push({
			product: item,
			quantity: 1,
			shop: item.shop._id
		});

		localStorage.setItem('cart', JSON.stringify(cart));
		console.log(cart);
		cb();
	}
}

export const itemTotal = () => {
	if(typeof window !== 'undefined'){
		if(localStorage.getItem('cart')){
			return JSON.parse(localStorage.getItem('cart')).length;
		}
	}
	return 0;
}

export const getCart = () => {
	if(typeof window !== 'undefined'){
		if(localStorage.getItem('cart')){
			return JSON.parse(localStorage.getItem('cart'));
		}
	}
	return [];
}

export const updateCart = (itemIndex, quantity) => {
	let cart = [];
	if(typeof window !== 'undefined'){
		if(localStorage.getItem('cart')){
			cart = JSON.parse(localStorage.getItem('cart'))
		}
		cart[itemIndex].quantity = quantity;
		localStorage.setItem('cart', JSON.stringify(cart));
	}
}

export const removeCartItem = i => {
	let cart = [];
	if(typeof window !== 'undefined'){
		if(localStorage.getItem('cart')){
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		cart.splice(i, 1);
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	return cart;
}

export const emptyCart = (cb) => {
	if(typeof window !== undefined){
		localStorage.removeItem('cart');
		cb();
	}
}