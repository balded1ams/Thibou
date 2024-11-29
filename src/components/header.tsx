import {useThemeContext} from "../hooks/useTheme.ts";
import {theme} from "../utils/index.ts";

const Header = () => {
    const { systemTheme, setTheme } = useThemeContext();

    return (
        <header className='flex items-center justify-between py-8 '>
            <div
                className='flex cursor-pointer items-center gap-3'
                style={{
                    color: systemTheme.text.title,
                }}
            >

                <h1
                    className={`font-mono text-2xl font-bold hover:underline lg:text-3xl`}
                >
                    Thibou.
                </h1>
            </div>
            <div className='flex gap-4'>
                <h1 className={'hover:underline text-lg'}
                style={{color: systemTheme.text.primary}}>
                    connection
                </h1>
                <h1 className={'hover:underline rounded-lg px-2 text-lg'}
                style={{
                    color : systemTheme.text.primary,
                    backgroundColor: systemTheme.background.secondary,
                }}>
                    inscription
                </h1>
                <button onClick={() => setTheme(systemTheme === theme.light ? theme.dark : theme.light)}>
                    theme
                </button>
            </div>
        </header>
    );
};

export default Header;