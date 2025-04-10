import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  // Initialize AOS animations
  useEffect(() => {
    window.scrollTo({ top: 0 });

    AOS.init({
      duration: 600,
      once: true,
      offset: 20,
    });
  }, []);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto min-h-screen lg:!mt-26 mt-24">
      {/* Header Section */}
      <section className=" mb-12">
        <h1
          className="text-4xl font-bold text-gray-800 mb-4"
          data-aos="fade-down"
        >
          About Cycles Garden
        </h1>
        <p
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Welcome to Cycles Garden, your one-stop shop for premium bicycles and
          accessories. We’re passionate about cycling and dedicated to helping
          you find the perfect ride.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div data-aos="fade-right">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              At Cycles Garden, we aim to inspire adventure and promote a healthy,
              active lifestyle through cycling. Whether you’re a mountain
              trailblazer, a road racer, or a casual rider, we provide
              top-quality bikes and gear to fuel your journey.
            </p>
          </div>
          <div data-aos="fade-left">
            <img
              src="https://i.postimg.cc/65ZvZc9M/Screenshot-2025-04-10-at-12-25-46-PM.png" // Replace with your own image
              alt="Cyclist on a trail"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2
          className="text-2xl font-semibold text-gray-800 text-center mb-8"
          data-aos="fade-up"
        >
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div
            className="text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src="https://i.postimg.cc/TPK1tkRJ/person1.avif" // Replace with team photo
              alt="Team Member 1"
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-medium text-gray-800">Jane Doe</h3>
            <p className="text-gray-600">Founder & Bike Enthusiast</p>
          </div>
          {/* Team Member 2 */}
          <div
            className="text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img
              src="https://i.postimg.cc/tCzsJZSW/person3.jpg" // Replace with team photo
              alt="Team Member 2"
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-medium text-gray-800">John Smith</h3>
            <p className="text-gray-600">Lead Mechanic</p>
          </div>
          {/* Team Member 3 */}
          <div
            className="text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <img
              src="https://i.postimg.cc/LX0ZdrpD/rakib.jpg" // Replace with team photo
              alt="Team Member 3"
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-medium text-gray-800">Emily Brown</h3>
            <p className="text-gray-600">Customer Support Specialist</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-12 rounded-lg">
        <h2
          className="text-2xl font-semibold text-gray-800 text-center mb-8"
          data-aos="fade-up"
        >
          Why Choose Cycles Garden?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center p-5">
          <div data-aos="fade-up" data-aos-delay="100" className="bg-white p-5 rounded-xl">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Quality Products
            </h3>
            <p className="text-gray-600">
              We source only the best bikes and accessories from trusted brands.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="100" className="bg-white p-5 rounded-xl">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Expert Support
            </h3>
            <p className="text-gray-600">
              Our team of cycling experts is here to guide you every step of the
              way.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="100" className="bg-white p-5 rounded-xl">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Fast Shipping
            </h3>
            <p className="text-gray-600">
              Get your gear quickly with our reliable and speedy delivery
              service.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;