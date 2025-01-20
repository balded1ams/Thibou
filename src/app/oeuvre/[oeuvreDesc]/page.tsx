"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";

import { useThemeContext } from "@/hooks/useTheme";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

import { findOeuvres } from "@/hooks/useOeuvre";
import ArtworkDesc from "@/components/ArtworkDesc";
import ImageOeuvre from "@/components/imageOeuvres";
import { useRouter } from "next/navigation";

export default function Page({ params: paramsPromise }) {
  const params = use(paramsPromise);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const oeuvreDesc = params?.oeuvreDesc;

  const [name, setName] = useState(null);
  //TODO: trouver un type un data, le pauvre

  useEffect(() => {
    const fetchData = async () => {
      try {
        setName(oeuvreDesc);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    if (oeuvreDesc) {
      fetchData();
    }
  }, [oeuvreDesc]);

  const { systemTheme } = useThemeContext();

  if (!name) {
    return (
      <>
        <div className="min-h-screen">
          <Header />
          <div>
            loading
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    const currentOeuvre = findOeuvres(name);
    return (
      <div
        className="min-h-screen w-full overflow-y-auto"
        style={{
          backgroundColor: systemTheme.background.primary,
          color: systemTheme.text.primary,
        }}
      >
        <main className="mx-auto flex h-full min-h-screen max-w-5xl flex-col gap-6 px-4 xl:px-0">
          <Header />
          <Link 
            href={"/fraction"} 
            className="flex gap-1 w-min pr-4 p-1 rounded-lg" 
            style={{
                background: systemTheme.background.button,
                color: systemTheme.text.secondary
            }}
          >
            <ArrowBigLeft/>Retour
          </Link>
          <div className="flex flex-col gap-4 xl:flex-row">
            <ImageOeuvre />
            <ArtworkDesc
              author={"[PLACEHOLDER]"}
              description={currentOeuvre.description}
              movement={"[PLACEHOLDER]"}
              technique={"[PLACEHOLDER]"}
              title={currentOeuvre.name}
              year={"[PL/AC/EHOL]"}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
