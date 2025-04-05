import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css"; // Core Swiper styles

const Hero = () => {
  const imagesArray = [
    "https://iili.io/37o1cPa.jpg",
    "https://iili.io/37o1ESR.jpg",
    "https://iili.io/37o1YoF.jpg",
  ];

  return (
    <div className="font-josefin-sans">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 200000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full"
      >
        {imagesArray.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full object-cover"
              src={image}
              alt={`Slide ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;