import {appAPI} from '@/config/axios';

export const postRegister = (postData) => {
	return appAPI.post(`/api/auth/register`, JSON.stringify(postData))
}

export const getEmailResend = (query)=>{
    return appAPI.get(`/api/auth/email?${query}`)
}

export const getVerify = (query)=>{
    return appAPI.get(`/api/auth/verify?${query}`)
}

export const postRequestReset = (requestData)=>{
    return appAPI.post(`/api/auth/email`, JSON.stringify(requestData))
}

export const postPasswordReset = (requestData)=>{
    return appAPI.post(`/api/auth/reset`, JSON.stringify(requestData))
}

export const postLogin = (requestData)=>{
    return appAPI.post(`/api/auth/login`, JSON.stringify(requestData))
}

export const postLogout = (requestData)=>{
    return appAPI.post(`/api/auth/logout`, JSON.stringify(requestData))
}

export const postSocialLogin = (requestData)=>{
    return appAPI.post(`/api/auth/social`, JSON.stringify(requestData))
}

export const getShops = ()=>{
    return appAPI.get(`/api/shops`)
}

export const getShop = (shopId)=>{
    return appAPI.get(`/api/shops/${shopId}`)
}

export const postShops = (payload)=>{
    return appAPI.post('/api/shops', payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const updateShop = (shopId, payload)=>{
    return appAPI.put(`/api/shops/${shopId}`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteShop = (shopId)=>{
    return appAPI.delete(`/api/shops/${shopId}`)
}

export const getBrands = ()=>{
    return appAPI.get('/api/brands')
}

export const getCategories = () => {
    return appAPI.get('/api/categories')
}

export const postPart = ( payload)=>{
    return appAPI.post('/api/parts', payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const putPart = (partId, payload)=>{
    return appAPI.put(`/api/parts/${partId}`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getPart = (partId)=>{
    return appAPI.get(`/api/parts/${partId}`)
}

export const deletePart = (partId)=>{
    return appAPI.delete(`/api/parts/${partId}`)
}

export const getParts = (queryString)=>{
    if (queryString) {
        return appAPI.get(`/api/parts?${queryString}`)
    }else{
        return appAPI.get(`/api/parts`)
    }
}

export const getOrders = (query)=>{
    if (query) {
        return appAPI.get(`/api/orders?${query}`)
    }else{
        return appAPI.get(`/api/orders`)
    }
}

export const putOrder = (orderId, payload)=>{
    return appAPI.put(`/api/orders/${orderId}`, JSON.stringify(payload))
}

export const getInquiries = (query) => {
    if (query) {
        return appAPI.get(`/api/inquiries?${query}`)
    }else{
        return appAPI.get(`/api/inquiries`)
    }
}

export const postReplyInquiry = (inquiryId, payload) => {
    return appAPI.post(`/api/inquiries/${inquiryId}/replies`, JSON.stringify(payload))
}

export const getInquiry = (inquiryId) => {
	return appAPI.get(`/api/inquiries/${inquiryId}`)
}
