import React from "react";
import { useLoaderData } from "react-router-dom";

const AllRecommendations = () => {
  const items = useLoaderData();
  
  return (
    <div className="pt-20 dark:bg-gray-900 dark:text-white">
      {items.map((item) => (
        <div
          key={item._id}
          className="grid gap-2 items-center w-10/12 mx-auto py-5"
        >
          <div className="border-2 rounded-lg p-2 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <figure>
                <img
                  src={item.recommendationPhotoURL}
                  className="w-12 h-12 rounded-full"
                  alt={item.ItemName}
                />
              </figure>
              <h2 className="dark:text-white">{item.recommenderName}</h2>
            </div>
            <p className="dark:text-gray-400">{item.readableDate}</p>
            <div>
              <p className="text-center p-2 border rounded-lg mt-3 dark:border-gray-600 dark:text-gray-300">
                {item.recommendationReason}
              </p>
              <p className="p-2 dark:text-gray-200">{item.recommendationProductName}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRecommendations;
