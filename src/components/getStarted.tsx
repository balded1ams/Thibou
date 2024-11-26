import {useThemeContext} from "../hooks/useTheme.ts";

const Start = () => {
    const { systemTheme } = useThemeContext();

    return (
        <div className="flex items-center justify-center py-8 ">
            <button className="border rounded-xl p-2 font-mono text-xl"
                    style={{
                        color: systemTheme.text.primary,
                        backgroundColor: systemTheme.background.secondary,
                    }}
            >
                Get Started
            </button>
        </div>
    );
};

export default Start;