import { useEffect, useState } from "react";

const Hero = () => {
  const imagesArray = [
    "https://iili.io/37o1cPa.jpg",
    "https://iili.io/37o1ESR.jpg",
    "https://iili.io/37o1YoF.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imagesArray.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [imagesArray.length]);

  return (
    <div className="font-josefin-sans lg:!h-[100vh] h-[30vh] lg:!mt-0 mt-26">
      {/* Swiper Container */}
      <div className="relative w-full h-[92vh] overflow-hidden">
        {/* Images */}
        {imagesArray.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`absolute top-0 left-0 lg:!h-[92vh] w-full h-[30%] object-cover transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;