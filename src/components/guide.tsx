import React from "react";
import { useThemeContext } from "@/hooks/useTheme";

interface GuideProps {
    directions: string[];
}

const Guide: React.FC<GuideProps> = ({ directions }) => {
    const { systemTheme } = useThemeContext();

    const getArrow = (direction: string) => {
        switch (direction) {
            case "Tournez à gauche":
                return "←";
            case "Continuez tout droit":
                return "↑";
            case "Tournez à droite":
                return "→";
            default:
                return "";
        }
    };

    return (
        <div
            className="flex flex-col items-center gap-4"
            style={{
                backgroundColor: systemTheme.background.secondary,
                color: systemTheme.text.primary,
                padding: "1rem",
                borderRadius: "8px",
            }}
        >
            {directions.map((direction, index) => (
                <div key={index} className="flex items-center gap-2">
                    <span>{getArrow(direction)}</span>
                    <span>{direction}</span>
                </div>
            ))}
        </div>
    );
};

export default Guide;