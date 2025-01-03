import { useThemeContext } from "@/hooks/useTheme";

const Start = () => {
    const { systemTheme } = useThemeContext();

    return (
        <div className="flex items-center justify-center py-8 ">
            <button
                className="rounded-xl px-4 py-2 text-xl"
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
