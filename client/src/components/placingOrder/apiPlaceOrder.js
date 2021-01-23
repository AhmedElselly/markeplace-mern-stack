import axios from 'axios';

const url = 'http://localhost:8000';

export const createOrder = async (userId, token, paymentId, checkoutDetails) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.post(`${url}/orders/create/order/${userId}`, {paymentId, checkoutDetails});
	return res;
}