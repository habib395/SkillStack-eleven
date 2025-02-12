import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Query from "../../Query/Query";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoSearchSharp } from "react-icons/io5";

const Queries = () => {
  const allProducts = useLoaderData();
  const [products, setProducts] = useState(allProducts);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(""); 

  // Function to handle sorting
  const handleSort = (criteria) => {
    setSortBy(criteria);
    let sortedProducts = [...products];

    if (criteria === "price") {
      // Sorting by price after removing the dollar sign and converting to number
      sortedProducts.sort((a, b) => {
        const priceA = parseFloat(a.price.replace("$", "")); // Remove the '$' and convert to number
        const priceB = parseFloat(b.price.replace("$", "")); // Remove the '$' and convert to number
        return priceA - priceB; // Compare the numbers
      });
    } else if (criteria === "recommendation") {
      // Sorting by recommendation count (descending order)
      sortedProducts.sort(
        (a, b) => b.recommendationCount - a.recommendationCount
      );
    }

    setProducts(sortedProducts);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto sm:p-10 mt-12">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-400 py-6">
        ALL PRODUCTS
      </h1>

      {/* Sorting and Grid Controls */}
      <div className="sm:flex items-center justify-center sm:mb-6 gap-6">

        <div className="relative flex items-center p-2">
          <input
            className="input input-bordered w-full pr-10"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Product Name..."
          />
          <IoSearchSharp className="absolute right-3 text-gray-500 text-lg" />
        </div>

        {/* Sorting Dropdown */}
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="select select-bordered ml-2"
          value={sortBy}
        >
          <option value="">Sort By</option>
          <option value="price">Price (Low to High)</option>
          <option value="recommendation">Most Recommended</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className={"grid grid-cols-1 sm:grid-cols-3 gap-4 p-2 sm:p-10"}>
        {filteredProducts?.map((product) => (
          <Query key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Queries;
