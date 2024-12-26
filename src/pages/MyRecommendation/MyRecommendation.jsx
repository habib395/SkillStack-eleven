import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from './../../AuthProvider/AuthProvider';
import MtRecommendati from "./MtRecommendati";

const AllRecommendations = () => {
    const {user, } = useContext(AuthContext)
    const userEmail = user?.email
  const [items, setItems] = useState([]);
  console.log(items)

  useEffect(()=> {
   if(userEmail){
    fetch(`http://localhost:5000/myRecommendation/${userEmail}`)
    .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching equipment:", error));
   }
  }, [userEmail])
  return (
    <>
      <div>
        {items?.map((item, idx) => (
         <MtRecommendati key={idx} item={item} items={items}></MtRecommendati>
        ))}
      </div>
    </>
  );
};

export default AllRecommendations;
