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
            className="flex flex-col justify-between gap-4 w-full rounded-xl p-2 border"
            style={{
                borderColor: `${systemTheme.background.button}60`,
                backgroundColor: systemTheme.background.secondary,
                color: systemTheme.text.primary,
            }}
        >
          <div>
          {outputs.map((output, index) => (
            <p key={index}> {"->"} {output}</p>
          ))}
          </div>
          <Button text="Suivant" onClick={onClick} />
        </div>
    );
};

export default Guide;