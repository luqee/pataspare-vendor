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

export const getShop = (token, shopId, cb)=>{
    autoAPI.get(`/vendor/shops${shopId}`,{
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

export const getShopParts = (token, shopId, cb)=>{
    autoAPI.get(`/vendor/parts/shop/${shopId}`,{
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
    autoAPI.post('/vendor/shops', payload, {
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
    autoAPI.post(`/vendor/shops/${shopId}`, payload, {
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
    autoAPI.delete(`/vendor/shops${shopId}`, {
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

export const getBrands = (cb)=>{
    autoAPI.get('/brands')
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const getCategories = (cb) => {
    autoAPI.get('/categories')
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log('Woops an error '+error);
    })
}

export const postPart = (token, payload, cb)=>{
    autoAPI.post('/vendor/parts', payload, {
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

export const postUpdatePart = (token, partId, payload, cb)=>{
    autoAPI.post(`/vendor/parts/${partId}`, payload, {
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

export const getPart = (partId, cb)=>{
    autoAPI.get(`/vendor/parts/${partId}`, {
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
        console.log(error);
    });
}

export const deletePart = (token, partId, cb)=>{
    autoAPI.delete(`/vendor/parts/${partId}`, {
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

export const getParts = (token, cb)=>{
    autoAPI.get(`/vendor/parts`,{
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

export const getOrders = (token, cb)=>{
    autoAPI.get(`/vendor/orders`,{
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

export const putOrder = (token, orderId, payload, cb)=>{
    autoAPI.put(`/vendor/orders/${orderId}`, JSON.stringify(payload), {
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then((response) => {
        if (response.status === 201){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const getInquiries = (token, cb) => {
	autoAPI.get(`/vendor/inquiries`, {
		headers: {'Authorization': 'Bearer '+ token}
	})
	.then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
	.catch((error) => {
		console.log('Error getting inquiries');
		console.log(error);
	})
}

export const getShopInquiries = (token, shopId, cb) => {
	autoAPI.get(`/vendor/inquiries/shop/${shopId}`, {
		headers: {'Authorization': 'Bearer '+ token}
	})
	.then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
	.catch((error) => {
		console.log('Error getting inquiries');
		console.log(error);
	})
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