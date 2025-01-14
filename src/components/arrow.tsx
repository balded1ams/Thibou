import React, { useEffect, useState } from "react";

interface ArrowProps {
  from: string; // ID de la première div
  to: string;   // ID de la deuxième div
}

const Arrow: React.FC<ArrowProps> = ({ from, to }) => {
  const [lineCoords, setLineCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  useEffect(() => {
    const updateLineCoords = () => {
      const fromElement = document.getElementById(from);
      const toElement = document.getElementById(to);

      if (fromElement && toElement) {
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();

        // Trouver le décalage du conteneur parent
        const container = fromElement.offsetParent as HTMLElement;
        const containerRect = container.getBoundingClientRect();

        setLineCoords({
          x1: fromRect.x + fromRect.width / 2 - containerRect.x,
          y1: fromRect.y + fromRect.height / 2 - containerRect.y,
          x2: toRect.x + toRect.width / 2 - containerRect.x,
          y2: toRect.y + toRect.height / 2 - containerRect.y,
        });
      }
    };

    // Met à jour les coordonnées lors du redimensionnement de la fenêtre
    window.addEventListener("resize", updateLineCoords);

    const intervalId = setInterval(updateLineCoords, 1);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", updateLineCoords);
    }
  }, [from, to]);


  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
      width="100%"
      height="100%"
    >
      <line
        x1={lineCoords.x1}
        y1={lineCoords.y1}
        x2={lineCoords.x2}
        y2={lineCoords.y2}
        stroke="red"
        strokeWidth={4}
        markerEnd="url(#arrowhead)"
      />
    </svg>
    
  );
};

export default Arrow;