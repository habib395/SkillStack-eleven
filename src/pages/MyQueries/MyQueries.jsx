import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListQuery from "../ListQueries/ListQuery";

const MyQueries = () => {
  const { email } = useParams()
  // console.log(email)
    const [queriesList, setQueriesList] = useState([])

    useEffect(() =>{
            fetch(`http://localhost:5000/queries/${email}`)
            .then((res) => res.json())
            .then((data) => setQueriesList(data))
            .catch((error) => console.error("Error fetching queries:", error))
        }, [email])
  return (
    <div>
      {/* Add Query Banner section */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/ScxNXdB/banner.png)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Empowering Your Product Queries</h1>
            <Link to='/addQueries'>
            <button className="btn btn-primary">Add Queries</button>
            </Link>
          </div>
        </div>
      </div>

    
            <ul>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 sm:p-10">
                {
                    queriesList.length > 0 ? (
                        queriesList.map((item) => (
                            <ListQuery key={item._id} queriesList={queriesList} setQueriesList={setQueriesList} item={item}></ListQuery>
                        ))
                    ) : (
                        <p>No product found for this user.</p>
                    )
                }
                </div>
            </ul>
    </div>
  );
};

export default MyQueries;
