import React, { useState, useRef } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { ChevronDown, ChevronRight } from "lucide-react";

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
            className="mb-4 rounded-lg overflow-hidden max-w-2xl mx-auto"
            style={{
                background: systemTheme.background.secondary,
                border: `1px solid ${systemTheme.background.button}60`,
            }}
        >
            {/* Titre cliquable */}
            <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer transition text-center border-b border-0"
                style={{
                    backgroundColor: isOpen
                        ? systemTheme.background.secondary
                        : systemTheme.background.secondary,
                    color: isOpen
                        ? systemTheme.text.primary
                        : systemTheme.text.primary,
                    borderColor: isOpen
                        ? `${systemTheme.background.button}60`
                        : systemTheme.background.secondary,
                }}
                onClick={toggleOpen}
            >
                <h3 className="text-lg font-medium">{title}</h3>
                <div
                    className="flex items-center"
                >
                    <i className="text-sm mr-1"
                        style={{
                            color: `${systemTheme.text.primary}88`
                        }}
                    >
                        Dérouler 
                    </i>
                    {isOpen ? <ChevronDown/> : <ChevronRight/>}
                </div>
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
                    className="px-4"
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
