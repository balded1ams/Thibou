import { fetchUtilisateur } from "../../../../script/slugify";
import {NextResponse} from "next/server";

export async function POST(req) {

    // Simulate fetching the user profile for a specific user ID
    const usersProfile = await fetchUtilisateur(15);

    // Log the fetched user profile to the console
    return NextResponse.json(usersProfile);



}
