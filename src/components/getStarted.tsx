import { useThemeContext } from "@/hooks/useTheme";
import { useRouter } from "next/navigation"; // Hook pour la navigation

const Start = () => {
    const { systemTheme } = useThemeContext();
    const router = useRouter(); // Initialiser le hook de navigation


    return (
        <div className="flex items-center justify-center py-8 ">
            <button
                className="rounded-xl px-4 py-2 text-xl transition-all hover:opacity-80"
                onClick={() => router.push("/customPage")}
                style={{
                    color: systemTheme.text.secondary,
                    backgroundColor: systemTheme.background.button,
                }}
            >
                Commencer en tant qu’invité
            </button>
        </div>
    );
};

export default Start;
