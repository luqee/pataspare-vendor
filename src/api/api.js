import {autoAPI} from '../config/config';

export const getShops = (token, cb)=>{
    autoAPI.get(`/vendor/shops`,{
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const postShops = (token, payload, cb)=>{
    autoAPI.post('/vendor/shpos', payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+ token
        }
    })
    .then((response) => {
        if (response.status === 201) {
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const postUpdateShops = (token, shopId, payload, cb)=>{
    autoAPI.post(`/vendor/shpos/${shopId}`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+ token
        }
    })
    .then((response) => {
        if (response.status === 201) {
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const deleteShops = (token, shopId, cb)=>{
    autoAPI.post(`/vendor/shpos${shopId}`, {
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then((response) => {
        if (response.status === 200) {
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const getCategories = (cb) => {
    autoApi.get('/categories')
    .then((response) => {
        if (response.data.status === 200){
            cb(response.data.data.categories)
        }
    })
    .catch((error) => {
        console.log('Woops an error '+error);
    })
}

export const getCategoriesPreview = (cb) => {
    autoApi.get('/categories?preview=true')
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log('Woops an error '+error);
    })
}

export const getBrands = (cb)=>{
    autoApi.get('/brands')
    .then((response) => {
        if (response.data.status === 200){
            cb(response.data.data.brands)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}




export const getShop = (shopId, cb)=>{
    autoApi.get(`/shops/${shopId}`)
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const getSearch = (queryString, cb)=>{
    autoApi.get(`/search?${queryString}`)
    .then((response) => {
        if (response.data.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const getParts = (cb)=>{
    autoApi.get(`/parts`)
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const postInquiry = (user, payload, cb)=>{
    autoApi.post('/inquiries', JSON.stringify(payload), {
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
    });
}

export const getOrders = (user, cb) => {
	autoApi.get(`/orders`, {
		headers: {'Authorization': 'Bearer '+ user.token}
	})
	.then((response) => cb(response.data))
	.catch((error) => {
		console.log('Error getting orders');
		console.log(error);
	})
}

export const getOrder = (orderId, user, cb) => {
	autoApi.get(`/orders/${orderId}`, {
		headers: {'Authorization': 'Bearer '+ user.token}
	})
	.then((response) => cb(response.data))
	.catch((error) => {
		console.log('Error getting order');
		console.log(error);
	})
}

export const getInquiries = (user, cb) => {
	autoApi.get(`/inquiries`, {
		headers: {'Authorization': 'Bearer '+ user.token}
	})
	.then((response) => cb(response.data))
	.catch((error) => {
		console.log('Error getting inquiries');
		console.log(error);
	})
}

export const getInquiry = (inquiryId, user, cb) => {
	autoApi.get(`/inquiries/${inquiryId}`, {
		headers: {'Authorization': 'Bearer '+ user.token}
	})
	.then((response) => cb(response.data))
	.catch((error) => {
		console.log('Error getting inquiry');
		console.log(error);
	})
}

export const postReplyInquiry = (inquiryId, payload, user, cb) => {
    autoApi.post(`/inquiries/${inquiryId}/replies`, JSON.stringify(payload), {
        headers: {'Authorization': 'Bearer '+ user.token}
    })
    .then((response) => {
        if(response.status === 201){
            cb(response.data)
        }
    })
	.catch((error) => {
		console.log('Error posting reply');
		console.log(error);
	})
}