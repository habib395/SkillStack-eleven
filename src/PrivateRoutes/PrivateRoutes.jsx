import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { loading, user} = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <h1 className='text-center my-10'><span className='loading loading-ring loading-lg'></span></h1>   
    }
    if(!user){
        return <Navigate state={{from:location.pathname}} to="/login"></Navigate>
        }
    return children
};

export default PrivateRoutes;