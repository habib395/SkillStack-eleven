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
    <div className="sm:flex flex-cols items-center justify-center">
      <div
        className="text-white bg-blue-500 p-3 lg:p-10 m-5 rounded-lg lg:w-full h-96"
        data-aos="fade-down"
      >
        <p className="text-2xl lg:text-7xl">
          <GoGoal />
        </p>
        <h2 className="text-xl lg:text-4xl font-bold text-center py-2">
          OUR MISSION
        </h2>
        <p className="lg-py-20 text-center">
          Our Section "Our mission is to empower users to create a seamless
          Product Recommendation Platform where they can add, update, delete,
          and explore product queries and recommendations, fostering
          collaborative problem-solving and informed decisions."
        </p>
      </div>
      <div
        className="text-white bg-blue-500 p-3 lg:p-10 m-5 rounded-lg md:w-full h-96"
        data-aos="fade-up"
      >
        <p className="text-2xl lg:text-7xl">
          <MdLocalOffer />
        </p>
        <h2 className="text-xl lg:text-4xl font-bold text-center py-2">
          WHAT WE OFFER
        </h2>
        <p>
        "We offer a dynamic platform where users can easily manage their product queries, share recommendations, and interact with others. Our system empowers users to make informed decisions by exploring detailed recommendations, updates, and expert insights for a variety of products."
        </p>
      </div>
      <div
        className="text-white bg-blue-500 p-3 lg:p-10 m-5 rounded-lg md:w-full h-96"
        data-aos="fade-down"
      >
        <p className="text-2xl lg:text-7xl">
          <RiChatVoiceAiFill />
        </p>
        <h2 className="text-xl lg:text-4xl font-bold text-center py-2">
          OUR PROMISE
        </h2>
        <p>
        "We promise to deliver a seamless and responsive platform, ensuring every user has the opportunity to explore, share, and recommend products with ease. We are committed to maintaining transparency, security, and providing a user-friendly experience at every stage of interaction."
        </p>
      </div>
    </div>
  );
};

export default About;
