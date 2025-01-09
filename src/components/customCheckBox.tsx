import React, { useEffect, useState } from "react";
import { StaticColors as colors } from "@/utils/index";
import { X, Check, Ban } from "lucide-react";
import { useThemeContext } from "@/hooks/useTheme";



const Checkbox = ({ state }: { state: number }) => {
  const [internalState, setInternalState] = useState<number>(state);
  const { systemTheme } = useThemeContext();


  // Synchronise l'état interne avec l'état reçu via les props
  useEffect(() => {
    setInternalState(state);
  }, [state]);

  const handleClickLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInternalState(1); // Refusé
  };

  const handleClickRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInternalState(2); // Accepté
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInternalState(0); // Neutre
  };

  return (
    <div
      className="w-1/2 h-10 items-center rounded-xl flex overflow-hidden justify-between"
      onClick={handleReset}
      style={{
        backgroundColor: colors.gray,
      }}
    >
      {/* Bouton "Refusé" */}
      <div
        onClick={handleClickLeft}
        className={`flex items-center h-full justify-center transition-all duration-300 ${
          internalState === 1 ? "w-1/2 opacity-100" : "w-1/4 opacity-50"
        }`}
        style={{
          backgroundColor: colors.red,
        }}
      >
        <X />
      </div>

      {/* Bouton "Neutre" */}
      <div
        className={`flex items-center h-full justify-center transition-all duration-300 ${
          internalState === 0 ? "w-1/2 opacity-100" : "w-1/4 opacity-50"
        }`}
        style={{
          backgroundColor: systemTheme.background.primary,
          color: systemTheme.text.primary,
        }}
      >
        <Ban />
      </div>

      {/* Bouton "Accepté" */}
      <div
        onClick={handleClickRight}
        className={`flex items-center h-full justify-center transition-all duration-300 ${
          internalState === 2 ? "w-1/2 opacity-100" : "w-1/4 opacity-50"
        }`}
        style={{
          backgroundColor: colors.green,
        }}
      >
        <Check />
      </div>
    </div>
  );
};

export default Checkbox;