import {useThemeContext} from "@/hooks/useTheme";

function Footer() {
    const {systemTheme} = useThemeContext();
    return (
        <div className="flex items-center h-fit py-8"
        style={{
            backgroundColor: systemTheme.background.secondary,
        }}>
            <div className="w-1/2 border-r border-black text-center">
                <div>
                    Part1
                </div>
                <div>
                    part2
                </div>
            </div>
            <div className="w-1/2 text-center">
                <div>
                    Part2
                </div>
                <div>
                    part3
                </div>
                <button
                onClick={() => {}}>
                    click
                </button>
            </div>
        </div>
    );
}

export default Footer;
