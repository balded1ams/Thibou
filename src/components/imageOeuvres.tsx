import Image from "next/image";
import React from "react";
import {utilisateurType} from "@/types";


interface oeuvresProps {
    source: string;
}
const ImageOeuvre: React.FC<oeuvresProps> = ({ source }) => {
  return (
    <>
      <Image
        className="rounded-lg shadow"
        src={source}
        alt="Plan de musée"
        width={625}
        height={558}
        priority={false}
      />
    </>
  );
};

export default ImageOeuvre;