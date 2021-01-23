import axios from 'axios';

const url = 'http://localhost:8000';

export const login = async (email, password) => {
	const res = await axios.post(`${url}/login`, {email, password});
	return res;
}

export const register = async (email, password, firstName, lastName, seller) => {
	const res = await axios.post(`${url}/register`, {email, password, firstName, lastName, seller});
	return res;
}

export const authenticate = (token, cb) => {
	localStorage.setItem('token', JSON.stringify(token));
	cb();
}

export const isAuthenticated = () => {
	if(localStorage.getItem('token')){
		return JSON.parse(localStorage.getItem('token'));
	} else {
		return undefined;
	}
}

export const getUser = async (userId) => {
	const res = await axios.get(`${url}/${userId}`);
	return res;
}

export const editProfile = async (userId, firstName, lastName, email, password, seller) => {
	const res = await axios.put(`${url}/${userId}/edit`, {email, firstName, lastName, password, seller});
	return res;
}

export const updateUser = (user, cb) => {
		if(localStorage.getItem('token')){
			let auth = JSON.parse(localStorage.getItem('token'))
			console.log(auth)
			auth.user = user
			localStorage.setItem('token', JSON.stringify(auth))
			cb()
		}
}


export const stripeUpdate = async (userId, token, auth_code) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/stripe_auth/${userId}`, {auth_code});
	return res;
}

export const stripeConnectingReq = async (userId, email, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/stripe_auth/${userId}`);
	return res;
}