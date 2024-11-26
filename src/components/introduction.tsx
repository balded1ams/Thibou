import {useThemeContext} from "../hooks/useTheme.ts";

const Intro = () => {
    const { systemTheme } = useThemeContext();

    return (
        <div className="flex items-center flex-col py-8 ">
            <p className={'font-mono px-16'}
               style={{
                   color: systemTheme.text.primary,
               }}>
                Commençons par rappeler le concept de notre application, celle-ci offre une génération de parcours à l’intérieur d’un musée. Le parcours généré est adapté aux choix de l’utilisateur selon différent critère que on lui aura préalablement proposé.

                Les utilisateurs aurons en plus du parcours proposé, un outil de guidage présent directement depuis l’application et une carte téléchargeable du parcours pour les personne ni disposant pas de connexion d’internet.

                En plus de cela les utilisateurs auront accès a des préférences associé a leurs compte comme le montre ce diagramme UML
            </p>
        </div>
    );
};

export default Intro;