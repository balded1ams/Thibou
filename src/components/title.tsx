import { useThemeContext } from "@/hooks/useTheme";

interface TitleProps {
    children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
    const { systemTheme } = useThemeContext();
    return (
        <div className="flex flex-col items-center py-8">
            <h1
                className="text-2xl font-bold lg:text-3xl"
                style={{ color: systemTheme.text.title }}
            >
                {children}
            </h1>
        </div>
    );
};

export default Title;