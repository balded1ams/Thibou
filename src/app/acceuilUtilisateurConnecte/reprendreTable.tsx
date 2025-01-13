import { useThemeContext } from "@/hooks/useTheme";
import TabRow from "./tabRow";

const ReprendreTable = () => {

    const { systemTheme } = useThemeContext();

    function getNbParcoursSauvegardes(): number {
        // Récupérer le nombre de parcours sauvegardés et le retourner
        return 2;
    };
    
    const array = ["Parcours 1", "Parcours 2", "Parcours 3", "Parcours 4"];

    function DisplayElements() {
        const nbParcours = getNbParcoursSauvegardes();

        if (nbParcours > 0) {
            return (
            <tbody className="grid grid-cols-4">
                {array.slice(0, nbParcours).map((element, index) => (
                <tr key={index} className="border p-2">
                    <td>{element}</td>
                </tr>
                ))}
            </tbody>
            );
        }

        return <p>Aucun parcours sauvegardé.</p>;
    }

    return (
        <table 
            className="flex flex-col rounded-xl"
            style={{ 
                backgroundColor: systemTheme.background.secondary, 
            }}
        >
            <thead>
                <tr className="grid grid-cols-4">
                    <th>Oeuvre en cours :</th>
                    <th>Salle :</th>
                    <th>Date de la visite :</th>
                    <th>Temps restant :</th>
                </tr>
            </thead>
            <tbody className="grid grid-cols-4 grid-rows-">
                
                <TabRow />
            </tbody>
        </table>
    );
};

export default ReprendreTable;
