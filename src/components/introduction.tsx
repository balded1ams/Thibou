import { useThemeContext } from "@/hooks/useTheme";

const Intro = () => {
    const { systemTheme } = useThemeContext();

    return (
        <div className="flex flex-col items-center py-8 ">
            <p
                className={"text-justify lg:px-16"}
                style={{
                    color: systemTheme.text.primary,
                }}
            >
                L'application Thibou génère des parcours à l’intérieur de musée.
                Le parcours généré selon vos choix. Vous indiquez vos préférences
                et, en plus du parcours proposé, vous aurez un outil de guidage 
                fait par l’application ainsi qu'une carte téléchargeable du 
                parcours pour le cas où vous n'aurez pas d'accès internet. Vos
                préférences seront aussi sauvegardées sur votre compte.
            </p>
        </div>
    );
};

export default Intro;
