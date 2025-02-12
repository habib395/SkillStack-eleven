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

    const { handleRegister, manageProfile } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.photo.value;
        const password = form.password.value;

        if (password.length < 6) {
            setError("Password length must be at least 6 characters");
            toast.error("Password must contain at least 6 characters");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter.");
            toast.error("Password must contain at least one lowercase letter");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter.");
            toast.error("Password must contain at least one uppercase letter");
            return;
        }

        handleRegister(email, password)
            .then((res) => {
                manageProfile(name, image);
                toast.success("Registration successful");
                navigate(location.state?.from || "/");
            })
            .catch((err) => {
                setError(err.message);
                toast.error(`Registration failed: ${err.message}`);
            });
    }

    const handleGoogleLoginTwo = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                navigate(location.state?.from || "/");
                toast.success(`Welcome ${result.user.displayName}! Successfully logged in.`);
            })
            .catch((error) => {
                toast.error(`Google Login Failed: ${error.message}`);
            });
    }

    return (
        <div className="dark:bg-gray-900 dark:text-white">
            <form
                onSubmit={handleSubmit}
                className="card-body bg-base-200 dark:bg-gray-900 w-11/12 mx-auto min-h-screen md:w-1/2 rounded-lg mt-10 sm:pt-20"
            >
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black dark:text-white">Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black dark:text-white">Email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        className="input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black dark:text-white">Photo URL</span>
                    </label>
                    <input
                        type="url"
                        name="photo"
                        placeholder="Photo URL"
                        className="input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        required
                    />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text text-black dark:text-white">Password</span>
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="password"
                        className="input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn btn-sm absolute right-2 top-11"
                    >
                        {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover text-blue-500 dark:text-blue-300">
                            Forgot password?
                        </a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white">
                        Register
                    </button>
                </div>
                <button
                    type="button"
                    className="btn btn-active mt-4 bg-white text-black dark:bg-gray-700 dark:text-white"
                    onClick={handleGoogleLoginTwo}
                >
                    <FaGoogle /> Continue With Google
                </button>
                <p className="text-black dark:text-white">
                    Already registered?{" "}
                    <NavLink to="/login" className="text-blue-500 dark:text-blue-300">
                        Login
                    </NavLink>
                </p>
                {error && <p className="text-red-500">{error}</p>}
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;
