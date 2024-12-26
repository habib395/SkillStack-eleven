import React from 'react';

const MtRecommendation = ({ item }) => {
    return (
        <div
        key={item._id}
        className="grid gap-2 items-center w-10/12 mx-auto py-5"
      >
        <div className="border-2 rounded-lg p-2">
          <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <figure>
              <img
                src={item.UserImage}
                className="w-12 h-12 rounded-full"
                alt={item.ItemName}
              />
            </figure>
            <h2>{item.reProductName}</h2>
          <p>{item.reCurrentDate}</p>
          </div>
          <div>
            <button onClick={() => handleDelete(_id)} className="btn bg-green-500">X</button>
          </div>
          </div>
          <div>
            <p className="text-center p-2">{item.recommendationReason}</p>
          </div>
        </div>
      </div>
    );
};

export default MtRecommendation;