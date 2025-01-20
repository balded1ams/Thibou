"use client";
import { useState } from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";

import Plan from "@/components/plan";
import Guide from "@/components/guide";

import { useThemeContext } from "@/hooks/useTheme";
import { addOutput } from "@/hooks/useConsole"

export default function fracPage() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentIndex, setCurrentIndex] = useState(0);

  const advancePoint = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
    //addOutput(`oeuvre: ${currentIndex}`)
  };
  const savePoint = () => {
    console.log("appell api");
  };
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
      <main className="mx-auto flex h-full min-h-screen max-w-5xl flex-col gap-4 px-4 xl:px-0">
        <Header />
        <div className="flex flex-col gap-4 xl:flex-row">
          <Plan currentIndex={currentIndex} />
          <Guide
            onSuivant={advancePoint}
            onSave={savePoint}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
