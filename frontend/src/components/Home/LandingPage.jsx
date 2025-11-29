import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

function HeroSection() {
  return (
    <section className="flex flex-col justify-center items-center text-center py-24 px-6 min-h-screen relative">
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-12 leading-snug">
          Waves are cool! <br /> Even cooler with lines!
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* ---------------- GET STARTED BUTTON ---------------- */}
          <button
            className="
              group flex items-center justify-center 
              px-5 py-2 w-48 rounded-full text-white 
              text-lg sm:text-xl font-thin 
              border border-white/40 bg-transparent
              transition-all duration-300 
              shadow-none hover:shadow-lg hover:scale-[1.02]
            "
            style={{
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background =
                "linear-gradient(90deg, #8A15A3, #4D97FF)";
              e.currentTarget.style.border = "1px solid transparent";
              e.currentTarget.style.boxShadow =
                "0 0 10px rgba(138, 21, 163, 0.7), 0 0 20px rgba(77, 151, 255, 0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.4)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get Started
            <IoIosArrowRoundForward
              size={35}
              className="ml-2 transition-all duration-300 group-hover:rotate-45"
            />
          </button>

          {/* ---------------- LEARN MORE BUTTON ---------------- */}
          <button
            className="
              px-8 py-3 w-48 rounded-full
              text-white text-lg sm:text-xl font-thin 
              transition-all duration-300 hover:scale-[1.01]
            "
            style={{
              backgroundColor: "#392C4E",
            }}
          >
            Learn More
          </button>
        </div>
      </div>

     
    </section>
  );
}

export default HeroSection;
