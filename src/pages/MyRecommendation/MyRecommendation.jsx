import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from './../../AuthProvider/AuthProvider';
import MtRecommendati from "./MtRecommendati";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllRecommendations = () => {
    const {user} = useContext(AuthContext)
    const userEmail = user?.email
  const [items, setItems] = useState([]);
  // console.log(items)
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    if (userEmail) {
        axiosSecure
           .get(`/myRecommendation/${userEmail}`)
           .then((response) => setItems(response.data))
           .catch((error) => console.error("Error fetching equipment:", error));
    }
}, [userEmail]);

  return (
    <>
      <div className="w-11/12 mx-auto my-20">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto min-w-max w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300">Image</th>
              <th className="border border-gray-300">Product Name</th>
              <th className="border border-gray-300">Recommender Name</th>
              <th className="border border-gray-300">Date</th>
              <th className="border border-gray-300">Reason</th>
              <th className="border border-gray-300">Action</th>

            </tr>
          </thead>
          <tbody>
        {items?.map((item, idx) => (
         <MtRecommendati key={idx} item={item} items={items} setItems={setItems}></MtRecommendati>
        ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default AllRecommendations;
