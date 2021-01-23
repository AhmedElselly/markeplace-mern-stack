import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import {isAuthenticated, stripeUpdate} from './apiUser';

const StripeConnect = (props) => {
	const [values, setValues] = useState({});
	const [connected, setConnected] = useState(false);
	useEffect(() => {
		const {token} = isAuthenticated();
		const {_id} = isAuthenticated().user;
		const parsed = queryString.parse(props.location.search);
		console.log(parsed);
		stripeUpdate(_id, token, parsed.code).then(res => {
			console.log(res.data);
			setValues({...values});
			setConnected(true);
		})
	})
	console.log(values)
	return (
		<div>StripeConnect</div>
	)
}

export default StripeConnect;