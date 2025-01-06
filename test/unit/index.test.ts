
function testBfs() {
    const matrix = [
        [0, 0, 1],
        [1, 0, 1],
        [0, 0, 0],
    ];

    const start: [number, number] = [0, 0];
    const end: [number, number] = [2, 2];

    console.log("Test BFS 1 : Chemin simple");
    const result1 = bfs(start, end, matrix);
    console.log("Chemin trouvé :", result1);

    const startBlocked: [number, number] = [0, 2];
    const endBlocked: [number, number] = [1, 2];

    console.log("Test BFS 2 : Point de départ bloqué");
    const result2 = bfs(startBlocked, end, matrix);

    console.log("Test BFS 3 : Point d'arrivée bloqué");
    const result3 = bfs(start, endBlocked, matrix);
}

// Appeler les tests
testBfs();
