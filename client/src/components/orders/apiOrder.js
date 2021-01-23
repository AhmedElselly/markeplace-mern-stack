import axios from 'axios';

const url = 'http://localhost:8000';

export const listByShop = async (shopId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

	const res = await axios.get(`${url}/orders/shop/${shopId}`);
	return res;
}

export const getStatusValues = async (orderId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.get(`${url}/orders/${orderId}/get-all-status`);
	return res;
}

export const updateOrderStatus = async (status, orderId, shopId, cartItemId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/orders/status/${shopId}`, {status, cartItemId, orderId});
	return res;
}


export const createCharge = async (orderId, token, userId, shopId, cartItemId, status, amount) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	console.log("userId", userId)
	const res = await axios.put(`${url}/orders/${orderId}/charge/${userId}/${shopId}`, {cartItemId, status, amount});
	return res;
}