import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import MtRecommendation from './MtRecommendation';

const RecommendationMe = () => {
    const { email } = useParams()
    // console.log(email)
    const { user } = useContext(AuthContext)
    const userEmail = user?.email
    console.log(userEmail)
      const [queriesList, setQueriesList] = useState([])
    
            useEffect(() =>{
                if(userEmail){
                    fetch(`http://localhost:5000/myRecommendation/${userEmail}`)
                .then((res) => res.json())
                .then((data) => setQueriesList(data))
                .catch((error) => console.error("Error fetching queries:", error))
                }
            }, [email])
    return (
        <>
        <div>
          <h2>This is my Recommendation</h2>
          {queriesList?.map((item, idx) => (
           <MtRecommendation key={idx} item={item}></MtRecommendation>
          ))}
        </div>
      </>
    );
};

export default RecommendationMe;