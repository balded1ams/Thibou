"use client";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

import Plan from "@/components/plan";
import Guide from "@/components/guide";

import { useThemeContext } from "@/hooks/useTheme";
import {pathing} from "@/hooks/useBFS";
import { addOutput } from "@/hooks/useConsole";

export default function FracPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const generateInstructions = (path) => {
    if (!path || path.length < 2) {
      console.log("Pas assez de points pour générer des instructions.");
      return [];
    }

    let currentDirection = "";
    let stepCount = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const [x1, y1] = path[i];
      const [x2, y2] = path[i + 1];

      // Calcul de la direction actuelle
      let direction = "";
      if (x1 === x2) {
        direction = y2 > y1 ? "tout droit" : "en arrière";
      } else if (y1 === y2) {
        direction = x2 > x1 ? "à droite" : "à gauche";
      } else {
        direction = "diagonal";
      }

      // Si la direction change, ajoutez les instructions actuelles
      if (direction !== currentDirection) {
        if (currentDirection) {
          addOutput(
              `Aller ${currentDirection} sur ${stepCount} segment(s).`
          );
        }
        currentDirection = direction;
        stepCount = 1;
      } else {
        stepCount++;
      }
    }

    // Ajoutez la dernière instruction
    if (currentDirection) {
      addOutput(`Aller ${currentDirection} sur ${stepCount} segment(s).`);
    }
  };


  const advancePoint = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    savePoint();
    fetchSauvegarde();
    generateInstructions(result[currentIndex]);
  };
  const prevPoint = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    savePoint();
    fetchSauvegarde();
  };

  const fetchSauvegarde = async () => {
    try {
      const response = await fetch("/api/fetchSauvegarde", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return null;
    }
  };

  const savePoint = async () => {
    try {
      const response = await fetch("/api/sauvegarde", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //trajet_restant: result,
          trajet_restant: result.slice(currentIndex),
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des données :", error);
    }
  };

  const [result, setResult] = useState<[number, number][][]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const isConnected = () => {
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected()) {
        const sauvegarde = await fetchSauvegarde();
        if (sauvegarde && sauvegarde.trajet_restant?.length) {
          setResult(sauvegarde.trajet_restant);
        } else {
          const result = await pathing();
          setResult(result);
        }
      } else {
        const result = await pathing();
        setResult(result);
      }
      setDataLoaded(true);
    };

    if (!dataLoaded) {
      fetchData();
    }
  }, [dataLoaded]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { systemTheme } = useThemeContext();

  return (
      <div
          className="min-h-screen w-full overflow-y-auto"
          style={{
            backgroundColor: systemTheme.background.primary,
            color: systemTheme.text.primary,
          }}
      >
        <main className="mx-auto flex h-full min-h-screen max-w-5xl flex-col gap-4 px-4 xl:px-0 mb-8">
          <Header />
          <div className="flex flex-col gap-4 xl:flex-row">
            <Plan currentIndex={currentIndex} path={result} />
            <Guide onSuivant={advancePoint} onPrev={prevPoint} />
          </div>
        </main>
        <Footer />
      </div>
  );
}
