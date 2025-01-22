import {NextResponse} from 'next/server';
import { signIn } from "@/../script/login";



export async function POST(request: Request) {

    try {


        const body = await request.json(); // Parse the JSON body
        const { email, password } = body;

        // Create a new FormData object
        const formData = new FormData();

        // Append variables to the FormData
        formData.append("email", email);
        formData.append("password", password);

        // Create an initial empty action state
        const actionState = {};

        // Call the signIn function with the form data
        const result = await signIn(actionState, formData);
        /*
        // Handle the result (e.g., success or error)
        if (result.error) {
           return NextResponse.json({ error: result.error }, { status: 400 });
         }*/

        if (result) {
            return NextResponse.json({ 'authentification': 'OK' });
        } else  {
            return NextResponse.json({ 'authentification': 'KO' });
        }
    } catch (error) {
        // Handle unexpected errors
        return NextResponse.json(
            { error: "KO" }, { status: 500 }
        );
    }


}
