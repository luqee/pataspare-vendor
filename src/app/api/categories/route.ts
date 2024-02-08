import { autoAPI } from "@/config/axios"

export const GET = async () =>{
    const response = await autoAPI.get(`/categories`,{
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