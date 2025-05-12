import FeaturedProducts from "./FeaturedProducts";
import Hero from "./Hero";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Review from "./Reviews";
import DiscountCouponSection from "./DiscountCouponSection";
import ContactUs from "./ContactUs";
import Branding from "./Branding";
import AboutUs from "./AboutUs";
import UpcomingEvents from "./UpcomingEvents";

const Home = () => {

    const sliderSettings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        // vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
        autoplay: true,
        speed: 600,
        autoplaySpeed: 2000,
        arrows: false,

      };

    return (
        <div className="">
            <Hero/>
            <div className="bg-gradient-to-r from-blue-200 to-gray-200 font-josefin-sans mt-2 mb-10 ">
            <Slider {...sliderSettings} className=" border-black  w-[90vw] pl-[10vw]">
                                    
                <div><p className="text-[3.2vw] mb-0 text-blue-800">MOUNTAIN</p></div>
                <div><p className="text-[3.2vw] mb-0 text-blue-800">ROAD</p></div>
                <div><p className="text-[3.2vw] mb-0 text-blue-800">HYBRIDS</p></div>
                <div><p className="text-[3.2vw] mb-0 text-blue-800">BMX</p></div>
                <div><p className="text-[3.2vw] mb-0 text-blue-800">ELECTRIC</p></div>
                                                    
            </Slider>
        </div>
            <FeaturedProducts/>
            <Branding/>
            <DiscountCouponSection/>
            <UpcomingEvents/>
            <AboutUs/>
            <ContactUs/>
            <Review/>
        </div>
    );
};

export default Home;