import Plan from "@/components/plan";
import { useThemeContext } from "@/hooks/useTheme";
import React, {useEffect, useState} from 'react';
import Button from "@/components/button";
import {useRouter} from "next/navigation";
import {pathing} from "@/hooks/useBFS";


const ParcoursFractionne: React.FC = () => {
    
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/parcour');
    };

    const [result, setResult] = useState<[number, number][][]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        const fetchPoints = async () => {
            const result = await  pathing();
            setResult(result);
            setDataLoaded(true);
        };

        if (!dataLoaded) {
            fetchPoints();
        }
    }, [dataLoaded]);

    const { systemTheme } = useThemeContext();
    return(
        <div
            className="flex flex-col items-center gap-8 p-4 text-xl font-semibold rounded-2xl mx-auto"
            style={{
                color: systemTheme.text.primary,
                backgroundColor: systemTheme.background.secondary,
            }}>
            <div
                className="flex gap-4 max-w-md">
                <Plan currentIndex={0} path={result} dataLoaded={dataLoaded} />
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

            <Button text="Commencer la visite" onClick={handleButtonClick} />

        </div>
    );
};
export default ParcoursFractionne;
