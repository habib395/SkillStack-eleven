import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import auth from "../firebase/firebase.config";
const Login = () => {
    const { handleLogin } = useContext(AuthContext)
    const [error, setError] = useState("")
    const [email, setEmail]= useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const password = e.target.password.value 
        handleLogin(email, password)
        .then((res)=>{
            navigate(location.state?.from || "/")
        })
        .catch((err)=>{
            setError(err.message)
            toast.error("Invalid Email or Password")
        })
    }
    const handleGoogleLoginTwo = () =>{
        signInWithPopup(auth, googleProvider)
        .then((result)=>{
            navigate(location.state?.from || "/")
            toast.success(`Welcome ${result.user.display}! Successfully Logged In`)
        })
        .catch((error)=>{
            toast.error(`Google Login Failed: ${error.message}`)
        })
    }
  return (
    <div>
      <form onSubmit={handleSubmit} className="card-body bg-base-200 md:w-1/2 min-h-screen w-11/12 mx-auto rounded-lg my-10 sm:mt-20">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <NavLink to={`/forget?email=${encodeURIComponent(email)}`} className="label-text-alt link link-hover">
              Forgot password?
            </NavLink>
          </label>
          <div className="form-control mt-6">
                <button type="submit" className="btn bg-blue-500">Login</button>
            </div>
        </div>
        <button className="btn btn-active mt-4" onClick={handleGoogleLoginTwo}>
                <FaGoogle />Continue With Google
            </button>
            {error && <p className="text-red-500">Invalid Email or Password</p>}
            <p>
                New to the website?{" "}
                <NavLink to="/register" className="text-blue-500">Register</NavLink>
            </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
