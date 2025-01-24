"use client";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

import Plan from "@/components/plan";
import Guide from "@/components/guide";

import { useThemeContext } from "@/hooks/useTheme";
import {pathing, toVector} from "@/hooks/useBFS";
import { addOutput } from "@/hooks/useConsole";

export default function FracPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const generateInstructions = (path) => {
    if (!path || path.length < 2) {
      console.log("Pas assez de points pour générer des instructions.");
    }
    for (let i = 0; i < path.length - 1; i++) {
      path[i] = toVector(path[i], path[i+1]);
    }
    for (let i = 0; i < path.length - 1; i++) {
      const [x1, y1] = path[i];
      const [x2, y2] = path[i + 1];

      if (x1 === x2) {
        if (y2 > y1) {
          addOutput("Aller tout droit.");
        } else if (y2 < y1) {
          addOutput("Revenir en arrière (tout droit vers le bas).");
        }
      } else if (y1 === y2) {
        if (x2 > x1) {
          addOutput("Tourner à droite.");
        } else if (x2 < x1) {
          addOutput("Tourner à gauche.");
        }
      } else {
        addOutput("Déplacement diagonal, suivez le chemin.");
      }
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
