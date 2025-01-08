import React, { useState } from "react";
import { StaticColors as colors } from "@/utils/index"
import { X, Check, Ban } from "lucide-react";

const Checkbox = ({ onChange }: { onChange?: (state: number) => void }) => {
  const [state, setState] = useState<number>(0);
  const [selected, setSelected] = useState<"left" | "right" | null>(null); // Explicit type

  const handleClickLeft = (e: React.MouseEvent) => {
    if (selected != "left") {   // Empêche le reset d'être annulé en recliquant dessus
      e.stopPropagation(); // Empêche le clic de propager
      setState((prevState) => (prevState + 1) % 3);
      setSelected("left");
      setState(1);
      console.log(state);
    }
  };

  const handleClickRight = (e: React.MouseEvent) => {
    if (selected != "right") {   // Empêche le reset d'être annulé en recliquant dessus
      e.stopPropagation(); // Empêche le clic de propager
      setState((prevState) => (prevState + 1) % 3);
      setSelected("right");
      setState(2);
      console.log(state);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    if (selected != null) {
      e.stopPropagation(); // Empêche le clic de propager
      setState(0);
      setSelected(null);
      console.log(state);
    }
  };

  return (
    
      <div  // Conteneur principal
        className="w-1/2 h-10 items-center border rounded-xl flex overflow-hidden justify-between bg-amber-50"
        onClick={handleReset}
        style={{
          backgroundColor: colors.gray
        }}
      >
        {/* Partie gauche */}
        <div
          onClick={handleClickLeft}
          className={`flex items-center h-full justify-center border-r transition-all duration-300 ${
            selected === "left" ? "w-1/2" : "w-1/4"
          }`}
          style={{
            backgroundColor: colors.red,
          }}
        >
          <X />
        </div>

        <div 
          className={`flex items-center h-full justify-center transition-all duration-300 ${
            selected === null ? "w-1/2" : "w-1/4"
          }`}
        >
          <Ban/>
        </div>

        {/* Partie droite */}
        <div
          onClick={handleClickRight}
          className={`flex items-center h-full justify-center border-l transition-all duration-300 ${
            selected === "right" ? "w-1/2" : "w-1/4"
          }`}
          style={{
            backgroundColor: colors.green
          }}
        >
          <Check />
        </div>
      </div>
  );
};

export default Checkbox;
