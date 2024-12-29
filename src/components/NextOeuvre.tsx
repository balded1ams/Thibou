import React from 'react';

interface NextOeuvreProps {
    roomNumber: number;
    directions: string[];
}

const NextOeuvre: React.FC<NextOeuvreProps> = ({ roomNumber, directions }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Prochaine Œuvre</h2>
            <p className="mt-2">Salle numéro: {roomNumber}</p>
            <ul className="mt-2 list-disc list-inside">
                {directions.map((direction, index) => (
                    <li key={index}>{direction}</li>
                ))}
            </ul>
        </div>
    );
};

export default NextOeuvre;