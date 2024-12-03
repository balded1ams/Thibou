import React from 'react';
import { useFindCompletePath } from '@/hooks/useastart';

const MazeSolver: React.FC = () => {
    const { findPoints, findCompletePath } = useFindCompletePath();

    const maze: number[][] = [
        [0, 0, 1, 0],
        [1, 0, 1, 0],
        [0, 0, 0, 2],
        [0, 1, 0, 0],
    ];

    const start: [number, number] = [0, 0];
    const interestPoints = findPoints(maze, 2);

    const path = findCompletePath(maze, start, interestPoints);

    return (
        <div>
            <h1>Résultat du chemin :</h1>
            {path ? (
                <pre>{JSON.stringify(path, null, 2)}</pre>
            ) : (
                <p>Pas de chemin trouvé.</p>
            )}
        </div>
    );
};

export default MazeSolver;
