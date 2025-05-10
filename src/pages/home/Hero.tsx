import { useEffect, useState } from "react";

const Hero = () => {
  const imagesArray = [
    "https://i.postimg.cc/dVtfnmvC/banner1-C.jpg",
    "https://i.postimg.cc/L6V7z0dR/banner2.jpg",
    "https://i.postimg.cc/13Cjdn5j/banner3.jpg",
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
    <div className="font-josefin-sans lg:!h-[60vh] h-[30vh]">
      {/* Swiper Container */}
      <div className="relative w-full lg:!h-[60vh] h-[92vh] overflow-hidden">
        {/* Images */}
        {imagesArray.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`absolute top-0 left-0 lg:!h-[60vh] w-full h-[30%] object-cover transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;