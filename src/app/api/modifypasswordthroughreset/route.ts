import {NextResponse} from "next/server";
import {modifyPasswordwithReset, resetPassword, signIn} from "../../../../script/login";

export async function POST(request: Request) {


    const body = await request.json(); // Parse the JSON body
    const { uuid, newpassword } = body;

    // Create a new FormData object
    const formData = new FormData();

    // Append variables to the FormData
    formData.append("uuid", uuid);
    formData.append("newpassword", newpassword);


    // Create an initial empty action state
    const actionState = {};

    // Call the signIn function with the form data

    const result = await modifyPasswordwithReset(actionState, formData);

    if (result) {
        return NextResponse.json({ success: "OK" });
    } else {
        return NextResponse.json({ success: "KO"});
    }


}
