import { NextResponse } from 'next/server';
import { db } from "@/db/db";
import {utilisateur, utilisateurlogin} from "@/db/schema";
import { eq } from "drizzle-orm";
import { comparePasswords, hashPassword } from "@/../script/session";
import {signUp, utilisateurUpdate} from "../../../../script/login";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {nomutilisateur, oldPassword, newPassword, iconeuser} = body;
        const formData = new FormData();

        formData.append("nomutilisateur", nomutilisateur);
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);
        formData.append("iconeuser", iconeuser);


        // Create an initial empty action state
        const actionState = {};

        // Call the signIn function with the form data
        const result = await utilisateurUpdate(actionState, formData);

        return  NextResponse.json(await signUp(actionState, formData));





    } catch (error) {
        return NextResponse.json(
            { error: "KO" },
            { status: 500 }
        );
    }
}
