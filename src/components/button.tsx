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
            className="w-full rounded-lg py-3 text-lg font-bold transition-all"
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