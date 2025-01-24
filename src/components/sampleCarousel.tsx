import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import ex1 from '/public/ex1.png';
import ex2 from '/public/ex2.png';
import ex3 from '/public/ex3.png';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useThemeContext } from '@/hooks/useTheme';

const SampleCarousel = () => {
    const { systemTheme } = useThemeContext();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '250px',
        responsive: [
            {
                breakpoint: 768, // Pour les écrans de taille tablette et plus petits
                settings: {
                    centerPadding: '40px', // Réduis l'espace entre les images
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 480, // Pour les écrans de taille téléphone
                settings: {
                    centerPadding: '20px', // Réduis encore plus l'espace entre les images
                    slidesToShow: 1,
                    arrows: false // Masque les flèches de navigation
                }
            }
        ]
        
    };

    const images = [ex1, ex2, ex3];

    return (
        <div
            className="flex flex-col items-center gap-8 py-8 text-xl font-semibold"
            style={{
                color: systemTheme.text.primary,
            }}
        >
            <p>Quelques exemples : </p>
            <Slider {...settings} className="w-full max-w-4xl"> {/* Augmentez la largeur maximale */}
                {images.map((image, index) => (
                    <div key={index} className="flex justify-center items-center px-3"> {/* Augmentez la hauteur */}
                        <Image
                            src={image}
                            alt={`exemple ${index + 1}`}
                            width={350} // Augmentez la largeur de l'image
                            height={300} // Augmentez la hauteur de l'image
                            className="mx-auto"
                        />
                    </div>
                ))}
            </Slider>
            <style jsx global>{`
                .slick-prev:before, .slick-next:before {
                    color: ${systemTheme.text.primary}; /* Changez cette couleur selon vos besoins */
                }
            `}</style>
        </div>
    );
};

export default SampleCarousel;
