"use client"

import Header from "@/components/header";
import Footer from "@/components/footer";
import { useThemeContext } from "@/hooks/useTheme";
import React, { useState } from "react";
import Category from "@/components/Category";
import Item from "@/components/Item";
import Title from "@/components/title";
import { X, Check } from "lucide-react";
import { StaticColors as colors } from "@/utils/index";

export default function Preferences() {
  const { systemTheme } = useThemeContext();

  // État pour stocker l'état individuel de chaque item
  const [itemStates, setItemStates] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]); // 7 items initialisés à neutre

  const handleAcceptAll = () => setItemStates(itemStates.map(() => 2)); // Tout accepté
  const handleRejectAll = () => setItemStates(itemStates.map(() => 1)); // Tout refusé

  const updateItemState = (index: number, newState: number) => {
    setItemStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? newState : state))
    );
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  /*
        if (!response.ok) {
            throw new Error('Erreur lors de la soumission');
        }*/
        console.log("Test4");
        const result: ResponseMessage = await response.json();
        console.log(result.message); // Affiche le message du serveur
      } catch (error: any) {
          console.error(error.message || 'Erreur inattendue');
      }
      console.log("Email:", email);
      console.log("Password:", password);
  };

  return (
    <div style={{ backgroundColor: systemTheme.background.primary }}>
      <main
        className="max-w-5xl mx-auto flex h-full flex-col gap-4 px-4 min-h-screen mb-10"
        style={{ backgroundColor: systemTheme.background.primary }}
      >
        <Header />

        <Title>Choisissez vos préférences</Title>

        {/* Boutons pour tout accepter ou tout refuser */}
        <div className="mx-auto flex w-full max-w-2xl gap-8 justify-between">
          <div
            onClick={handleRejectAll}
            className={`rounded-lg flex items-center justify-center p-2 px-4 transition hover:opacity-80 gap-3 cursor-pointer`}
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
            className={`rounded-lg flex items-center justify-center p-2 px-4 transition hover:opacity-80 gap-3 cursor-pointer`}
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
          className={`w-full py-2 rounded-lg text-white bg-red-500 max-w-2xl mx-auto text-xl transition hover:opacity-80`}
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