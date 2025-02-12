import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from './../../AuthProvider/AuthProvider';
import MtRecommendati from "./MtRecommendati";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllRecommendations = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const [items, setItems] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (userEmail) {
      axiosSecure
        .get(`/myRecommendation/${userEmail}`)
        .then((response) => setItems(response.data))
        .catch((error) => console.error("Error fetching equipment:", error));
    }
  }, [userEmail]);

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <div className="w-11/12 mx-auto py-20">
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <table className="table-auto min-w-max w-full border-collapse border border-gray-200 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                <th className="border border-gray-300 dark:border-gray-600">Image</th>
                <th className="border border-gray-300 dark:border-gray-600">Product Name</th>
                <th className="border border-gray-300 dark:border-gray-600">Recommender Name</th>
                <th className="border border-gray-300 dark:border-gray-600">Date</th>
                <th className="border border-gray-300 dark:border-gray-600">Reason</th>
                <th className="border border-gray-300 dark:border-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, idx) => (
                <MtRecommendati
                  key={idx}
                  item={item}
                  items={items}
                  setItems={setItems}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllRecommendations;
