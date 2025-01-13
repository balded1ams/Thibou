const TabRow = () => {
    return (
        
        <tr 
            className="grid grid-cols-4"
            onClick={() => {/* Afficher la suite du parcours sauvegardé */}}>
            <td></td> {/*Ajouter les éléments en fonction des parcours précédents de l'utilisateur*/}
            <td></td>
            <td></td>
            <td></td>
        </tr>
    );
};

export default TabRow;