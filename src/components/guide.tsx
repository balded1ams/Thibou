import Button from "@/components/button"

import React, { useEffect, useState } from 'react';

import { addOutput } from "@/hooks/useConsole";
import { useThemeContext } from "@/hooks/useTheme";
import { pathing2 } from '@/hooks/useBFS';

const points = pathing2();
const cooOeuvre = points[points.length - 1];


const Guide = ({onSuivant, onPrev}) => {
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
          <div className="align-bottom gap-2 flex">
            <Button text="Précédent" onClick={onPrev} reverse={true} />
            <Button text="Suivant" onClick={onSuivant} />
          </div>
        </div>
    );
};

export default Guide;