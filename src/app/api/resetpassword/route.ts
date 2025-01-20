import {NextResponse} from "next/server";
import {resetPassword, signIn} from "../../../../script/login";

export async function POST(request: Request) {


    const body = await request.json(); // Parse the JSON body
    const { email } = body;

    // Create a new FormData object
    const formData = new FormData();

    // Append variables to the FormData
    formData.append("email", email);

    // Create an initial empty action state
    const actionState = {};

    // Call the signIn function with the form data

    const result = await resetPassword(actionState, formData);
    return NextResponse.json({ success: "devrai marché" });


}
