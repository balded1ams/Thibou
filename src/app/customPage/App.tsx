import Header from "@/components/header";
import Footer from "@/components/footer";
import { useThemeContext } from "@/hooks/useTheme";
import React, { useState } from "react";
import Category from "@/components/Category";
import Item from "@/components/Item";
import Title from "@/components/title";


function App() {
    const { systemTheme } = useThemeContext();
    const [globalState, setGlobalState] = useState<number>(0); // 0 = neutre, 1 = refusé, 2 = accepté

    const handleAcceptAll = () => setGlobalState(2); // Tous acceptés
    const handleRejectAll = () => setGlobalState(1); // Tous refusés

    return (
      <div
        style={{
          backgroundColor: systemTheme.background.primary,
        }}
      >
        <main
          className={
            "mx-auto flex h-full min-h-screen max-w-5xl flex-col gap-4 px-4 mb-20"
          }
          style={{
            backgroundColor: systemTheme.background.primary,
          }}
        >
          <Header />

          <Title>Choisissez vos préferences</Title>

          {/* Boutons pour tout accepter ou tout refuser */}
          <div className="mx-auto flex w-full max-w-2xl justify-between gap-4">
            <button
              onClick={handleRejectAll}
              className="bg-red-500 text-white rounded-lg p-2 border"
              style={{
                backgroundColor: systemTheme.background.secondary,
                border: `1px solid ${systemTheme.background.button}60`,
                color: systemTheme.text.primary,
              }}

            >
              Tout Refuser
            </button>
            <button
              onClick={handleAcceptAll}
              className="bg-red-500 text-white rounded-lg p-2 border"
              style={{
                backgroundColor: systemTheme.background.secondary,
                border: `1px solid ${systemTheme.background.button}60`,
                color: systemTheme.text.primary,
              }}
            >
              Tout Accepter
            </button>
          </div>

          {/*<CustomPage/>*/}
          <div>
            <Category title="Type d'œuvre">
              <Item name="Peinture" globalState={globalState} />
              <Item name="Sculpture" globalState={globalState} />
            </Category>
            <Category title="Auteur">
              <Item name="Michel-Ange" globalState={globalState} />
              <Item name="Léonard de Vinci" globalState={globalState} />
            </Category>
            <Category title="Mouvement">
              <Item name="Le maniérisme" globalState={globalState} />
              <Item name="Le baroque" globalState={globalState} />
              <Item name="Le romantisme" globalState={globalState} />
            </Category>
          </div>

          <button
            className={`w-full py-2 rounded-lg text-white bg-red-500 max-w-2xl mx-auto`}
            style={{
              backgroundColor: systemTheme.background.button,
              color: systemTheme.text.secondary,
              border: `1px solid ${systemTheme.background.button}60`,
            }}>
            Suivant
          </button>

        </main>
        <Footer />
      </div>
    );
}

export default App;