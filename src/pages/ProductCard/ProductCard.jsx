import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, PhotoURL, productBrand, queryTitle } = product;
  return (
    <div className="card bg-gray-50 bg-transparent shadow-lg py-1">
      <figure className="p-4">
        <img
          src={PhotoURL}
          alt="Shoes"
          className="sm:h-48 sm:w-full object-cover rounded-lg"
        />
      </figure>
      <div className="card-body sm:p-3 items-center text-center">
        <h2 className="card-title text-sm">{productBrand}</h2>
      </div>
      <p>
        <h2 className="text-sm text-center px-2">{queryTitle}</h2>
      </p>
      <div className="flex justify-center items-center p-2">
        <NavLink
          to={`/details/${_id}`}
          className="btn btn-primary btn-sm rounded-lg"
        >
          View More
        </NavLink>
      </div>
    </div>
  );
};

export default ProductCard;
