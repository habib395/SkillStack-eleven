import React from "react";
import { NavLink } from "react-router-dom";

const Query = ({ product }) => {
  console.log(product);
const { _id, productBrand, recommendationCount} = product
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img
          src={product.PhotoURL}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{productBrand}<div className="badge badge-secondary">{recommendationCount}</div></h2>
        <NavLink to={`/details/${_id}`}>
        <button className="btn btn-primary">Recommend Button</button>
        </NavLink>       
      </div>
    </div>
  );
};

export default Query;
