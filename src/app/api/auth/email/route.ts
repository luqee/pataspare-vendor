import { autoAPI } from "@/config/axios"
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    let email = params.get('email')
    let response = null
    try {
        response = await autoAPI.get(`/auth/email/resend?email=${email}`, {
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
        })
    } catch (error) {
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