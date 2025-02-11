import React from "react";

const ProductCard = ({ product }) => {
  const { PhotoURL, productBrand, queryTitle } = product;
  return (
    <div className="card bg-gray-50 bg-transparent shadow-lg py-2">
      <figure className="p-4">
        <img
          src={PhotoURL}
          alt="Shoes"
          className="sm:h-48 sm:w-full object-cover"
        />
      </figure>
      <div className="card-body sm:p-3 items-center text-center">
        <h2 className="card-title text-sm">{productBrand}</h2>
      </div>
      <p>
        <h2 className="text-sm text-center px-2">{queryTitle}</h2>
      </p>
      <div className="flex justify-center items-center p-2">
       <button className="btn btn-primary btn-sm rounded-full">View More</button>
      </div>
    </div>
  );
};

export default ProductCard;
