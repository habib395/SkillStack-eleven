import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from './../../AuthProvider/AuthProvider';
import MtRecommendati from "./MtRecommendati";
import axios from "axios";

const AllRecommendations = () => {
    const {user, } = useContext(AuthContext)
    const userEmail = user?.email
  const [items, setItems] = useState([]);
  // console.log(items)


  useEffect(() => {
    if (userEmail) {
        axios
            .get(`https://recommendation-eleven-ph.vercel.app/myRecommendation/${userEmail}`)
            .then((response) => setItems(response.data))
            .catch((error) => console.error("Error fetching equipment:", error));
    }
}, [userEmail]);

  return (
    <>
      <div>
        <div className="w-10/12 mx-auto py-5">
        <table className="table-auto border-collapse  border border-gray-300">
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
