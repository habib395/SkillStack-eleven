import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

const RecommendationMe = () => {
  const items = useLoaderData();
  // console.log(items)
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  // console.log(userEmail)

  const [queriesList, setQueriesList] = useState([]);

  useEffect(() => {
    if (userEmail) {
        axios
            .get(`https://recommendation-eleven-ph.vercel.app/myRecommendation/${userEmail}`)
            .then((response) => setQueriesList(response.data))
            .catch((error) => console.error("Error fetching queries:", error));
    }
}, [userEmail]);


  if (!items) {
    return <p>Loading...</p>;
  }

  return (
    <div className='w-11/12 mx-auto py-5'>
      <table className='table-auto border-collapse border border-gray-50'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-300 p-2'>Recommender Name</th>
            <th className='border border-gray-300 p-2'>Product Name</th>
            <th className='border border-gray-300 p-2'>Date</th>
            <th className='border border-gray-300 p-2'>Reason</th>
            <th className='border border-gray-300 p-2'>Image</th>
          </tr>
        </thead>
        <tbody>

        {Array.isArray(items) &&
          items
            .filter((item) => item.reUserEmail == userEmail)
            .map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                  <td className='border border-gray-300 p-2'>{item.recommenderName}</td>
                <td className='border border-gray-300 p-2'>{item.recommendationProductName}</td>
                <td className='border border-gray-300 p-2'>{item.readableDate}</td>
                <td className='border border-gray-300 p-2'>{item.recommendationReason}</td>
                <td className='border border-gray-300 p-2'>
                <figure>
                  <img
                    src={item.recommendationPhotoURL}
                    className="w-12 h-12 rounded-full"
                    alt={item.ItemName}
                  />
                </figure>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
};

export default RecommendationMe;
