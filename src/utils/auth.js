import {autoAPI} from '../config/config';



export const getUser = (token, cb) => {
	autoAPI.get('/auth/user', {
		headers: {'Authorization': 'Bearer '+ token}
	})
	.then((response) => cb(response.data))
	.catch((error) => {
		console.log('Error getting user');
		console.log(error);
	})
}

export const logout = (user, cb) => {
	autoAPI.post(`/auth/logout`,{},{
		headers: {
				'Authorization': 'Bearer '+ user.token
		}
	})
	.then((response) => {
		if (response.status === 200) {
            cb(response.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}


export const sendResetLink = (payload, cb) => {
	autoAPI.post(`/auth/password/email`, JSON.stringify(payload))
	.then((response) => {
		if (response.status === 200) {
            cb(response.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}

export const resetPassword = (payload, cb) => {
	autoAPI.post(`/auth/password/reset`, JSON.stringify(payload))
	.then((response) => {
		if (response.status === 201) {
            cb(response.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}