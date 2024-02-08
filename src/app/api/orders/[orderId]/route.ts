import { autoAPI } from "@/config/axios";
import { cookies } from "next/headers";

export const GET = async (req: Request, {params}: { params: { orderId: number } }) =>{
    const token = cookies().get('token')
    const response = await autoAPI.get(`/vendor/orders/${params.orderId}`,{
        headers: {
            'Authorization': 'Bearer '+ token?.value
        },
        validateStatus: function (status) {
            return status < 500;
        }
    })
    if (response){
        return Response.json(response.data, {
            status: response.status,
          })
    } else {
        // No response received
        console.log('No response received');
        return Response.json({ error: 'Error Processing request' }, {
          status: 400,
        });
    }
}

export const PUT = async (req: Request, {params}: { params: { orderId: number } }) => {
    const token = cookies().get('token')
    const data = await req.json()
    let response = null
    try {
        response = await autoAPI.put(`/vendor/orders/${params.orderId}`, data, {
            headers: {
                'Authorization': 'Bearer '+ token?.value,
            },
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        })
    } catch (error) {
        console.log('Error modiying');
        console.log(error);
    }
    if (response) {
        return Response.json(response.data, {
            status: response.status,
        })
        // redirect('/admin')
    } else {
        // No response received
        console.log('No response received');
        return Response.json({ error: 'Error Processing request' }, {
            status: 400,
        });
    }
}