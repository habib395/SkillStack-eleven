import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from './../../AuthProvider/AuthProvider';
import MtRecommendati from "./MtRecommendati";

const AllRecommendations = () => {
    const {user, setRecommendationCount} = useContext(AuthContext)
    // console.log(setRecommendationCount)
    const userEmail = user.user.email
  const [items, setItems] = useState([]);
//   console.log(user)

  useEffect(()=> {
    fetch(`http://localhost:5000/myRecommendation/${userEmail}`)
    .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching equipment:", error));
  }, [userEmail])
  return (
    <>
      <div>
        <h2>This is my Recommendation</h2>
        {items?.map((item, idx) => (
         <MtRecommendati key={idx} item={item} items={items}></MtRecommendati>
        ))}
      </div>
    </>
  );
};

export default AllRecommendations;
