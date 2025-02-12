import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RecommendationMe = () => {
  const items = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const [queriesList, setQueriesList] = useState([]);

  useEffect(() => {
    if (userEmail) {
      axiosSecure
        .get(`/myRecommendation/${userEmail}`)
        .then((response) => setQueriesList(response.data))
        .catch((error) => console.error("Error fetching queries:", error));
    }
  }, [userEmail]);

  if (!items) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <div className="w-11/12 mx-auto py-20">
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <table className="table-auto min-w-max w-full border-collapse border border-gray-200 dark:border-gray-600 mt-2">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  Recommender Name
                </th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  Product Name
                </th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  Date
                </th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  Reason
                </th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">
                  Image
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(items) &&
                items
                  .filter((item) => item.reUserEmail === userEmail)
                  .map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 text-sm sm:text-base text-gray-700 dark:text-gray-300"
                    >
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        {item.recommenderName}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        {item.recommendationProductName}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        {item.readableDate}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        {item.recommendationReason}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 flex justify-center">
                        <img
                          src={item.recommendationPhotoURL}
                          className="w-12 h-12 rounded-full object-cover"
                          alt={item.recommendationProductName}
                        />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecommendationMe;
