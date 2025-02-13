import React from "react";
import { NavLink } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";

const Query = ({ product }) => {
  const { _id, productName, recommendationCount, price, PhotoURL } = product;

  return (
    <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105">
      <figure className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <img
          src={PhotoURL || "https://via.placeholder.com/150"}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <div className="flex justify-between items-center gap-3">
          <h2 className="text-xs font-semibold text-gray-800 dark:text-gray-100">{productName}</h2>
          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">{price || "N/A"}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FaThumbsUp className="text-blue-500 dark:text-blue-400" />
          <span className="text-sm font-medium">{recommendationCount}</span>
        </div>
        <NavLink to={`/details/${_id}`} className="mt-2">
          <button className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 rounded-lg transition">
            Recommend
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Query;
