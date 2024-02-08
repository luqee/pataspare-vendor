import { autoAPI } from "@/config/axios";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

export const GET = async (request: NextRequest) =>{
    const token = cookies().get('token')
    const search = request.nextUrl.searchParams.toString()
    let reqPath = '/vendor/inquiries'
    if (search) {
        reqPath+=`?${search}`
    }
    const response = await autoAPI.get(reqPath,{
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