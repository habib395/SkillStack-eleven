import React from "react";
import Slider from "../../Slider/Slider";
import About from "./About";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import Feature from "./Feature";


const Home = () => {
  const products = useLoaderData();
  return (
    <div className="min-h-screen bg-gray-200 text-gray-900 mt-16">
      <Slider></Slider>
      {/* feature products section */}
      <Feature></Feature>
      {/* our products section */}
      <div>
        <h2 className="text-blue-500 font-bold text-xl sm:text-4xl text-center py-3">
          RECENT PRODUCTS
        </h2>
        <div className="w-3/4 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 p-2 sm:p-10">
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product}></ProductCard>
          ))}
        </div>
      </div>
      {/* about us section  */}
      <div className="py-10">
        <h2 className="text-blue-700 font-bold text-xl sm:text-4xl text-center py-3">
          ABOUT US
        </h2>
      </div>
      <About></About>
      {/* satisfaction section */}
      <div className="py-10">
        <h2 className="text-blue-600 font-bold text-2xl sm:text-4xl text-center py-6 uppercase">
          REVIEWS
        </h2>

        <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="flex items-center border-2 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform bg-white">
            <figure className="w-1/3 h-full">
              <img
                className="w-full h-full object-cover"
                src="https://i.ibb.co.com/VjbJPP6/satis-one.png"
                alt="Milk Powder"
              />
            </figure>
            <div className="p-5 flex-1">
              <h2 className="font-bold text-xl text-blue-600">Milk Powder</h2>
              <p className="text-gray-700 text-justify">
                "While Dano offers great nutritional value, its price is
                significantly higher than other milk powders available in the
                market. I wish it was more affordable for regular use."
              </p>
              <p className="text-sm text-blue-500 font-bold">
                Michael J., Pro Footballer
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center border-2 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform bg-white">
            <figure className="w-1/3 h-full">
              <img
                className="w-full h-full object-cover"
                src="https://i.ibb.co.com/sb08yw7/satis-two.png"
                alt="Cooking Oil"
              />
            </figure>
            <div className="p-5 flex-1">
              <h2 className="font-bold text-xl text-blue-600">Cooking Oil</h2>
              <p className="text-gray-700 text-justify">
                "Rupchanda cooking oil is of good quality, but I noticed that it
                gets rancid too quickly after opening. It would be great if the
                shelf life was a bit longer."
              </p>
              <p className="text-sm font-bold text-blue-500">
                Liam H., Basketball Enthusiast
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex border-2 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform bg-white">
            <figure className="w-1/3 h-full">
              <img
                className="w-full h-full object-cover"
                src="https://i.ibb.co.com/Cw9VhyJ/satis-three.png"
                alt="Detergent Powder"
              />
            </figure>
            <div className="p-5 flex-1">
              <h2 className="font-bold text-xl text-blue-600">
                Detergent Powder
              </h2>
              <p className="text-gray-700 text-justify">
                "Surf Excel works well, but the strong scent is a bit
                overwhelming and causes irritation. I'd prefer a more natural
                alternative with less harsh chemicals."
              </p>
              <p className="text-sm font-bold text-blue-500">
                Emma P., Soccer Coach
              </p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="flex border-2 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform bg-white">
            <figure className="w-1/3 h-full">
              <img
                className="w-full h-full object-cover"
                src="https://i.ibb.co.com/426y0nz/satis-four.png"
                alt="Soap"
              />
            </figure>
            <div className="p-5 flex-1">
              <h2 className="font-bold text-xl text-blue-600">Soap</h2>
              <p className="text-gray-700 text-justify">
                "Lux soap smells great, but it tends to dry out my skin,
                especially during the winter months. I'm looking for a soap that
                offers more moisture and lasts longer."
              </p>
              <p className="text-sm font-bold text-blue-500">
                Ryan T., Team Captain
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
