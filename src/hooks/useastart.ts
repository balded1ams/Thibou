import { useCallback } from 'react';

// Définir les types
type Maze = number[][];
type Point = [number, number];

export const useFindCompletePath = () => {
    // Directions pour le BFS (haut, bas, gauche, droite)
    const directions: Point[] = [
        [0, 1], [1, 0], [0, -1], [-1, 0],
    ];

    // Trouver tous les points d'intérêt ayant une valeur spécifique
    const findPoints = useCallback((maze: Maze, value: number): Point[] => {
        const points: Point[] = [];
        maze.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === value) {
                    points.push([i, j]);
                }
            });
        });
        return points;
    }, []);

    // BFS pour trouver un chemin entre deux points
    const bfs = useCallback(
        (maze: Maze, start: Point, goal: Point): Point[] | null => {
            const queue: [Point, Point[]][] = [[start, []]];
            const visited = new Set<string>();

            while (queue.length > 0) {
                const [[x, y], path] = queue.shift()!;

                if (x === goal[0] && y === goal[1]) {
                    return [...path, [x, y]];
                }

                directions.forEach(([dx, dy]) => {
                    const nx = x + dx;
                    const ny = y + dy;

                    if (
                        nx >= 0 &&
                        ny >= 0 &&
                        nx < maze.length &&
                        ny < maze[0].length &&
                        maze[nx][ny] !== 1 &&
                        !visited.has(`${nx},${ny}`)
                    ) {
                        visited.add(`${nx},${ny}`);
                        queue.push([[nx, ny], [...path, [x, y]]]);
                    }
                });
            }

            return null;
        },
        [directions]
    );

    // Trouver le chemin complet en visitant tous les points d'intérêt
    const findCompletePath = useCallback(
        (maze: Maze, start: Point, interestPoints: Point[]): Point[] | null => {
            const points = [start, ...interestPoints, start];
            let minPath: Point[] | null = null;
            let minDistance = Infinity;

            const permute = (arr: Point[]): Point[][] => {
                if (arr.length <= 1) return [arr];
                return arr.flatMap((item, i) =>
                    permute([...arr.slice(0, i), ...arr.slice(i + 1)]).map((perm) => [
                        item,
                        ...perm,
                    ])
                );
            };

            const permutations = permute(points.slice(1, -1));

            permutations.forEach((perm) => {
                let currentPath: Point[] = [];
                let totalDistance = 0;
                let currentPoint = start;

                for (const nextPoint of perm) {
                    const segment = bfs(maze, currentPoint, nextPoint);
                    if (!segment) break;

                    totalDistance += segment.length;
                    currentPath = [...currentPath, ...segment.slice(0, -1)];
                    currentPoint = nextPoint;
                }

                const segmentToStart = bfs(maze, currentPoint, start);
                if (segmentToStart) {
                    totalDistance += segmentToStart.length;
                    currentPath = [...currentPath, ...segmentToStart];

                    if (totalDistance < minDistance) {
                        minDistance = totalDistance;
                        minPath = currentPath;
                    }
                }
            });

            return minPath;
        },
        [bfs]
    );

    return {
        findPoints,
        findCompletePath,
    };
};
