import Image from "next/image";
import React from "react";

const ImageOeuvre = () => {
  return (
    <>
      <Image
        src={"/map.jpg"}
        alt="Plan de musée"
        width={625}
        height={558}
        priority={false}
      />
    </>
  );
};

export default ImageOeuvre;