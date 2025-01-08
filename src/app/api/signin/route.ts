/*const POST = async (request : any) => {
  console.log('request is ');
  return Response.json({'message' : 'POST data'});
}

export {POST};*/

import { NextResponse } from 'next/server';



export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the JSON body
    const { email, password } = body;



    // Example: Validate credentials
    if (email === 'admin@example.com' && password === 'password') {
      return NextResponse.json({ message: 'Sign in successful' });
    } else {
      return NextResponse.json(
          { message: 'Invalid email or password' },
          { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
        { message: 'Error processing request' },
        { status: 500 }
    );
  }
}
