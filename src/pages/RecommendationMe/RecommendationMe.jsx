import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

const RecommendationMe = () => {
  const items = useLoaderData();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const [queriesList, setQueriesList] = useState([]);

  // useEffect(() => {
  //   if (userEmail) {
  //     fetch(`http://localhost:5000/myRecommendation/${userEmail}`)
  //       .then((res) => res.json())
  //       .then((data) => setQueriesList(data))
  //       .catch((error) => console.error("Error fetching queries:", error));
  //   }
  // }, [userEmail]);
  useEffect(() => {
    if (userEmail) {
        axios
            .get(`http://localhost:5000/myRecommendation/${userEmail}`)
            .then((response) => setQueriesList(response.data))
            .catch((error) => console.error("Error fetching queries:", error));
    }
}, [userEmail]);


  if (!items) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>This is my Recommendation</h2>
      <div>
        {Array.isArray(items) &&
          items
            .filter((item) => item.recommenderEmail !== userEmail)
            .map((item) => (
              <div key={item._id} className="grid gap-2 items-center w-10/12 mx-auto py-5">
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
                    <p className="p-2">{item.recommendationProductName}</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default RecommendationMe;
