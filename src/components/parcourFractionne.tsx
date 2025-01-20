import Plan from "@/components/plan";
import { useThemeContext } from "@/hooks/useTheme";
import React from 'react';


const ParcoursFractionne: React.FC = () => {
    const { systemTheme } = useThemeContext();
    return(
        <div
            className="flex flex-col items-center gap-8 p-8 text-xl font-semibold rounded-2xl"
            style={{
                color: systemTheme.text.primary,
                backgroundColor: systemTheme.background.secondary,
            }}>
            <div
                className="flex gap-4">
                <Plan currentIndex={0} />
                <Plan currentIndex={0} allPathing={true} />
            </div>

            <label htmlFor="timeInput">Choisissez une durée (en minutes) :</label>
            <input 
                type="textField" 
                id="timeInput" 
                name="timeInput" 
                placeholder="30"
            />

            <p>Nombre de parties : </p>
            <input 
                type="textField" 
                id="nbParties" 
                name="nbParties" 
                placeholder="1 à 10"
            />
        </div>
    );
};
export default ParcoursFractionne;
