// import React from "react";
// import { useThemeContext } from "@/hooks/useTheme";

// interface GuideProps {
//     directions: string[];
// }

// const Guide = () => {
//     const { systemTheme } = useThemeContext();
//     const directions = ["Tournez à gauche", "Continuez tout droit", "Tournez à droite"]; //exemple de liste d'indications, a remplacer à terme par un appel a la BD ?
//     const getArrow = (direction: string) => {
//         switch (direction) {
//             case "Tournez à gauche":
//                 return "←";
//             case "Continuez tout droit":
//                 return "↑";
//             case "Tournez à droite":
//                 return "→";
//             default:
//                 return "";
//         }
//     };

//     return (
//         <div
//             className="flex flex-col items-center gap-4"
//             style={{
//                 backgroundColor: systemTheme.background.secondary,
//                 color: systemTheme.text.primary,
//                 padding: "1rem",
//                 borderRadius: "8px",
//             }}
//         >
//             {directions.map((direction, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                     <span>{getArrow(direction)}</span>
//                     <span>{direction}</span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Guide;
import React, { useEffect, useState } from 'react';
import { setCurrentRoomFromCoordinates, setDirectionForPath, cooOeuvre } from '../hooks/useGuidage';
import { useThemeContext } from "@/hooks/useTheme";
import Button from '@/components/button';

const Guide = ({onClick}) => {
    const { systemTheme } = useThemeContext();
    const [currentRoomName, setCurrentRoomName] = useState('');
    const [directionPath, setDirectionPath] = useState('');

    useEffect(() => {
        // Appel de setCurrentRoomFromCoordinates avec cooOeuvre
        const roomName = setCurrentRoomFromCoordinates(cooOeuvre);
        setCurrentRoomName(roomName);

        // Appel de setDirectionForPath avec les points obtenus de pathing2
        const directions = setDirectionForPath([cooOeuvre]);
        setDirectionPath(directions);
    }, []);

    return (
        <div
            className="flex flex-col items-center gap-4"
            style={{
                backgroundColor: systemTheme.background.secondary,
                color: systemTheme.text.primary,
                padding: "1rem",
                borderRadius: "8px",
            }}
        >
            <div className="flex items-center gap-2">
                <span>→</span>
                <span>{currentRoomName}</span>
            </div>
            <div className="flex items-center gap-2">
                <span>→</span>
                <span>{directionPath}</span>
            </div>

            <Button text="Suivant" onClick={onClick} />
            
        </div>
    );
};

export default Guide;