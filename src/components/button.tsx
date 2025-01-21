import React from 'react';
import { useThemeContext } from "@/hooks/useTheme";

interface ButtonProps {
    text: string;
    onClick: () => void;
    reverse?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, reverse = false }) => {
    const { systemTheme } = useThemeContext();


    return (
        <button 
            className="w-full rounded-lg py-2 text-lg font-bold transition-all hover:opacity-80 border shadow"
            style={{
                backgroundColor:
                reverse ? systemTheme.background.secondary : systemTheme.background.button,
                color: 
                reverse ? systemTheme.background.button : systemTheme.text.secondary,
                borderColor: systemTheme.background.button,
            }}
            onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;