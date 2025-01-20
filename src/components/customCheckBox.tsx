import React, { useEffect, useState } from "react";
import { StaticColors as colors } from "@/utils/index";
import { X, Check, Ban } from "lucide-react";
import { useThemeContext } from "@/hooks/useTheme";


const Checkbox = ({
                    state,
                    onChange,
                  }: {
  state: number;
  onChange?: (newState: number) => void;
}) => {
  const [internalState, setInternalState] = useState<number>(state);
  const { systemTheme } = useThemeContext();


  useEffect(() => {
    setInternalState(state);
  }, [state]);

  const handleClickLeft = (e: React.MouseEvent) => {
    if (internalState != 1) {
      e.stopPropagation();
      setInternalState(1);
      onChange?.(1); // Notifie le parent
    }
  };

  const handleClickRight = (e: React.MouseEvent) => {
    if (internalState != 2) {
      e.stopPropagation();
      setInternalState(2);
      onChange?.(2); // Notifie le parent
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    if (internalState != 0) {
      e.stopPropagation();
      setInternalState(0);
      onChange?.(0); // Notifie le parent
    }
  };

  return (
    <div
      className="h-10 items-center rounded-xl flex overflow-hidden justify-between w-full lg:w-1/2 cursor-pointer"
      onClick={handleReset}
      style={{
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      }}
    >
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
      <div
        className={`flex items-center h-full justify-center transition-all duration-300 ${
          internalState === 0 ? "w-1/2 opacity-100" : "w-1/4 opacity-50"
        }`}
      >
        <Ban />
      </div>
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
