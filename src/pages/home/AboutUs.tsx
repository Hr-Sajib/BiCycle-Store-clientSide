import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AboutUs = () => {

    useEffect(() => {
        AOS.init({
          duration: 600,
          once: true,
          offset: 20,
        });
      }, []);

  return (
    <section data-aos="fade-up" className="mx-[9vw] mb-20 relative bg-fixed bg-cover bg-center bg-no-repeat bg-[url('https://i.postimg.cc/zG7d0KG1/about-cycle.jpg')]">
      <div className="bg-black opacity-70 w-full h-full absolute left-0"></div>
      <div className="container mx-auto px-4 relative z-10 py-10">
        {/* Text vs Image Container */}
        <div className="flex flex-col sm:flex-col md:flex-row lg:!flex-row items-center gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 w-full text-white">
            <h2 className="text-4xl font-bold mb-6 text-gray-200">About Cycles Garden</h2>
            <p className="text-lg mb-6">
              At CycleWorks, we are passionate about cycling and dedicated to bringing you the best bicycles, accessories, and gear. Our mission is to empower every rider—whether you're a casual commuter or a competitive cyclist—with high-quality products and exceptional service.
            </p>
            <p className="text-lg mb-6">
              Founded by a team of cycling enthusiasts, we believe in the freedom and joy that comes with every ride. From road bikes to mountain bikes, we curate only the finest products to ensure durability, performance, and style.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-white px-4 py-2 rounded-full border text-sm text-gray-600 shadow">
                Passion for Cycling
              </span>
              <span className="bg-white px-4 py-2 rounded-full border text-sm text-gray-600 shadow">
                Quality Guaranteed
              </span>
              <span className="bg-white px-4 py-2 rounded-full border text-sm text-gray-600 shadow">
                Community Driven
              </span>
            </div>
          </div>
          {/* Image Content */}
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              <img
                src="https://i.postimg.cc/Qt2SHq0c/about-us-cicle.webp"
                alt="Cyclist riding a bicycle"
                className="w-full h-auto rounded-lg shadow-xl border-4 border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;