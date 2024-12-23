import React from "react";
import Slider from "../../Slider/Slider";
import About from "./About";
// import { Bounce } from 'react-awesome-reveal';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Slider></Slider>
      {/* about us section  */}
      <div className="py-10">
        <h2 className="text-green-700 font-bold text-xl sm:text-4xl text-center py-3">
          ABOUT US
        </h2>
      </div>
      <About></About>
      {/* satisfaction section */}
      <div className="py-10">
        <h2 className="text-green-500 font-bold text-xl sm:text-4xl text-center py-3">
          OUR CUSTOMER SATISFACTION
        </h2>
        {/* card customer */}
        <div className="text-green-500 p-3 w-11/12 mx-auto">
            <div className="sm:flex card-side border-2 border-green-500 rounded-md">
              <figure>
                <img
                  src="https://i.ibb.co.com/VjbJPP6/satis-one.png"
                  alt="Movie"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Professional Football</h2>
                <p>
                  "As a professional player, I've tried countless footballs, but
                  this one truly stands out. The grip, bounce, and durability
                  are unmatched. It's perfect for every game, whether on grass
                  or turf. Highly recommended for anyone serious about
                  football!"
                </p>
                <p className="text-base font-bold">
                  Michael J., Pro Footballer
                </p>
              </div>
            </div>

          {/* card-two */}
          <div className="sm:flex card-side border-2 border-green-500 rounded-md mt-5">
            <figure>
              <img
                src="https://i.ibb.co.com/sb08yw7/satis-two.png"
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Basketball Elite</h2>
              <p>
                This basketball changed the game for me. The premium leather
                finish and perfect weight make it a joy to play with. It's like
                it was crafted for perfection. Thank you for offering such a
                top-notch product!"
              </p>
              <p className="text-base font-bold">
                Liam H., Basketball Enthusiast
              </p>
            </div>
          </div>
          {/* card three */}
            <div className="sm:flex card-side border-2 border-green-500 rounded-md mt-5">
              <figure>
                <img
                  src="https://i.ibb.co.com/Cw9VhyJ/satis-three.png"
                  alt="Movie"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Soccer Cleats</h2>
                <p>
                  "These cleats are a game-changer! They're so light, I feel
                  like I'm flying across the field. Plus, the customization
                  option allowed me to make them truly mine. Best investment for
                  any soccer lover!"
                </p>
                <p className="text-base font-bold">Emma P., Soccer Coach</p>
              </div>
            </div>
          {/* card four  */}
          <div className="sm:flex card-side border-2 border-green-500 rounded-md mt-5">
            <figure>
              <img
                src="https://i.ibb.co.com/426y0nz/satis-four.png"
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Team Jersey</h2>
              <p>
                "Our team looks and feels incredible in these jerseys! The
                breathable material and professional finish make every game a
                stylish and comfortable experience. The custom prints were
                flawless, and delivery was on time!"
              </p>
              <p className="text-base font-bold">Ryan T., Team Captain</p>
            </div>
          </div>
          {/* card five  */}
            <div className="sm:flex card-side border-2 border-green-500 rounded-md mt-5">
              <figure>
                <img
                  src="https://i.ibb.co.com/9NZ12Gx/satis-five.png"
                  alt="Movie"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Tennis Racket Pro</h2>
                <p>
                  "This racket has elevated my game to the next level. The
                  balance, power, and control are perfect for both practice and
                  tournaments. It's clear a lot of thought went into its design.
                  A must-have for any serious tennis player!"
                </p>
                <p className="text-base font-bold">
                  Sophia L., Tennis Champion
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
