const Branding = () => {
    return (
      <section className=" bg-fixed w-full lg:h-80 h-[30vh] bg-no-repeat bg-center bg-cover px-4 text-center shadow-md my-20 relative">
        <div className="bg-black w-full h-full absolute left-0"></div>
        <div className="container mx-auto">
          <div className="relative top-2 md:top-20">
            <h1 className="text-4xl font-bold text-blue-200 mb-3">Cycles Garden</h1>
            <p className="text-lg text-white mb-3">
              Your premier destination for high-quality bicycles, accessories, and cycling gear.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white px-4 py-2 rounded-full border text-sm text-blue-600 shadow">
              👨‍💻 Expert Support
              </span>
              <span className="bg-white px-4 py-2 rounded-full border text-sm text-blue-600 shadow">
              🏆 Premium Quality
              </span>
              <span className="bg-white px-4 py-2 rounded-full border text-sm text-blue-600 shadow">
              🚚 Fast Shipping
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Branding;