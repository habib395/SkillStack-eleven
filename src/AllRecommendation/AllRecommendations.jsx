import React from "react";
import { useLoaderData } from "react-router-dom";

const AllRecommendations = () => {
  const items = useLoaderData();
  // console.log(items);
  return (
    <>
      <div>
        <h2>All recommendation page start here</h2>
        {items.map((item) => (
          <div
            key={item._id}
            className="grid gap-2 items-center w-10/12 mx-auto py-5"
          >
            <div className="border-2 rounded-lg p-2">
              <div className="flex items-center gap-2">
                <figure>
                  <img
                    src={item.UserImage}
                    className="w-12 h-12 rounded-full"
                    alt={item.ItemName}
                  />
                </figure>
                <h2>{item.recommenderName}</h2>
              </div>
              <p>{item.readableDate}</p>
              <div>
                <p className="text-center p-2">{item.recommendationReason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllRecommendations;
