import React from "react";
import ViewUserComponent from "@/components/viewUser";
import { headers } from "next/headers";
import { getIdUserFromSession } from "../../../script/session";
import { fetchUtilisateur } from "../../../script/slugify";
import { utilisateurType } from "@/types";

const EditUser = async () => {
    const headersList = headers();
    const idUser = await getIdUserFromSession(await headersList);
    let userConnected: utilisateurType | null = null;
    
    if (idUser) {
        userConnected = await fetchUtilisateur(idUser);
    }

    if (!userConnected) {
        return <div>Chargement...</div>;
    }

    return <ViewUserComponent userConnected={userConnected} />;
};

export default EditUser;