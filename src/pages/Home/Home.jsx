import React from "react";
import Slider from "../../Slider/Slider";
import About from "./About";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
// import { Bounce } from 'react-awesome-reveal';

const Home = () => {
  const products = useLoaderData()
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Slider></Slider>
      {/* our products section */}
      <div>
      <h2 className="text-green-500 font-bold text-xl sm:text-4xl text-center py-3">
          OUR PRODUCT
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 sm:p-10">
        {
          products.map((product, idx) => (
            <ProductCard key={idx} product={product}></ProductCard>
          ))
        }
        </div>
      </div>
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
                <h2 className="card-title">Milk Powder</h2>
                <p>
                "While Dano offers great nutritional value, its price is significantly higher than other milk powders available in the market. I wish it was more affordable for regular use."
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
              <h2 className="card-title">Cooking Oil</h2>
              <p>
              "Rupchanda cooking oil is of good quality, but I noticed that it gets rancid too quickly after opening. It would be great if the shelf life was a bit longer."
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
                <h2 className="card-title">Detergent Powder </h2>
                <p>
                  "Surf Excel works well, but the strong scent is a bit overwhelming and causes irritation. I'd prefer a more natural alternative with less harsh chemicals"
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
              <h2 className="card-title">Soap</h2>
              <p>
              "Lux soap smells great, but it tends to dry out my skin, especially during the winter months. I'm looking for a soap that offers more moisture and lasts longer."
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
                <h2 className="card-title">Noodles </h2>
                <p>
                "Maggi noodles are tasty, but the high sodium content concerns me. I wish there were healthier versions with less artificial flavoring and a more balanced nutritional profile."
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
