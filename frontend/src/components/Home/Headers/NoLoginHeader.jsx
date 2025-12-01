import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // FIX 1: useNavigate is the hook, not Navigate
import useScrollDirection from "../../../Hooks/useScrollDirection";

const Header = () => {
  const scrollDirection = useScrollDirection();

  // FIX 2: useNavigate must be called inside the component, not outside
  const navigate = useNavigate(); 

  const scrollClass = scrollDirection === 'down' 
    ? '-translate-y-full'
    : 'translate-y-0';

  return (
<header className={`
      fixed top-0 left-0 w-full z-50
      bg-transparent
      flex items-center justify-between
      px-10 py-6
      transition-transform duration-600 ease-in-out  
      ${scrollClass}                               
    `}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-md"></div>
        <h1 className="text-white text-xl font-semibold">SmartEval</h1>
      </div>

      {/* Menu */}
      <nav className="flex items-center gap-15 px-13 ml-145 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl">
        <a
  className="text-white text-sm cursor-pointer transition-all duration-300 
             hover:text-transparent hover:bg-clip-text 
             hover:bg-linear-to-r hover:from-[#8A15A3] hover:to-[#4D97FF]"
>
  Features
</a>

<a
  className="text-white text-sm cursor-pointer transition-all duration-300 
             hover:text-transparent hover:bg-clip-text 
             hover:bg-linear-to-r hover:from-[#8A15A3] hover:to-[#4D97FF]"
>
  Pricing
</a>

<a
  className="text-white text-sm cursor-pointer transition-all duration-300 
             hover:text-transparent hover:bg-clip-text 
             hover:bg-linear-to-r hover:from-[#8A15A3] hover:to-[#4D97FF]"
>
  FAQ
</a>


        
      </nav>

      {/* Button */}
      <button
        onClick={() => navigate("/login")} // FIX 3: useNavigate hook works like this
        className="bg-transparent cursor-pointer text-white font-semibold px-8 py-3 rounded-full border border-white hover:bg-white hover:text-black transition-all duration-300 "
      >
        GET STARTED
      </button>
    </header>
  );
};

export default Header;
