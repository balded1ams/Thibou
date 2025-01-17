import Button from "@/components/button"

import React, { useEffect, useState } from 'react';

import { addOutput } from "@/hooks/useConsole";
import { useThemeContext } from "@/hooks/useTheme";

const Guide = ({onClick}) => {
  const [outputs, setOutputs] = useState<string[]>([]);

  useEffect(() => {
    const updatedOutputs = addOutput('');
    setOutputs(updatedOutputs);
  }, [addOutput]);

    const { systemTheme } = useThemeContext();

    return (
        <div
            className="flex flex-col items-start gap-4 w-full"
            style={{
                backgroundColor: systemTheme.background.secondary,
                color: systemTheme.text.primary,
                padding: "1rem",
                borderRadius: "8px",
            }}
        >
          {outputs.map((output, index) => (
            <p key={index}> {"->"} {output}</p>
          ))}
            <Button text="Suivant" onClick={onClick} />
        </div>
    );
};

export default Guide;