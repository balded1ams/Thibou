import React, { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import CustomCheckBox from "@/components/customCheckBox";

interface ItemProps {
    name: string;
    globalState: number;
}

const Item: React.FC<ItemProps> = ({ name, globalState }) => {
    const { systemTheme } = useThemeContext();

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
            <CustomCheckBox state={globalState}/>
        </div>
    );
};

export default Item;