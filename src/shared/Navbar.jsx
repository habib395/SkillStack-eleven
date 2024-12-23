import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { GiBrainstorm } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, handleLogOut } = useContext(AuthContext);
  // console.log(user)
  return (
    <div className="bg-base-200">
      <div className="w-11/12 mx-auto min-h-20 sm:flex flex-cols justify-between items-center">
        <div className="sm:flex sm:font-bold text-center items-center text-xm md:text-3xl text-green-500">
          <div className="text-3xl hidden md:block">
            <GiBrainstorm />
          </div>
          <p className="btn btn-ghost text-xl">SkillStack</p>
        </div>
        <div className="text-center">
          <NavLink
            to="/"
            className="block sm:inline-block py-1 sm:py-0 sm:font-bold ml-4"
          >
            Home
          </NavLink>
          <NavLink
            to="/queries"
            className="block sm:inline-block py-1 sm:py-0 sm:font-bold ml-4"
          >
            Queries
          </NavLink>
          {
            user?.email && (
              <div>
              <NavLink
                to="/recommendation_me"
                className="block sm:inline-block py-1 sm:py-0 sm:font-bold ml-4"
              >
                Recommendations For Me
              </NavLink>
              <NavLink
                to={`/queries/${user?.email}`}
                className="block sm:inline-block py-1 sm:py-0 sm:font-bold ml-4"
              >
                My Queries
              </NavLink>
              <NavLink
                to="/myRecommendation"
                className="block sm:inline-block py-1 sm:py-0 sm:font-bold ml-4"
              >
                My recommendation
              </NavLink>
              </div>
            )
          }
        </div>
        <div className="flex justify-center">
          {user?.email ? (
            <div className="flex items-center justify-between gap-3 py-2">
              <div className="relative group flex gap-3">
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm bg-green-500"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex">
              <NavLink to="/login" className="btn btn-sm bg-green-500 mr-2">
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
