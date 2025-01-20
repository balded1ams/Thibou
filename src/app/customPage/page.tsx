"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { useThemeContext } from "@/hooks/useTheme";
import React, { useState } from "react";
import Category from "@/components/Category";
import Item from "@/components/Item";
import Title from "@/components/title";
import { X, Check, Presentation, Palette, CalendarRange } from "lucide-react";
import {Oeuvre} from "@/types"; //TODO: mettre a jour le type
import {oeuvres} from "@/utils";
import {useRouter} from "next/navigation";

export default function Preferences() {
  const { systemTheme } = useThemeContext();
  const router = useRouter();

  const [itemStates, setItemStates] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]); // 7 items initialisés à neutre

  const handleAcceptAll = () => setItemStates(itemStates.map(() => 2)); // Tout accepté
  const handleRejectAll = () => setItemStates(itemStates.map(() => 1)); // Tout refusé

  const updateItemState = (index: number, newState: number) => {
    setItemStates((prevStates) =>
        prevStates.map((state, i) => (i === index ? newState : state))
    );
  };



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      "Type d'œuvre": {
        Peinture: itemStates[0],
        Sculpture: itemStates[1],
      },
      Auteur: {
        "Michel-Ange": itemStates[2],
        "Léonard de Vinci": itemStates[3],
      },
      Mouvement: {
        "Le maniérisme": itemStates[4],
        "Le baroque": itemStates[5],
        "Le romantisme": itemStates[6],
      },
    };

    try {
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission');
      }

      type OeuvreTEMP = {
        nom: string;
        description: string;
        //TODO: refaire le type oeuvre
      };

      const result:{[id:number]: OeuvreTEMP} = await response.json();
      let cpt = 0;
      for(const i in result){
        const oeuvre = result[i];
        //console.log("changed "+ oeuvres[cpt].name + " en " + oeuvre.nom)
        oeuvres[cpt].name = oeuvre.nom;

        //console.log("changed "+ oeuvres[cpt].description + " en " + oeuvre.description)
        oeuvres[cpt].description = oeuvre.description;
        cpt++;
      }
      console.log("Réponse du serveur :", result);
    } catch (error: any) {
      console.error(error.message || 'Erreur inattendue');
    }
    await router.push("/parcour")
  };

  return (
      <div style={{ backgroundColor: systemTheme.background.primary }}>
        <main
            className="mx-auto flex h-full min-h-screen max-w-5xl flex-col gap-4 px-4 pb-8"
            style={{ backgroundColor: systemTheme.background.primary }}
        >
          <Header/>

          <Title>Choisissez vos préférences</Title>

          <div className="mx-auto flex w-full max-w-2xl justify-between gap-8">
            <div
                onClick={handleRejectAll}
                className={`flex cursor-pointer items-center justify-center gap-3 rounded-lg p-2 px-4 transition hover:opacity-80`}
                style={{
                  backgroundColor: systemTheme.background.secondary,
                  border: `1px solid ${systemTheme.background.button}60`,
                  color: systemTheme.text.primary,
                }}
            >
              <X />
              <p>Tout décocher</p>
            </div>
            <div
                onClick={handleAcceptAll}
                className={`flex cursor-pointer items-center justify-center gap-3 rounded-lg p-2 px-4 transition hover:opacity-80`}
                style={{
                  backgroundColor: systemTheme.background.secondary,
                  border: `1px solid ${systemTheme.background.button}60`,
                  color: systemTheme.text.primary,
                }}
            >
              <p>Tout cocher</p>
              <Check />
            </div>
          </div>

          <div>
            <Category title={<div className="flex items-center align-middle gap-2"> <Presentation/> <p>Type d'œuvres</p></div>}>
              <Item
                  name="Peintures"
                  state={itemStates[0]}
                  onStateChange={(newState) => updateItemState(0, newState)}
              />
              <Item
                  name="Sculptures"
                  state={itemStates[1]}
                  onStateChange={(newState) => updateItemState(1, newState)}
              />
            </Category>
            <Category title={<div className="flex items-center align-middle gap-2"> <Palette/> <p>Artistes</p></div>}>
              <Item
                  name="Michel-Ange"
                  state={itemStates[2]}
                  onStateChange={(newState) => updateItemState(2, newState)}
              />
              <Item
                  name="Léonard de Vinci"
                  state={itemStates[3]}
                  onStateChange={(newState) => updateItemState(3, newState)}
              />
            </Category>
            <Category title={<div className="flex items-center gap-2"> <CalendarRange/> <p>Mouvement</p></div>}>
              <Item
                  name="Le maniérisme"
                  state={itemStates[4]}
                  onStateChange={(newState) => updateItemState(4, newState)}
              />
              <Item
                  name="Le baroque"
                  state={itemStates[5]}
                  onStateChange={(newState) => updateItemState(5, newState)}
              />
              <Item
                  name="Le romantisme"
                  state={itemStates[6]}
                  onStateChange={(newState) => updateItemState(6, newState)}
              />
            </Category>
          </div>

          <button
              className={`text-white bg-red-500 mx-auto w-full max-w-2xl rounded-lg py-2 text-xl transition hover:opacity-80`}
              style={{
                backgroundColor: systemTheme.background.button,
                color: systemTheme.text.secondary,
                border: `1px solid ${systemTheme.background.button}60`,
              }}
              onClick={handleSubmit}
          >
            Suivant
          </button>
        </main>
        <Footer />
      </div>
  );
}