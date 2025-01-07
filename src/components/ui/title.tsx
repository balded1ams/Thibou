import { useThemeContext } from "@/hooks/useTheme";

const Start = () => {
    const { systemTheme } = useThemeContext();
    return (
        <div className="flex flex-col items-center py-8 ">
            <h1
                className={`text-2xl font-bold lg:text-3xl`}
                style={{ color: systemTheme.text.title }}
            >
                Présentation de Thibou
            </h1>
        </div>
    );
};

export default Start;
