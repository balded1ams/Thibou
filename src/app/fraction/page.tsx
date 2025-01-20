"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";

import { useThemeContext } from "@/hooks/useTheme";
import ParcourFractionne from "@/components/parcourFractionne";

export default function fracPage() {

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
          <ParcourFractionne/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
