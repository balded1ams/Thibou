"use server"

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
        console.log('result : ', result);

        if (result) {
            return NextResponse.json({ success: "Authentification confirmé" });
        } else  {
            return NextResponse.json({ success: "Echec de l'authentification" });

        }
    } catch (error) {
        // Handle unexpected errors
        console.error("Error during sign-in:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        );
    }


}
