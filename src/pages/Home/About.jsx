import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { GoGoal } from "react-icons/go";
import { RiChatVoiceAiFill } from "react-icons/ri";
import { MdLocalOffer } from "react-icons/md";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  return (
    <div className="w-11/12 mx-auto sm:flex flex-cols items-center justify-center">
      <div
        className="bg-blue-400 p-3 lg:p-10 m-5 rounded-lg md:w-full sm:py-4 h-96"
        data-aos="fade-up"
      >
        <p className="text-2xl lg:text-7xl">
          <GoGoal />
        </p>
        <h2 className="text-lg lg:text-2xl font-bold text-center py-2">
          OUR MISSION
        </h2>
        <p className="lg-py-20 text-center">
          Our Section "Our mission is to empower users to create a seamless
          Product Recommendation Platform where they can add, update, delete,
          and explore product."
        </p>
      </div>

      <div
        className="bg-blue-400 p-3 lg:p-10 m-5 rounded-lg md:w-full sm:py-4 h-96"
        data-aos="fade-up"
      >
        <p className="text-2xl lg:text-7xl">
          <MdLocalOffer />
        </p>
        <h2 className="text-lg lg:text-2xl font-bold text-center py-2">
          WHAT WE OFFER
        </h2>
        <p className="lg-py-20 text-center">
          "We offer a dynamic platform where users can easily manage their
          product queries, share recommendations, and interact with others."
        </p>
      </div>
      <div
        className="bg-blue-400 p-3 lg:p-10 m-5 rounded-lg md:w-full py-4 h-96"
        data-aos="fade-down"
      >
        <p className="text-2xl lg:text-7xl">
          <RiChatVoiceAiFill />
        </p>
        <h2 className="text-lg lg:text-2xl font-bold text-center sm:py-2">
          OUR PROMISE
        </h2>
        <p className="lg-py-20 text-center">
          "We promise to deliver a seamless and responsive platform, ensuring
          every user has the opportunity to explore, share, and recommend
          products with ease."
        </p>
      </div>
    </div>
  );
};

export default About;
