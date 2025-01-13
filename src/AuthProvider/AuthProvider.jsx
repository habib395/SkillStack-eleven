import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import axios from 'axios';


export const AuthContext = createContext()
const AuthProvider = ({routes}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [recommendation, setRecommendation] = useState([]);
    const [recommendationCount, setRecommendationCount] = useState(0);

    const handleRegister = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const handleLogin = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const handleLogOut =()=>{
        return signOut(auth)
    }
    const manageProfile = (name, image)=>{
        updateProfile(auth.currentUser,{
            displayName:name,
            photoURL: image,
        })
    }
    const updateUserProfile = (updateData)=>{
        return updateProfile(auth.currentUser,
            updateData
        )
    }

    const authInfo = {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogOut,
        manageProfile,
        updateUserProfile,
        recommendationCount,
        setRecommendationCount,
        recommendation,
        setRecommendation

    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,
        (currentUser)=>{
            if(currentUser){
                setUser(currentUser)
            }else{
                setUser(null)
            }
            console.log('state capture', currentUser?.email)
            if(currentUser?.email){
                const user = {email: currentUser.email}

                axios.post('https://recommendation-eleven-ph.vercel.app/jwt', user, { withCredentials: true    
                })
                .then(res => {
                    console.log('login token', res.data)
                    localStorage.setItem('token', res.data.token)
                    setLoading(false)
                })
            }
            else{
                axios.post('https://recommendation-eleven-ph.vercel.app/logout', {}, {
                    withCredentials: true
                })
                .then(res =>{
                     console.log('logout', res.data)
                    setLoading(false)
                    })
            }
            setLoading(false)
            return ()=>{
                unsubscribe()
            } 
        })
    }, [])

    
    return (
            <AuthContext.Provider value={authInfo}>
                {
                    routes
                }
            </AuthContext.Provider>
    );
};

export default AuthProvider;