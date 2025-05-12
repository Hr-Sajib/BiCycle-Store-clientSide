import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  const imagesArray = [
    "https://i.postimg.cc/FzNW9qZz/b1.jpg",
    "https://i.postimg.cc/RhdPqRsR/b3.jpg",
    "https://i.postimg.cc/ZRrszZ6X/b2.jpg",
  ];

  const taglines = [
    "Ride Without Limits ",
    "Find Your Perfect Bike ",
    "Pedal Your Passion ",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality for images
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
    <div className="font-josefin-sans lg:!h-[60vh] h-[30vh] relative">
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
        {/* Overlay with Typewriter Effect */}
        <div className="absolute border lg:!px-10 ml-[10%] rounded-md lg:!top-[45%] top-[12%] flex items-center justify-center  bg-opacity-30">
          <TypeAnimation
            sequence={[
              taglines[0], // First tagline
              2000, // Wait 2 seconds
              taglines[1], // Second tagline
              2000,
              taglines[2], // Third tagline
              2000,
            ]}
            wrapper="h1"
            cursor={true}
            repeat={Infinity}
            className="text-white text-2xl lg:text-4xl font-bold text-center px-4"
          />
          
        </div>
      </div>
    </div>
  );
};

export default Hero;