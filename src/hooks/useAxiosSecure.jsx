import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
    baseURL: 'https://recommendation-eleven-ph.vercel.app',
    withCredentials: true
})
const useAxiosSecure = () => {


    const { handleLogOut } = useAuth()
    const navigate = useNavigate()

    useEffect(() =>{
        axiosInstance.interceptors.request.use(
            (config) => {
                // Retrieve the token from localStorage
                const token = localStorage.getItem('token');
                
                // If token exists, add it to the request headers
                if (token) {
                    config.headers['Authorization'] = `${token}`;
                }
                
                return config;
            },
            (error) => {
                // Handle the error
                return Promise.reject(error);
            }
        );

        axiosInstance.interceptors.response.use(response =>{
            return response
        }, error =>{
            console.log('error caught in interceptor', error)

            if(error.status === 401 || error.status === 403){
                console.log('need to logout the user')
                handleLogOut()
                .then(()=>{
                    console.log('logged out user')
                    navigate('/login')
                })
                .catch(error => console.log(error))
            }
            return Promise.reject(error)
        })
    }, [])



    return axiosInstance
};

export default useAxiosSecure;