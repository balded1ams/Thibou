import React, { useState } from "react";
import { StaticColors as colors } from "@/utils/index"
import { X, Check, Ban } from "lucide-react";

const Checkbox = ({ onChange }: { onChange?: (state: number) => void }) => {
  const [state, setState] = useState<number>(0);
  const [selected, setSelected] = useState<"left" | "right" | null>(null); // Explicit type

  const handleLeftClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche le clic de propager
    setState((prevState) => (prevState + 1) % 3);
    setSelected("left");
    if (onChange) onChange((state + 1) % 3);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche le clic de propager
    setState((prevState) => (prevState + 1) % 3);
    setSelected("right");
    if (onChange) onChange((state + 1) % 3);
  };

  const handleReset = () => {
    setState(0);
    setSelected(null);
  };

  return (
    <div
      className="flex items-center gap-2"
      onClick={handleReset}
    >
      {/* Conteneur principal */}
      <div
        className="w-full h-16 items-center border rounded-xl flex overflow-hidden justify-between bg-amber-50"
      >
        {/* Partie gauche */}
        <div
          onClick={handleLeftClick}
          className={`flex items-center h-full justify-center border transition-all duration-300 ${
            selected === "left" ? "w-1/2" : "w-1/4"
          }`}
          style={{
            backgroundColor: colors.red,
          }}
        >
          <X />
        </div>

        <Ban/>

        {/* Partie droite */}
        <div
          onClick={handleRightClick}
          className={`flex items-center h-full fjustify-center border transition-all duration-300 ${
            selected === "right" ? "w-1/2" : "w-1/4"
          }`}
          style={{
            backgroundColor: colors.green
          }}
        >
          <Check />
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
