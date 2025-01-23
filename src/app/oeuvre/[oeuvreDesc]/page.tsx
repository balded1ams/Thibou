"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";

import { useThemeContext } from "@/hooks/useTheme";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

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
        <main className="mx-auto flex h-full min-h-screen max-w-5xl flex-col mb-8">
          <Header />
          
          <div className="flex max-w-5xl flex-col mx-auto gap-3 px-4">
            <Link
              href={"/parcour"}
              className="flex gap-1 w-min pr-4 p-2 rounded-lg shadow border"
              style={{
                  background: systemTheme.background.primary,
                  color: systemTheme.background.button,
                  borderColor: systemTheme.background.button,
              }}
            >
              <ChevronLeft />Retour
            </Link>
            <div className="mx-auto flex flex-col gap-4 xl:flex-row">
              <ImageOeuvre  source={currentOeuvre.image[0].toUpperCase() + currentOeuvre.image.slice(1)}/>
              <ArtworkDesc
                author={currentOeuvre.artiste[0].toUpperCase() + currentOeuvre.artiste.slice(1)}
                description={currentOeuvre.description[0].toUpperCase() + currentOeuvre.description.slice(1)}
                movement={currentOeuvre.mouvement[0].toUpperCase() + currentOeuvre.mouvement.slice(1)}
                technique={currentOeuvre.type_oeuvre[0].toUpperCase() + currentOeuvre.type_oeuvre.slice(1)}
                title={currentOeuvre.name[0].toUpperCase() + currentOeuvre.name.slice(1)}
                year={"[PL/AC/EHOL]"}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
