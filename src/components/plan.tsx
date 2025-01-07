import React from "react";
import { musee } from "@/utils";
import { pathing } from "@/hooks/useBFS";

const MatrixDisplay = () => {

  const rows = musee.map.length;
  const cols = musee.map[1].length;

  const points = pathing();

  const matrix = Array.from({ length: rows }, () => Array(cols).fill(false));

  // Remplit les positions spécifiées en noir (true)
  points.forEach(([x, y]) => {
    if (x >= 0 && x < rows && y >= 0 && y < cols) {
      matrix[x][y] = true;
    }
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${rows}, 20px)`,
        gridTemplateColumns: `repeat(${cols}, 20px)`,
        gap: "2px",
      }}
    >
      {matrix.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: cell ? "black" : "white",
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default MatrixDisplay;
