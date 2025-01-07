import { useThemeContext } from "@/hooks/useTheme";

const VisiteUtilisateurInf = () => {
    const { systemTheme } = useThemeContext();

    return (
        <section>
            <h2>Ou reprendre votre dernière visite :</h2>
            <table>
                <thead>
                    <tr>
                        <th>Oeuvre en cours :</th>
                        <th>Salle :</th>
                        <th>Date de la visite :</th>
                        <th>Temps restant :</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>

                    <tr>
                        <td></td>
                    </tr>

                    <tr>
                        <td></td>
                    </tr>

                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};

export default VisiteUtilisateurInf;