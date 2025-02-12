import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListQuery from "../ListQueries/ListQuery";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { IoSearchSharp } from "react-icons/io5";

const MyQueries = () => {
  const { email } = useParams();
  const [queriesList, setQueriesList] = useState([]);
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/queries/${email}`)
      .then((response) => setQueriesList(response.data))
      .catch((error) => console.error("Error fetching queries:", error));
  }, [email]);

  useEffect(() => {
    const fetchAllQueries = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/addQueries?search=${search || ""}`
        );
        setQueriesList(data);
      } catch (error) {
        console.error("Error fetching search queries:", error);
      }
    };
    fetchAllQueries();
  }, [search]);

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      {/* Add Query Banner section */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://i.ibb.co.com/ScxNXdB/banner.png)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl sm:text-5xl font-bold text-white">
              Empowering Your Product Queries
            </h1>
            <Link to="/addQueries">
              <button className="btn btn-primary">Add Queries</button>
            </Link>
          </div>
        </div>
      </div>

      <ul>
        <div className="sm:flex items-center justify-center sm:mb-6 gap-4 my-3">
          <div className="relative flex items-center p-2">
            <input
              className="input input-bordered ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Product Name"
            />
            <IoSearchSharp className="absolute right-3 text-gray-500 text-lg dark:text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 sm:p-10">
          {queriesList.length > 0 ? (
            queriesList.map((item) => (
              <ListQuery
                key={item._id}
                queriesList={queriesList}
                setQueriesList={setQueriesList}
                item={item}
              />
            ))
          ) : (
            <p>No product found for this user.</p>
          )}
        </div>
      </ul>
    </div>
  );
};

export default MyQueries;
