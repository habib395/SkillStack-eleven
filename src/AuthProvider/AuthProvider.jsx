import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';


export const AuthContext = createContext()
const AuthProvider = ({routes}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleRegister = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const handleLogin = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const handleLogOut =()=>{
        signOut(auth)
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
        updateUserProfile
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,
        (currentUser)=>{
            if(currentUser){
                setUser(currentUser)
            }else{
                setUser(null)
            }
            setLoading(false)
            return ()=>{
                unsubscribe()
            }
        })
    }, [])

    
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {
                    routes
                }
            </AuthContext.Provider>
            
        </div>
    );
};

export default AuthProvider;