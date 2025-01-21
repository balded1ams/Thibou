import Image from "next/image";
import React from "react";

const ImageOeuvre = () => {
  return (
    <>
      <Image
        className="rounded-lg shadow"
        src={"/oeuvre.jpg"}
        alt="Plan de musée"
        width={625}
        height={558}
        priority={false}
      />
    </>
  );
};

export default ImageOeuvre;