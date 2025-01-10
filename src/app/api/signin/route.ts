"use server"
import { db } from "@/db/db";
import { utilisateur } from "@/db/schema"
import {NextResponse} from 'next/server';
import {eq} from "drizzle-orm";
import { signIn } from "@/../script/login";

/*
export async function POST(request: Request) {

    try {
        //const email = 'elsebeim@acom';
        //const password = 'elsebpasswrd';

        const body = await request.json(); // Parse the JSON body
        const { email, password } = body;

        console.log("email : ", email);
        console.log("password : ", password);

        console.log("test1");

        const user = await db
            .select({
                adressemail: utilisateur,
            })
            .from(utilisateur)
            .where(eq(utilisateur.adressemail, email))
            .limit(1);

        console.log("test2");

        console.log(user);


        if (user.length === 0) {
            return { error: "Invalid username or password. Please try again." };
        }

        const { adressemail: foundUser } = user[0];

        if (foundUser.password === password) {
            console.log("Bon mot de passe")
            return NextResponse.json(
                { message: "Ca marche" },
                { status: 200 }
            );
        }


        console.log(JSON.stringify(user, null, 2));

        return NextResponse.json(
            { message: "Ca marche peut etre" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Error processing request' },
            { status: 500 }
        );
    }


}
*/

import { z } from "zod";


const authSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
});

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

        // Handle success (you can customize this as needed)
        return NextResponse.json({ success: "Login checked, not sure if it is succesful!" });
    } catch (error) {
        // Handle unexpected errors
        console.error("Error during sign-in:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        );
    }


}
