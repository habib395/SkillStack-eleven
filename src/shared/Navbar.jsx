import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { GiBrainstorm } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const { user, handleLogOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-300">
      <div className="w-11/12 mx-auto flex justify-between items-center gap-2 py-4">
        {/* Logo Section */}
        <NavLink
          to="/"
          className="flex items-center text-blue-500 dark:text-blue-400 sm:text-2xl font-semibold"
        >
          <GiBrainstorm className="sm:text-3xl mr-2" />
          SkillStack
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl focus:outline-none text-blue-500 dark:text-blue-400"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Navigation Links */}
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-gray-800 md:flex space-x-6 items-center transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <NavLink
            to="/"
            className="block md:inline-block py-2 md:py-0 hover:text-blue-400 dark:hover:text-blue-300 font-semibold ml-4 text-sm"
          >
            Home
          </NavLink>
          <NavLink
            to="/queries"
            className="block md:inline-block py-2 md:py-0 hover:text-blue-400 dark:hover:text-blue-300 font-semibold ml-4 text-sm"
          >
            All Products
          </NavLink>
          {user?.email && (
            <>
              <NavLink
                to="/recommendation_me"
                className="block md:inline-block py-2 md:py-0 hover:text-blue-400 dark:hover:text-blue-300 font-semibold ml-4 text-sm"
              >
                Recommendations For Me
              </NavLink>
              <NavLink
                to={`/queries/${user.email}`}
                className="block md:inline-block py-2 md:py-0 hover:text-blue-400 dark:hover:text-blue-300 font-semibold ml-4 text-sm"
              >
                My Queries
              </NavLink>
              <NavLink
                to={`/myRecommendation/${user.email}`}
                className="block md:inline-block py-2 md:py-0 hover:text-blue-400 dark:hover:text-blue-300 font-semibold ml-4 text-sm"
              >
                My Recommendation
              </NavLink>
            </>
          )}
        </div>

        {/* Authentication Buttons */}
        <div className="flex py-2 gap-2">
          {user?.email ? (
            <button
              onClick={handleLogOut}
              className="btn btn-sm px-4 py-2 border-2 bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 transition-all duration-300 ease-in-out rounded-md text-white text-sm"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="btn btn-sm bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600 dark:hover:bg-blue-800"
            >
              Login
            </NavLink>
          )}
          <div className="items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 shadow-md transition"
            >
              {darkMode ? (
                <BsSun className="text-blue-400" />
              ) : (
                <BsMoon className="text-gray-800 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
