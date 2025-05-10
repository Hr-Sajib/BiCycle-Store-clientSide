import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import Aos from "aos";
import 'aos/dist/aos.css';
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdOutlinePublic } from "react-icons/md";
import { FaLock } from "react-icons/fa";

// Define the Event type based on upcomingEvents.json structure
interface Event {
  name: string;
  category: string;
  location: string;
  date: string;
  access: 'Public' | 'Private';
  image: string;
  organizer: string;
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [focus, setFocus] = useState<number>(0);

  useEffect(() => {
    axios.get<Event[]>('./upcomingEvents.json')
      .then(r => {
        setEvents(r.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFocus((prevFocus) => (prevFocus + 1) % events.length); // Cycle through events
    }, 2000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [events.length]);

  useEffect(() => {
        Aos.init({
          duration: 600,
          once: true,
          offset: 20,
        });
    }, []);


  return (
    <div className="lg:!mb-[10vw] mb-[30vw] mx-[3vw] lg:!mt-0 mt-20">
      <div className="text-center mb-5 font-josefin-sans">
        <p data-aos="fade-up" className="lg:!text-4xl text-2xl">
          <span className="text-teal-600 opacity-65">U p c o m i n g</span> Cycling Events
        </p>
      </div>

      {/* Cards */}
      <div className="flex justify-center gap-1">
        {events.map((e, index) => (
          <div
            key={e.name}
            className={`relative h-[70vh] ${
              index === focus ? 'lg:!w-[30vw] w-[70vw]' : 'lg:!w-[10vw] w-[5vw]'
            } font-josefin-sans transition-width duration-500 ease-in-out`}
          >
            {/* Overlay for non-focused cards */}
            <div
              className={`absolute inset-0 bg-black opacity-55 ${
                index === focus ? 'hidden' : 'block'
              } z-10`}
            ></div>
            <img
              src={e.image}
              className="h-full w-full object-cover"
              alt={`${e.name} event`}
            />
            {/* Content overlay for focused card */}
            <div
              
              className={`absolute inset-0 ${
                index === focus ? 'bg-black bg-opacity-55' : 'bg-transparent'
              } p-3 lg:!mt-[25vw] mt-[50vw] border-t-[4px] border-teal-200 transition-all duration-500 ease-in-out z-20`}
            >
              <p
                className={`lg:!mb-3 w-full ml-1 mb-5 text-teal-200 ${
                  index === focus ? 'w-[30vw] text-3xl' : 'hidden'
                }`}
              >
                {e.name}
              </p>
              <div className="flex items-center gap-2">
                <FaLocationDot
                  className={`text-white relative bottom-[2px] ${
                    index === focus ? 'flex' : 'hidden'
                  }`}
                />
                <p
                  className={`text-gray-200 ${
                    index === focus ? 'flex' : 'hidden'
                  }`}
                >
                  {e.location}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineAccessTimeFilled
                  className={`text-white relative bottom-[2px] ${
                    index === focus ? 'flex' : 'hidden'
                  }`}
                />
                <p
                  className={`text-gray-200 ${
                    index === focus ? 'flex' : 'hidden'
                  }`}
                >
                  {e.date}
                </p>
              </div>
              <div
                className={`mt-5 ml-2 lg:!flex-row flex-col items-start text-sm ${index === focus ? 'flex' : 'hidden'}`}
              >
                <p className="text-black bg-white rounded-sm px-1">
                  {e.category}
                </p>
                <p className="text-black bg-white lg:!rounded-l-sm rounded-t-sm lg:!rounded-t-[0px]  lg:!mt-0 mt-2 lg:!ml-1 px-1">
                  Organized By
                </p>
                <p className="text-white border bg-black rounded-r-sm px-1">
                  {e.organizer}
                </p>
              </div>
              <div
                className={`mt-5 ml-2 lg:!w-[7vw] w-[30vw] bg-teal-200 rounded-sm ${
                  index === focus ? 'flex items-center justify-center' : 'hidden'
                }`}
              >
                <FaLock
                  className={`text-black ${
                    e.access === 'Private' ? 'flex' : 'hidden'
                  }`}
                />
                <MdOutlinePublic
                  className={`text-black pl-[2px] ${
                    e.access === 'Public' ? 'flex text-[1vw]' : 'hidden'
                  }`}
                />
                <p className="relative top-[3px] pb-[3px]  text-black bg-teal-200 rounded-xl text-sm px-1">
                  {e.access} Event
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;


