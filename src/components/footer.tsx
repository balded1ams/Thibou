import {useThemeContext} from "../hooks/useTheme.ts";

function Footer() {
    const {systemTheme} = useThemeContext();
    return (
        <div className=" flex-col h-10"
        style={{
            backgroundColor: systemTheme.background.secondary,
        }}>
            FOOTER
        </div>
    );
}

export default Footer;
