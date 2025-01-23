
"use client"

import Header from "@/components/header";
import Footer from "@/components/footer";
import { useThemeContext } from "@/hooks/useTheme";
import React, { useState } from "react";
import Category from "@/components/Category";
import Item from "@/components/Item";
import Title from "@/components/title";
import { X, Check, MoveHorizontal } from "lucide-react";
import {oeuvres, StaticColors as colors} from "@/utils/index";
import {useRouter} from "next/navigation";
import {Oeuvre} from "@/types";

export default function Preferences() {
  const { systemTheme } = useThemeContext();
  const router = useRouter();

  const [itemStates, setItemStates] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]); // 7 items initialisés à neutre

  const handleAcceptAll = () => setItemStates(itemStates.map(() => 2)); // Tout accepter
  const handleRejectAll = () => setItemStates(itemStates.map(() => 1)); // Tout refuser
  const handleNullifyAll = () => setItemStates(itemStates.map(() => 0)); // Tout remettre à 0

  const updateItemState = (index: number, newState: number) => {
    setItemStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? newState : state))
    );
  };


  type typeRetour = {
    nom: string;
    description: string;
    type_oeuvre: string;
    artiste: string;
    mouvement: string;
    x: number;
    y: number;
  };

  function transformOeuvre(typeRetour: typeRetour): Oeuvre {
    return {
      name: typeRetour.nom,
      description: typeRetour.description,
      type_oeuvre: typeRetour.type_oeuvre,
      artiste: typeRetour.artiste,
      mouvement: typeRetour.mouvement,
      coordinate: [typeRetour.x, typeRetour.y],
    };
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      "type_oeuvre": {
        "peinture": itemStates[0],
        "sculpture": itemStates[1],
      },
      "artiste": {
        "michael ange": itemStates[2],
        "leonard de vinci": itemStates[3],
      },
      "mouvement": {
        "maniérisme": itemStates[4],
        "baroque": itemStates[5],
        "romantisme": itemStates[6],
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

      const result:{[id:number]: typeRetour} = await response.json();

      for (const e in result) {
        const oeuvreTemp = result[e];
        console.log(oeuvreTemp);
        console.log(transformOeuvre(oeuvreTemp));
        oeuvres.push(transformOeuvre(oeuvreTemp));
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
        className="mx-auto flex h-full min-h-screen max-w-5xl flex-col text-sm gap-4 px-4 pb-8"
        style={{ backgroundColor: systemTheme.background.primary }}
      >
        <Header/>

        <Title>Choisissez vos préférences</Title>

        <p className="mx-auto w-full max-w-2xl text-justify mb-4 ">
        Indiquez vos préférences (type d’œuvre, auteur, mouvement) : choisissez si elles ne doivent pas être prises en compte,
         si leur intégration est sans importance, ou si elles doivent absolument être intégrées dans votre parcours. 
        </p>

        <div className="mx-auto flex w-full max-w-2xl text-xs justify-end gap-2">
          
          {/* Tout refuser */}
          <div
            onClick={handleRejectAll}
            className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-1 py-1 transition hover:opacity-80`}
            style={{
              backgroundColor: systemTheme.background.secondary,
              border: `1px solid ${systemTheme.background.button}60`,
              color: systemTheme.text.primary,
            }}
          >
            <p>Tout refuser</p> 
            <div 
              className="flex justify-center items-center rounded-md min-h-10 min-w-10"
              style={{
                backgroundColor: colors.red,
              }}
            >
              <X />
            </div>
          </div>

          {/* Neutre partout */}
          <div
            onClick={handleNullifyAll}
            className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-1 py-1 transition hover:opacity-80`}
            style={{
              backgroundColor: systemTheme.background.secondary,
              border: `1px solid ${systemTheme.background.button}60`,
              color: systemTheme.text.primary,
            }}
          >
            <p>Neutre partout</p>
            <div 
              className="flex justify-center items-center rounded-md min-h-10 min-w-10"
              style={{
                backgroundColor: colors.white,
              }}
            >    
              <MoveHorizontal/>
            </div>
          </div>

          {/* Tout vouloir */}
          <div
            onClick={handleAcceptAll}
            className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-1 py-1 transition hover:opacity-80`}
            style={{
              backgroundColor: systemTheme.background.secondary,
              border: `1px solid ${systemTheme.background.button}60`,
              color: systemTheme.text.primary,
            }}
          >
            <p>Tout vouloir</p>
            <div 
              className="flex justify-center items-center rounded-md min-h-10 min-w-10"
              style={{
                backgroundColor: colors.green,
              }}
            >    
              <Check />
            </div>
          </div>
        </div>

        <div>
          <Category title="Type d'œuvre">
            <Item
              name="Peinture"
              state={itemStates[0]}
              onStateChange={(newState) => updateItemState(0, newState)}
            />
            <Item
              name="Sculpture"
              state={itemStates[1]}
              onStateChange={(newState) => updateItemState(1, newState)}
            />
          </Category>
          <Category title="Auteur">
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
          <Category title="Mouvement">
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
