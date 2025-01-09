import Image from "next/image";
import { useThemeContext } from "@/hooks/useTheme";
import parcoursCplt from '/public/plan-w-parcours-complet.jpg'

const PFractionne = () => {
    const { systemTheme } = useThemeContext();

    return (
        <div className="flex flex-col justify-center items-center w-2/5 h-200 pb-3 border-2 border-hidden rounded-3xl" style={{
            backgroundColor: systemTheme.background.secondary,
        }}>
            <a href="#">
            <Image className="p-10"
                src={parcoursCplt}
                alt="Parcours non divisé"
            />
                <h2 className="text-xl text-center mb-5">Parcours complet</h2>
            </a>
            <div className="flex">
                <p className="mr-1">Temps estimé : </p>
                <span>30 min</span>
            </div>
        </div>
    );
}

export default PFractionne;