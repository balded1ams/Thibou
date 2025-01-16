"use client";

import Header from "@/components/header";
import Plan from "@/components/plan";

import Footer from "@/components/footer";
import Guide from "@/components/guide";
import { useThemeContext } from "@/hooks/useTheme";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import ArtworkDesc from "@/components/ArtworkDesc";
import ImageOeuvre from "@/components/imageOeuvres";

export default function ParcourPage({ params: paramsPromise }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const advancePoint = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      console.log(newIndex);
      return newIndex;
    });
  };

  const params = use(paramsPromise);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const parcourType = params?.parcourType;

  const validparcourType = ["fraction", "description"];

  const ImageDesc = parcourType === "fraction" ? Plan : ImageOeuvre; //plan priority TRUE
  const TextDesc = parcourType === "fraction" ? Guide : ArtworkDesc;

  if (!parcourType || !validparcourType.includes(parcourType)) {
    notFound();
  }

  const { systemTheme } = useThemeContext();

  return (
    <div
      className="min-h-screen w-full overflow-y-auto"
      style={{
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      }}
    >
      <main
        className="mx-auto flex h-full min-h-screen max-w-5xl flex-col gap-4 px-4 xl:px-0"
        style={{}}
      >
        <Header />
        <div className="flex flex-col gap-4 xl:flex-row">
          <ImageDesc currentIndex={currentIndex} />
          <TextDesc
            title={"La Nuit étoilée"}
            year={"1889"}
            author={"Van Gogh"}
            movement={"Postimpressionnisme"}
            technique={"Huile sur toile"}
            description={
              "La Nuit étoilée est une peinture de l'artiste peintre postimpressionniste néerlandais Vincent van Gogh. Le tableau représente ce que Van Gogh pouvait voir et extrapoler de la chambre qu'il occupait dans l'asile du monastère Saint-Paul-de-Mausole à Saint-Rémy-de-Provence en mai 1889. Souvent présenté comme son grand œuvre, le tableau a été reproduit à de très nombreuses reprises. "
            }
            onClick={() => advancePoint()}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
