import {autoAPI} from '../config/config';

export const postRegister = (postData, cb) => {
	autoAPI.post(`/auth/register`, JSON.stringify(postData))
	.then((response) => cb(response))
	.catch((error) => cb(error))
}

export const resendEmail = (email, cb) => {
	autoAPI.get(`/auth/email/resend?email=${email}`)
	.then((response) => {
		if (response.status === 200) {
            cb(response.data.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}

export const getVerifyMail = (query, cb) => {
	autoAPI.get(query)
	.then((response) => {
		if (response.status === 200) {
            cb(response.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}

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
		if (response.data.status === 201) {
            cb(response.data.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}

export const postLogin = (postData, cb) => {
	autoAPI.post(`/auth/login`, JSON.stringify(postData))
	.then((response) => cb(response))
	.catch((error) => cb(error))
}

export const socialSignIn = (postData, cb) => {
	autoAPI.post(`/auth/social/google`, JSON.stringify(postData))
	.then((response) => {
		if (response.data.status === 200) {
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
		if (response.data.status === 200) {
            cb(response.data.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}

export const resetPassword = (payload, cb) => {
	autoAPI.post(`/auth/password/reset`, JSON.stringify(payload))
	.then((response) => {
		if (response.data.status === 201) {
            cb(response.data.data)
        }
	})
	.catch((error) => {
		console.log(error);
	})
}