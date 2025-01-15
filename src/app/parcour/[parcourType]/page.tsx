"use client"

import Header from "@/components/header";
import Plan from "@/components/plan"
import Footer from "@/components/footer";
import Guide from "@/components/guide";
import {useThemeContext} from "@/hooks/useTheme";
import { use } from "react";
import { notFound } from "next/navigation";
import ArtworkDesc from "@/components/ArtworkDesc";
import ImageOeuvre from "@/components/imageOeuvres";

export default function ParcourPage({ params: paramsPromise }) {
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
            className=" mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 xl:px-0"
            style={{}}
          >
              <Header />
              <div className="flex flex-col gap-4 xl:flex-row">
                  <ImageDesc />
                  <TextDesc
                    title={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"}
                    year={"Lorem ipsum dolor"}
                    author={"Lorem ipsum dolor"}
                    movement={"Lorem ipsum dolor"}
                    technique={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"}
                    description={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"}
                  />
              </div>
          </main>
          <Footer />
      </div>
    );
}