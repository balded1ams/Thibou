import React, { useState, useRef } from "react";
import { useThemeContext } from "@/hooks/useTheme";

interface CategoryProps {
    title: string;
    children: React.ReactNode;
}

const Category: React.FC<CategoryProps> = ({ title, children }) => {
    const { systemTheme } = useThemeContext();
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div
            className="mb-4 rounded-lg overflow-hidden"
            style={{
                border: `1px solid ${systemTheme.background.secondary}`,
                background: systemTheme.background.primary,
            }}
        >
            {/* Titre cliquable */}
            <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer transition"
                style={{
                    backgroundColor: isOpen
                        ? systemTheme.background.button
                        : systemTheme.background.secondary,
                    color: isOpen
                        ? systemTheme.text.secondary
                        : systemTheme.text.primary,
                }}
                onClick={toggleOpen}
            >
                <h3 className="text-lg font-medium">{title}</h3>
                <span>{isOpen ? "▲" : "▼"}</span>
            </div>

            {/* Contenu avec transition */}
            <div
                ref={contentRef}
                className="overflow-hidden transition-max-height duration-300"
                style={{
                    maxHeight: isOpen
                        ? `${contentRef.current?.scrollHeight || 0}px`
                        : "0px",
                }}
            >
                <div
                    className="px-4 py-3"
                    style={{
                        color: systemTheme.text.secondary,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Category;