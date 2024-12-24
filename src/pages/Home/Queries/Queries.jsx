import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Query from "../../Query/Query";

const Queries = () => {
  const allProducts = useLoaderData();
  const [products, setProducts] = useState(allProducts);
  // console.log(products  )
//   console.log(products);
    const handleSortedPrice = () =>{
        const sortedProducts = [...products].sort((a, b) => 
            parseFloat(a.currentDate) - parseFloat(b.currentDate))
        setProducts(sortedProducts)
    }
  return (
    <div className="container  mx-auto sm:p-10">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-400">
        SPORT EQUIPMENT
      </h1>
      <button onClick={handleSortedPrice} className="btn bg-green-500 m-2 sm:m-6">Sort By</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 sm:p-10">
        {products?.map((product) => <Query key={product._id} product={product}></Query>)}
      </div>
    </div>
  );
};

export default Queries;
