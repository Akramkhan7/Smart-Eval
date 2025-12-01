import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

function HeroSection() {
  return (
    <section className="flex flex-col justify-center items-center text-center py-24 px-6 min-h-screen relative">
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-white text-xl sm:text-2xl md:text-4xl font-bold mb-8 leading-snug">
  Smarter Evaluation for Smarter Learning <br /> 
  Detect. Verify. Evaluate.
</h1>


        <p className="text-white/80 max-w-xl text-xs sm:text-sm mb-6">
  SmartEval checks plagiarism, handwriting, and AI-generated content — simplifying assignment evaluation.
</p>


        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* ---------------- GET STARTED BUTTON ---------------- */}
          <button
            className="

              group flex items-center justify-center cursor-pointer transition-all duration-300 
              px-3 py-2 w-48 rounded-full text-white 
              text-lg sm:text-xl font-thin 
              border border-white/40 bg-transparent
              
              hover:shadow-sm hover:scale-[1.01]
            "
            style={{
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background =
                "linear-gradient(90deg, #8A15A3, #4D97FF)";
              e.currentTarget.style.border = "1px solid transparent";
             
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
              px-8 py-3 w-48 rounded-full cursor-pointer
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
