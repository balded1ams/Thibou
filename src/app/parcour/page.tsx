"use client";
import {useEffect, useState} from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

import Plan from "@/components/plan";
import Guide from "@/components/guide";

import { useThemeContext } from "@/hooks/useTheme";
import {pathing} from "@/hooks/useBFS";

export default function FracPage() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentIndex, setCurrentIndex] = useState(0);

  const advancePoint = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
    //addOutput(`oeuvre: ${currentIndex}`)
    savePoint();
    fetchHistorique()
  };

  const fetchHistorique = async () => {
    try {
      const response = await fetch('/api/fetchSauvegarde', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  const savePoint = async () => {
    try {
      const response = await fetch('/api/sauvegarde', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trajet_restant: result,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  const [result, setResult] = useState<[number, number][][]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      const result = await pathing();
      setResult(result);
      setDataLoaded(true);
    };
    if (!dataLoaded) {
      fetchPoints();
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
          <Plan currentIndex={currentIndex}  path={result}/>
          <Guide
            onSuivant={advancePoint}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
