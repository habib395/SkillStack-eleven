import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const Category = () => {
  const { categoryName } = useParams();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .get("https://recommendation-eleven-ph.vercel.app/addQueries")
      .then((response) => {
        const data = response.data;
        const filteredItems = data.filter((item) =>
          item.category.toLowerCase().includes(categoryName.toLowerCase())
        );
        setFilteredData(filteredItems);
      });
  }, [categoryName]);

  return (
    <div className=" dark:bg-gray-900 dark:text-white">
      <div className="w-11/12 mx-auto py-6">
        <h2 className="text-center text-3xl font-bold text-blue-700 dark:text-blue-400">
          {categoryName}
        </h2>
        {filteredData.length === 0 ? (
          <p className="text-center text-gray-500 mt-4 dark:text-gray-400">
            No products found in this category
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {filteredData.map((item) => (
              <div
                key={item._id}
                className="card bg-gray-50 bg-transparent shadow-lg py-1 dark:bg-gray-800 dark:border dark:border-gray-700 dark:shadow-lg"
              >
                <figure className="p-4">
                  <img
                    src={item.PhotoURL}
                    alt="Shoes"
                    className="sm:h-48 sm:w-full object-cover rounded-lg"
                  />
                </figure>
                <div className="card-body sm:p-3 items-center text-center">
                  <h2 className="card-title text-sm dark:text-white">
                    {item.productBrand}
                  </h2>
                </div>
                <p>
                  <h2 className="text-sm text-center px-2 dark:text-gray-300">
                    {item.queryTitle}
                  </h2>
                </p>
                <div className="flex justify-center items-center p-2">
                  <NavLink
                    to={`/details/${item._id}`}
                    className="btn btn-primary btn-sm rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    View More
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
