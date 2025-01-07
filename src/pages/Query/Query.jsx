import React from "react";
import { NavLink } from "react-router-dom";

const Query = ({ product }) => {
  // console.log(product);
const { _id, productName, recommendationCount} = product
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img
          src={product.PhotoURL}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="">{productName}
          </h2>
          <div className="badge badge-secondary">{recommendationCount}</div>
        <NavLink to={`/details/${_id}`}>
        <button className="btn text-xs text-black w-full">Recommend</button>
        </NavLink>       
      </div>
    </div>
  );
};

export default Query;
