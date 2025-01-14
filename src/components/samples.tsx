import { useThemeContext } from "@/hooks/useTheme";
import Image from "next/image";
import map from '/public/map.jpg';  // A remplacer par les 3 images voulues

const Samples = () => {
    const { systemTheme } = useThemeContext();

    return (
        <div
            className="flex flex-col items-center py-8 "
            style={{
                color: systemTheme.text.primary,
            }}
        >
            <p>Some samples: </p>
            <section className="flex flex-wrap gap-4">
                <Image
                    src={map}   // A remplacer par l'image voulue
                    alt={`exemple 1`}
                    width={300}
                    height={300}
                    className="image"
                />
                <Image
                    src={map}   // A remplacer par l'image voulue
                    alt={`exemple 2`}
                    width={300}
                    height={300}
                    className="image"
                />
                <Image
                    src={map}   // A remplacer par l'image voulue
                    alt={`exemple 3`}
                    width={300}
                    height={300}
                    className="image"
                />
            </section>
        </div>
    );
};

export default Samples;
