"use server"
import { db } from "@/db/db";
import { utilisateur } from "@/db/schema"
import {NextResponse} from 'next/server';
import {eq} from "drizzle-orm";
import { signUp} from "@/../script/login";



import { z } from "zod";


const authSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
});

export async function POST(request: Request) {

    try {


        const body = await request.json(); // Parse the JSON body
        const {email, password , username} = body;

        // Create a new FormData object
        const formData = new FormData();

        // Append variables to the FormData
        formData.append("email", email);
        formData.append("password", password);
        formData.append("username", username);



        // Create an initial empty action state
        const actionState = {};

        // Call the signIn function with the form data
        return  NextResponse.json(await signUp(actionState, formData));


    } catch (error) {
        return NextResponse.json(
            { error: "KO" },
            { status: 500 }
        );
    }


}
