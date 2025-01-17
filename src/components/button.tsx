import React from 'react';
import { useThemeContext } from "@/hooks/useTheme";

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    const { systemTheme } = useThemeContext();


    return (
        <button 
            className="w-full rounded-lg py-2 text-lg font-bold transition-all hover:opacity-80"
            style={{
                backgroundColor: systemTheme.background.button,
                color: systemTheme.text.secondary,
            }}
            onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;