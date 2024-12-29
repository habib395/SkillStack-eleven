import React from 'react';

const ProductCard = ({ product }) => {
    // console.log(product)
    const { _id, productName, PhotoURL  } = product
    return (
        <div className="card bg-transparent border-2 border-green-500">
        <figure className="p-4">
          <img 
            src={PhotoURL}
            alt="Shoes"
            className="rounded-md sm:h-48 sm:w-full object-cover"
          />
        </figure>
        <div className="card-body sm:p-3 items-center text-center">
          <h2 className="card-title text-green-700">{productName}
          </h2>
        </div>
      </div>
    );
};

export default ProductCard;