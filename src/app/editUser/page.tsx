
import React from "react";
import EditUserComponent from "./editUser";
import { getIdUserFromSession } from "../../../script/session";
import { fetchUtilisateur } from "../../../script/slugify";
import { utilisateurType } from "@/types";

const EditUser = async () => {
    const idUser = await getIdUserFromSession();
    let userConnected: utilisateurType | null = null;

    if (idUser) {
        userConnected = await fetchUtilisateur(idUser);
    }

    if (!userConnected) {
        return <div>Chargement...</div>;
    }

    return <EditUserComponent userConnected={userConnected} />;
};

export default EditUser;
