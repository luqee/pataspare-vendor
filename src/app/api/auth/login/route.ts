import { autoAPI } from "@/config/axios"

export async function POST(req: Request) {
  const data = await req.json()
  let response = null
  try {
    response = await autoAPI.post(`/auth/login`, JSON.stringify(data), {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    })
  } catch (error) {
    console.log(error);
  }
  if (response) {
    return Response.json(response.data.data.user, {
      status: response.status,
      headers: {'Set-cookie': `token=${response.data.data.token}; path=/`}
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