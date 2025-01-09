import React from "react";
import { useThemeContext } from "@/hooks/useTheme";
import Checkbox from "@/components/customCheckBox";

interface ItemProps {
  name: string;
  state: number; // État actuel (0 = neutre, 1 = refusé, 2 = accepté)
  onStateChange: (newState: number) => void; // Callback pour informer le parent du changement d'état
}

const Item: React.FC<ItemProps> = ({ name, state, onStateChange }) => {
  const { systemTheme } = useThemeContext();

  return (
    <div
      className="flex items-center justify-between py-2 mx-2 border-b last:border-b-0 flex-col gap-2 lg:flex-row"
      style={{
        background: systemTheme.background.secondary,
        borderColor: `${systemTheme.background.button}60`,
      }}
    >
      <span
        className="flex-1 text-sm"
        style={{ color: systemTheme.text.primary }}
      >
          {name}
      </span>
      <Checkbox state={state} onChange={onStateChange} />
    </div>
  );
};

export default Item;