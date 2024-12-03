import {useThemeContext} from "@/hooks/useTheme";

const Start = () => {
    const {systemTheme} = useThemeContext();
    return (
        <div className="flex items-center flex-col py-8 ">
            <p className={'font-mono'}
            style={{color: systemTheme.text.secondary,}}>
                November 22, 2024
            </p>
            <h1 className={`font-mono text-2xl font-bold lg:text-3xl`}
                style={{color: systemTheme.text.title,}}>
                Introducing Thibou
            </h1>
        </div>
    );
};

export default Start;