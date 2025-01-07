import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListQuery from "../ListQueries/ListQuery";
import axios from "axios";

const MyQueries = () => {
  const { email } = useParams();
  const [queriesList, setQueriesList] = useState([]);
  const [gridCols, setGridCols] = useState("grid-cols-1");
  const [search, setSearch] = useState("");

  const handleGrid1 = () => setGridCols("grid-cols-1");
  const handleGrid2 = () => setGridCols("grid-cols-2");
  const handleGrid3 = () => setGridCols("grid-cols-3");

 
 
  useEffect(() => {
    axios
      .get(`https://recommendation-eleven-ph.vercel.app/queries/${email}`)
      .then((response) => setQueriesList(response.data))
      .catch((error) => console.error("Error fetching queries:", error));
  }, [email]);

  useEffect(() => {
    const fetchAllQueries = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/addQueries?search=${search || ""}`
        );
      setQueriesList(data)
      } catch (error) {
        console.error("Error fetching search queries:", error);
      }
    };
    fetchAllQueries();
  }, [search]);

  return (
    <div>
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
            <h1 className="mb-5 text-5xl font-bold">
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
          <button onClick={handleGrid1} className="btn bg-green-500">
            1 Column
          </button>
          <button onClick={handleGrid2} className="btn bg-green-500">
            2 Column
          </button>
          <button onClick={handleGrid3} className="btn bg-green-500">
            3 Column
          </button>

          <div className="flex">
            <input
              className="input input-bordered"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Product Name"
            />
            <button className="btn">Search</button>
          </div>
        </div>
        <div className={`grid ${gridCols} gap-4 p-2 sm:p-10`}>
          {queriesList.length > 0 ? (
            queriesList.map((item) => (
              <ListQuery
                key={item._id}
                queriesList={queriesList}
                setQueriesList={setQueriesList}
                item={item}
              ></ListQuery>
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
