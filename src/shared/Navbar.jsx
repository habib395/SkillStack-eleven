import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { GiBrainstorm } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, handleLogOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-base-200 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="w-11/12 mx-auto flex justify-between items-center py-4">
        
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center text-green-500 text-2xl font-semibold">
          <GiBrainstorm className="text-3xl mr-2" />
          SkillStack
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl focus:outline-none"
        >
          {isOpen ? <HiX /> : <HiMenu />} {/* Show X when open, Menu when closed */}
        </button>

        {/* Navbar Links */}
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-base-200 md:flex space-x-6 items-center transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <NavLink to="/" className="block md:inline-block py-2 md:py-0 font-bold ml-4">
            Home
          </NavLink>
          <NavLink to="/queries" className="block md:inline-block py-2 md:py-0 font-bold ml-4">
            All Products
          </NavLink>
          {user?.email && (
            <>
              <NavLink to="/recommendation_me" className="block md:inline-block py-2 md:py-0 font-bold ml-4">
                Recommendations For Me
              </NavLink>
              <NavLink to={`/queries/${user.email}`} className="block md:inline-block py-2 md:py-0 font-bold ml-4">
                My Queries
              </NavLink>
              <NavLink to={`/myRecommendation/${user.email}`} className="block md:inline-block py-2 md:py-0 font-bold ml-4">
                My Recommendation
              </NavLink>
            </>
          )}
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex">
          {user?.email ? (
            <button
              onClick={handleLogOut}
              className="btn btn-sm px-4 py-2 border-2 hover:text-white transition-all duration-300 ease-in-out rounded-md"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="btn btn-sm bg-green-500 text-white hover:bg-green-600">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
