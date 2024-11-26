import {useThemeContext} from "../hooks/useTheme.ts";

const Header = () => {
    const { systemTheme } = useThemeContext();

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
                style={{color : "#444444"}}>
                    connection
                </h1>
                <h1 className={'hover:underline rounded-lg bg-[#dddddd] px-2 text-lg'}
                style={{color : "white"}}>
                    inscription
                </h1>
            </div>
        </header>
    );
};

export default Header;