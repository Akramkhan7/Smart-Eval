import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom"; // FIX 1: useNavigate is the hook, not Navigate
import useScrollDirection from "../../../Hooks/useScrollDirection";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const LoginHeader = () => {
  const scrollDirection = useScrollDirection();
  const { user } = useContext(AuthContext);

  // FIX 2: useNavigate must be called inside the component, not outside
  const navigate = useNavigate();

  const scrollClass =
    scrollDirection === "down" ? "-translate-y-full" : "translate-y-0";

  return (
    <header
      className={`
      fixed top-0 left-0 w-full z-50
      bg-transparent
      flex items-center justify-between
      px-10 py-6
      transition-transform duration-600 ease-in-out  
      ${scrollClass}                               
    `}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-md"></div>
        <h1 className="text-white text-xl font-semibold">SmartEval</h1>
      </div>

      {/* Menu */}
      <nav className="flex items-center gap-8 px-8 ml-145 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl">
        <Link
          to="/"
          className="text-white text-sm hover:text-gray-900 transition duration-150 cursor-pointer"
        >
          Home
        </Link>

        <Link
          to={`/${user.role}/Dashboard`}
          className="flex items-center gap-1 text-white"
        >
          <span>DashBoard</span>
        </Link>
      </nav>

      {/* Button */}
      {user ? (
        <div className="flex  items-center justify-center gap-2 text-white">
          <FaUserCircle size={20} />
          <span>{user.name}</span>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")} // FIX 3: useNavigate hook works like this
          className="bg-transparent text-white font-semibold px-8 py-3 rounded-full border border-white hover:bg-white hover:text-black transition duration-200"
        >
          GET STARTED
        </button>
      )}
    </header>
  );
};

export default LoginHeader;
