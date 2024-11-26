import {useThemeContext} from "../hooks/useTheme.ts";

const Samples = () => {
    const { systemTheme } = useThemeContext();

    return (
        <div className="flex items-center py-8 "
        style={{
            color: systemTheme.text.secondary,
        }}>
            <h1>Some samples: </h1>
        </div>
    );
};

export default Samples;

