import axios from 'axios';

const url = 'http://localhost:8000';

export const postAuction = async (userId, token, formData) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

	const res = await axios.post(`${url}/auctions/create/${userId}`, formData);
	return res;
}

export const auctionList = async () => {
	const res = await axios.get(`${url}/auctions/all-auctions`);
	return res;
}

export const getAuction = async (auctionId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

	const res = await axios.get(`${url}/auctions/${auctionId}`);
	return res;
}
