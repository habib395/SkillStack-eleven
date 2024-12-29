import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGoogle, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import auth from "../firebase/firebase.config";

const Register = () => {

    const { handleRegister, manageProfile } = useContext(AuthContext)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()


    const handleSubmit = (e) =>{
        e.preventDefault()
        const form = e.target 
        const name = form.name.value
        const email = form.email.value
        const image = form.photo.value
        const password = form.password.value
        // console.log(name, email, password)

        if(password.length < 6){
            setError("Password length must be at least 6 characters")
            toast.error("Password must contain must be at least 6 characters")
            return
        }
        if(!/[a-z]/.test(password)){
            setError("Password must contain at least one lowercase letter.")
            toast.error("Password must contain at least one lowercase letter")
            return
        }
        if(!/[A-Z]/.test(password)){
            setError("Password must contain at least one uppercase letter.")
            toast.error("Password must contain at least one uppercase letter")
            return
        }

        handleRegister(email, password)
        .then((res)=>{
            manageProfile(name, image)
        toast.success("Registration successful")
        navigate(location.state?.form || "/")
        })
        .catch((err)=>{
            setError(err.message)
            toast.error(`Registration failed: ${err.message}`)
        })

    }

    const handleGoogleLoginTwo = () =>{
        signInWithPopup(auth, googleProvider)
        .then((result)=>{
            navigate(location.state?.from || "/")
            toast.success(`Welcome ${result.user.displayName}! Successfully logged in.`)
        })
        .catch((error) =>{
            toast.error(`Google Login Failed: ${error.message}`)
        })
    }
  return (
    <>
      <form onSubmit={handleSubmit} className="card-body bg-base-300 w-11/12 mx-auto min-h-screen md:w-1/2 rounded-lg my-10">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="url"
            name="photo"
            placeholder="Photo URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered" name="password" required></input>
            <button type="button" onClick={()=> setShowPassword(!showPassword)} className="btn btn-sm absolute right-2 top-11">{
                    showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye></MdOutlineRemoveRedEye>
                    }</button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button onClick={handleRegister} className="btn btn-green-500 mt-4">Register</button>
        </div>
        <button type="button" className="btn btn-active mt-4" onClick={handleGoogleLoginTwo}>
          <FaGoogle />Continue With Google
          </button>
          <p>Already Register?{""}
            <NavLink className="text-green-500" to='/login'>Login</NavLink>
          </p>
          {
            error && <p className="text-red-500">{error}</p>
          }
      </form>
      <ToastContainer/>
    </>
  );
};

export default Register;
