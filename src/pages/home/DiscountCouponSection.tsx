/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect } from "react";
import { FiCopy, FiX } from "react-icons/fi";
import { toast } from "sonner";
import "aos/dist/aos.css";
import Aos from "aos";


const DiscountCouponSection = () => {

    useEffect(() => {
        Aos.init({
          duration: 600,
          once: true,
          offset: 20,
        });
      }, []);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [buttonText, setButtonText] = useState("Collect Coupon");
  const [couponCode, setCouponCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<any>(null);

  const generateRandomString = (length: number) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleGenerateCoupon = (e: any) => {
    e.preventDefault();

    if (!name.trim()) {
      toast("❌ Please enter your name");
      return;
    }
    if (!age || isNaN(Number(age)) || Number(age) < 18) {
      toast("❌ Please enter a valid age (18 or older)");
      return;
    }

    setButtonText("Generating...");
    const namePrefix = name.slice(0, 3).toUpperCase();
    const randomPart = generateRandomString(4);
    const newCoupon = `${namePrefix}${age}-${randomPart}`;
    setCouponCode(newCoupon);

    setTimeout(() => {
      setButtonText("Generated Your Coupon");
      setIsModalOpen(true);
    }, 500);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    toast("✅ Coupon code copied to clipboard!");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setButtonText("Collect Coupon");
    setName("");
    setAge("");
    setCouponCode("");
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        handleCloseModal();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div data-aos="zoom-in" className="bg-background py-10 px-4">
      <div
        className="max-w-[80vw] mx-auto bg-cover bg-center rounded-lg bg-accent p-8 relative lg:mt-20 lg:mb-30"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/QxbZ5B5R/discount.jpg')", // Bicycle-themed background
        }}
      >
        <div className="bg-card bg-opacity-80 rounded-lg p-6 max-w-lg">
          <h2 className="text-3xl font-bold text-primary mb-4 text-center">
            🚴 Get Your Bike Discount!
          </h2>
          <p className="text-muted-foreground text-center mb+ mb-6">
            Enter your details to receive a personalized discount on your next bicycle purchase.
          </p>
          <form onSubmit={handleGenerateCoupon} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                aria-label="Name"
                required
              />
              <input
                type="number"
                placeholder="Your Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                aria-label="Age"
                min="18"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-gray-700 text-primary-foreground px-6 py-3 rounded-lg text-lg font-semibold"
              disabled={buttonText === "Generating..."}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-card rounded-lg shadow-xl p-6 max-w-sm w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-primary">🚲 Your Coupon Code</h3>
              <button
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-primary"
                aria-label="Close modal"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <p className="text-muted-foreground mb-4">
              Use this code at checkout to enjoy your discount on Cycles Garden.
            </p>
            <div className="bg-accent p-4 rounded-lg text-center text-primary font-semibold text-lg">
              {couponCode}
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleCopyCoupon}
                className="bg-primary hover:bg-primary-foreground hover:text-black text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2"
              >
                Copy Code
                <FiCopy className="text-xl" />
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-secondary hover:bg-secondary-foreground hover:text-white text-secondary-foreground px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountCouponSection;