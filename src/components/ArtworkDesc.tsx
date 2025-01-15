import React from "react";
import { useThemeContext } from "@/hooks/useTheme";

interface ArtworkDescProps {
  title: string;
  year: string;
  author: string;
  movement: string;
  technique: string;
  description: string;
}

const ArtworkDesc: React.FC<ArtworkDescProps> = ({
  title,
  year,
  author,
  movement,
  technique,
  description,
}) => {
  const { systemTheme } = useThemeContext();

  return (
    <div className="p-6 max-w-md bg-beige rounded-lg flex flex-col gap-4" style={{ backgroundColor: systemTheme.background.secondary }}>

      <div className="flex flex-col">
        {/* Titre de l'œuvre et l'année */}
        <h1 className="text-2xl font-bold pb-0 mb-0">
          {title} – {year}
          
        </h1>

        {/* Auteur */}
        <h2 className="text-lg">{author}</h2>
      </div>

      {/* Mouvement et technique */}
      <div className="grid grid-cols-2">
        <p className="font-bold">Mouvement</p>
        <p>{movement}</p>
        <p className="font-bold">Technique</p>
        <p>{technique}</p>
      </div>

      {/* Description */}
      <p className="text-justify">{description}</p>
    </div>
  );
};

export default ArtworkDesc;