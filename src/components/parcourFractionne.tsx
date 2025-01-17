import Plan from "@/components/plan";
import { useThemeContext } from "@/hooks/useTheme";
import React from 'react';


const ParcoursFractionne: React.FC = () => {
    const { systemTheme } = useThemeContext();
    return(
        <div
            className="flex flex-col items-center gap-8 py-8 text-xl font-semibold"
            style={{
                color: systemTheme.text.primary,
                backgroundColor: systemTheme.background.secondary,
            }}>
            <div
                className="flex gap-4">
                <Plan currentIndex={0} />
                <Plan currentIndex={0} allPathing={true} />
            </div>

            <label htmlFor="timeInput">Choisissez une heure :</label>
            <input type="time" id="timeInput" name="timeInput" />
            <p>Nombre de parties : </p>

        </div>
    );
};
export default ParcoursFractionne;

