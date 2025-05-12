/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import emailjs from "emailjs-com";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ContactUs = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [buttonText, setButtonText] = useState("Send Message");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonText("Sending...");

    if (!form.current) {
      setButtonText("Send Message");
      return;
    }



    const formData = new FormData(form.current);
    const userEmail = formData.get("email") as string;
    const userName = formData.get("name") as string;
    const userMessage = formData.get("message") as string;

    const templateParams = {
      from_name: "Cycles Garden Contact",
      from_email: userEmail,
      name: userName,
      message: userMessage,
    };

    emailjs
      .send('service_o8upbpr', 'template_xafqw9e', templateParams, 'ZF5npbVhSWZvkYdcx')
      .then(
        () => {
          setButtonText('Sent');
          setTimeout(() => {
            setButtonText('Send Message');
            form.current?.reset();
          }, 1000);
        },
        (error) => {
          console.error('EmailJS error:', error.text);
          setButtonText('Send Message');
        }
      );
  };

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 20,
    });
  }, []);

  return (
    <div data-aos="fade-down"
      className="mx-[8vw] py-16 relative bg-fixed bg-cover bg-center bg-no-repeat lg:mb-30"
    >
      <div className="flex justify-center items-center px-4 ">
        <div className="bg-card shadow-xl rounded-lg p-8 lg:w-3/5 w-full border border-border  bg-gradient-to-r from-gray-200 to-gray-50">
          <h1 className="text-3xl font-bold text-center text-primary mb-8">
            Get in Touch
          </h1>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <input
                required
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              />
            </div>
            <textarea
              required
              name="message"
              placeholder="How can we assist you with your cycling needs?"
              className="w-full h-36 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-primary hover:bg-gray-600 text-primary-foreground px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2"
                disabled={buttonText === "Sending..."}
              >
                {buttonText}
                <RiSendPlaneFill className="text-xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;