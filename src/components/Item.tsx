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
            className="flex items-center justify-between p-2 rounded-md mb-2"
            style={{
                background: systemTheme.background.secondary,
                border: `1px solid ${systemTheme.background.primary}`,
            }}
        >
            <span
                className="flex-1 text-sm"
                style={{ color: systemTheme.text.primary }}
            >
                {name}
            </span>
            <div className="flex gap-2">
                <button
                    className="px-2 py-1 rounded transition"
                    style={{
                        backgroundColor:
                            selected === "no"
                                ? systemTheme.background.secondary
                                : systemTheme.background.primary,
                        color:
                            selected === "no"
                                ? systemTheme.text.secondary
                                : systemTheme.text.primary,
                        border: `1px solid ${systemTheme.background.secondary}`,
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
                                ? systemTheme.background.secondary
                                : systemTheme.background.primary,
                        color: systemTheme.text.primary,
                        border: `1px solid ${systemTheme.background.button}`,
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
                                ? systemTheme.background.secondary
                                : systemTheme.background.primary,
                        color:
                            selected === "yes"
                                ? systemTheme.text.secondary
                                : systemTheme.text.primary,
                        border: `1px solid ${systemTheme.background.button}`,
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