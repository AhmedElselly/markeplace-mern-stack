import axios from 'axios';

const url = 'http://localhost:8000';

export const createShop = async (userId, formData, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.post(`${url}/shops/create/${userId}`, formData);
	return res;
}

export const updateShop = async (userId, formData, shopId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/shops/update/${userId}/${shopId}`, formData);
	return res;
}

export const shopIndex = async () => {
	const res = await axios.get(`${url}/shops`);
	return res;
}

export const shopByUser = async (userId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.get(`${url}/shops/by/${userId}`)
	return res;
}

export const getShop = async (shopId) => {
	const res = await axios.get(`${url}/shops/${shopId}`);
	return res;
}

export const getOwner = async (userId, shopId) => {
	console.log(shopId)
	const res = await axios.get(`${url}/shops/${shopId}/owner/${userId}`);
	return res;
}