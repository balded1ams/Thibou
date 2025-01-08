import React, { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";

interface ItemProps {
    name: string;
}

const Item: React.FC<ItemProps> = ({ name }) => {
    const { systemTheme } = useThemeContext();
    const [selected, setSelected] = useState<"yes" | "no" | "neutral">("neutral");

    return (

        <div
            className={`flex items-center justify-between py-2 mx-2 border-b last:border-b-0`}
            style={{
                background: systemTheme.background.secondary,
                borderColor: `${systemTheme.background.button}60`,
            }}
        >
            <div className={`${systemTheme.background}`}>

            </div>
            <span
                className="flex-1 text-sm"
                style={{color: systemTheme.text.primary}}
            >
                {name}
            </span>
            <div className="flex gap-2">
                <button
                    className="px-2 py-1 rounded transition"
                    style={{
                        backgroundColor:
                            selected === "no"
                                ? systemTheme.background.primary
                                : systemTheme.background.secondary,
                        color: systemTheme.text.primary,
                    }}
                    onClick={() => setSelected("no")}
                >
                    ✗
                </button>
                <button
                    className="px-2 py-1 rounded transition"
                    style={{
                        backgroundColor:
                            selected === "neutral"
                                ? systemTheme.background.primary
                                : systemTheme.background.secondary,
                        color: systemTheme.text.primary,
                    }}
                    onClick={() => setSelected("neutral")}
                >
                    –
                </button>
                <button
                    className="px-2 py-1 rounded transition"
                    style={{
                        backgroundColor:
                            selected === "yes"
                                ? systemTheme.background.primary
                                : systemTheme.background.secondary,
                        color: systemTheme.text.primary,
                    }}
                    onClick={() => setSelected("yes")}
                >
                    ✓
                </button>
            </div>
        </div>
    );
};

export default Item;