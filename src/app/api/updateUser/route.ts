import { NextResponse } from 'next/server';
import { db } from "@/db/db";
import {utilisateur, utilisateurlogin} from "@/db/schema";
import { eq } from "drizzle-orm";
import { comparePasswords, hashPassword } from "@/../script/session";
import {signUp, utilisateurUpdate, utilisateurUpdateWithPassword} from "../../../../script/login";

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



        if ((typeof oldPassword == "string") && (typeof newPassword == "string") ) {
            formData.append("nomutilisateur", nomutilisateur);
            formData.append("oldPassword", oldPassword);
            formData.append("newPassword", newPassword);
            formData.append("iconeuser", iconeuser);
            console.log('test25');


            // Create an initial empty action state
            const actionState = {};
            return  NextResponse.json(await utilisateurUpdateWithPassword(actionState, formData));
        } else {
            formData.append("nomutilisateur", nomutilisateur);
            formData.append("iconeuser", iconeuser);
            return  NextResponse.json(await utilisateurUpdate(actionState, formData));
        }


    } catch (error) {
        return NextResponse.json(
            { error: "KO" },
            { status: 500 }
        );
    }
}
