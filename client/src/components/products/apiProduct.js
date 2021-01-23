import axios from 'axios';
import queryString from 'query-string';

const url = 'http://localhost:8000';

export const create = async (userId, formData, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.post(`${url}/products/create/${userId}`, formData);
	return res;
}

export const getShopProducts = async shopId => {
	const res = await axios.get(`${url}/products/show/shop/${shopId}`);
	return res;
}

export const getSingleProduct = async productId => {
	const res = await axios.get(`${url}/products/show/${productId}`);
	return res;
}

export const relatedList = async productId => {
	const res = await axios.get(`${url}/products/${productId}/related`);
	return res;
}

export const updateProduct = async (userId, formData, productId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/products/${productId}/update/${userId}`, formData);
	return res;
}

export const getCategories = async () => {
	const res = await axios.get(`${url}/products/categories`);
	return res;
}

export const postSearch = async (search, category) => {
	// const query = queryString.stringify(search, category);
	// console.log(query)
	console.log(search)
	console.log(category)
	const res = await axios.get(`${url}/products/search`, {
		params: {
			search,
			category
		},
		paramsSerializer: params => {
			console.log(queryString.stringify(params));
			return queryString.stringify(params, {arrayFormat: 'repeat'});
		}
	})
	return res;
}

export const createOrder = async (userId, t, checkoutDetails, card, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${t}`};
	console.log(card)
	const res = await axios.post(`${url}/orders/create/order/${userId}`, {
		checkoutDetails,
		token,
		card
	});
	return res;
}


// export const createOrder = async (userId, token, products, customer_email, customer_name, city, country, state, street, zipcode, tokenId) => {
// 	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
// 	// console.log(checkoutDetails)
// 	const res = await axios.post(`${url}/orders/create/order/${userId}`, {
// 		products,
// 		customer_email, 
// 		customer_name,
// 		city,
// 		country,
// 		state,
// 		street,
// 		zipcode, 
// 		tokenId
// 	});
// 	return res;
// }