import React from "react";
import { Download, BarChart, Zap } from "lucide-react";
import FeatureSection from "./FeatureBlocks/FeatureSection";
import { IoIosArrowRoundForward } from "react-icons/io";
import ProfessionalBusiness from "./FeatureBlocks/ProfessionalBusiness";
import HeroSection3 from "../Steps";

const waveBackgroundStyle = {
  backgroundColor: "#1c1c1c",
  overflow: "hidden",
  position: "relative",
  backgroundImage: `
    radial-gradient(circle at 100% 100%, #1e1e1e 20%, transparent 40%),
    linear-gradient(270deg, rgba(77, 151, 255, 0.5) 0%, rgba(138, 21, 163, 0.5) 100%),
    linear-gradient(180deg, rgba(77, 151, 255, 0.2) 0%, rgba(138, 21, 163, 0.2) 100%)
  `,
  backgroundBlendMode: "overlay, normal, normal",
  "--wave-color-start": "#8A15A3",
  "--wave-color-end": "#4D97FF",
};

export default function Features() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-8 font-sans">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-16 text-white">
        <h1 className="text-4xl sm:text-5xl font-thin leading-tight">
          Powerful AI Tools for Modern Academic Evaluation <br className="hidden sm:block" />
          All in One Smart Workspace
        </h1>
      </header>

      {/* GRID */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-18">
          {/* CARD A — SPECIAL CARD */}
          <div
            className="relative flex flex-col justify-between p-6 md:p-8 rounded-2xl shadow-xl 
               border border-gray-700/50 h-[480px] w-[560px] 
               transition-all duration-300 hover:shadow-2xl hover:border-indigo-500/50"
            style={waveBackgroundStyle}
          >
            {/* Background Layer */}
            <div
              className="absolute inset-0 z-0 opacity-70"
              style={{
                backgroundImage:
                  "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHBhdGggZD0iTTAgNTAgQzI1IDAgNzUgMTAwIDEwMCA1MCIvPjwvc3ZnPg==)",
                backgroundSize: "150% 150%",
                backgroundRepeat: "repeat",
                boxShadow:
                  "inset 0 0 100px rgba(77, 151, 255, 0.2), inset 0 0 50px rgba(138, 21, 163, 0.2)",
                transform: "scale(1.5) rotate(15deg) translateY(10%)",
                filter: "blur(30px) opacity(0.8)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 text-white flex flex-col h-full">
              <div className="text-5xl font-extrabold mb-8">A</div>

              <div className="flex flex-col grow">
                <div className="text-lg font-bold uppercase text-gray-200 mb-2 tracking-wider">
                  AI-Powered Answer Evaluation
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Instantly analyze handwritten or typed student submissions with AI-driven 
                  accuracy. SmartEval evaluates content, correctness, structure, and writing 
                  clarity — delivering results in seconds.
                </p>
              </div>

              <div className="mt-8">
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full 
                     transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #4D97FF, #8A15A3)",
                    boxShadow: "0 4px 15px rgba(77, 151, 255, 0.4)",
                  }}
                >
                  <Download size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* CARD B */}
          <div
            className="relative flex flex-col justify-between p-6 md:p-8 rounded-2xl shadow-xl 
                       border border-gray-700/50 h-[480px] w-[400px] bg-[#1c1c1c]
                       transition-all duration-300 hover:shadow-2xl hover:border-indigo-500/50 ml-30"
          >
            <div className="relative z-10 text-white flex flex-col h-full">
              <div className="text-5xl font-extrabold mb-8">B</div>

              <div className="flex flex-col grow">
                <div className="text-lg font-bold uppercase text-gray-200 mb-2 tracking-wider">
                 PERFORMANCE DASHBOARDS
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                 Visualize student progress with automatic charts and insights. Track learning 
  gaps, compare class performance, and generate reports instantly.
                </p>
              </div>

              <div className="mt-8">
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full 
                             transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #4D97FF, #8A15A3)",
                    boxShadow: "0 4px 15px rgba(77, 151, 255, 0.4)",
                  }}
                >
                  <BarChart size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* CARD C */}
          <div
            className="relative flex flex-col justify-between p-6 md:p-8 rounded-2xl shadow-xl 
                       border border-gray-700/50 h-[480px] w-full bg-[#1c1c1c]
                       transition-all duration-300 hover:shadow-2xl hover:border-indigo-500/50 ml-20"
          >
            <div className="relative z-10 text-white flex flex-col h-full">
              <div className="text-5xl font-extrabold mb-8">C</div>

              <div className="flex flex-col grow">
                <div className="text-lg font-bold uppercase text-gray-200 mb-2 tracking-wider">
                    PLAGIARISM & AI CONTENT CHECK

                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                 Detect copied, AI-generated, or rephrased answers with high accuracy. 
  SmartEval ensures academic honesty by comparing submissions across 
  databases and AI patterns.
                </p>
              </div>

              <div className="mt-8">
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full 
                             transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #4D97FF, #8A15A3)",
                    boxShadow: "0 4px 15px rgba(77, 151, 255, 0.4)",
                  }}
                >
                  <Zap size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          <div
            className="relative flex flex-col justify-between p-6 md:p-8 rounded-2xl shadow-xl 
                       border border-gray-700/50 h-[480px] w-[700px] 
                       transition-all duration-300 hover:shadow-2xl hover:border-indigo-500/50 "
            style={waveBackgroundStyle}
          >
            <div
              className="absolute inset-0 z-0 opacity-70"
              style={{
                backgroundImage:
                  "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHBhdGggZD0iTTAgNTAgQzI1IDAgNzUgMTAwIDEwMCA1MCIvPjwvc3ZnPg==)",
                backgroundSize: "150% 150%",
                backgroundRepeat: "repeat",
                boxShadow:
                  "inset 0 0 100px rgba(77, 151, 255, 0.2), inset 0 0 50px rgba(138, 21, 163, 0.2)",
                transform: "scale(1.5) rotate(15deg) translateY(10%)",
                filter: "blur(30px) opacity(0.8)",
              }}
            />

            <div className="relative z-10 text-white flex flex-col h-full">
              <div className="text-5xl font-extrabold mb-8">D</div>

              <div className="flex flex-col grow">
                <div className="text-lg font-bold uppercase text-gray-200 mb-2 tracking-wider">
  HANDWRITING VERIFICATION
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                 Verify whether the uploaded answers are written by the same student. 
  Our handwriting recognition model analyzes patterns and prevents 
  impersonation or outsourced writing.
                </p>
              </div>

              <div className="mt-8">
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full 
                             transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #4D97FF, #8A15A3)",
                    boxShadow: "0 4px 15px rgba(77, 151, 255, 0.4)",
                  }}
                >
                  <Download size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          <div
            className="relative flex flex-col justify-between p-6 md:p-8 rounded-2xl shadow-xl 
                       border border-gray-700/50 h-[480px] w-[650px] 
                       transition-all duration-300 hover:shadow-2xl hover:border-indigo-500/50 ml-65"
            style={waveBackgroundStyle}
          >
            <div
              className="absolute inset-0 z-0 opacity-70"
              style={{
                backgroundImage:
                  "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHBhdGggZD0iTTAgNTAgQzI1IDAgNzUgMTAwIDEwMCA1MCIvPjwvc3ZnPg==)",
                backgroundSize: "150% 150%",
                backgroundRepeat: "repeat",
                boxShadow:
                  "inset 0 0 100px rgba(77, 151, 255, 0.2), inset 0 0 50px rgba(138, 21, 163, 0.2)",
                transform: "scale(1.5) rotate(15deg) translateY(10%)",
                filter: "blur(30px) opacity(0.8)",
              }}
            />

            <div className="relative z-10 text-white flex flex-col h-full">
              <div className="text-5xl font-extrabold mb-8">E</div>

              <div className="flex flex-col grow">
                <div className="text-lg font-bold uppercase text-gray-200 mb-2 tracking-wider">
                  SMART GRADING AUTOMATION
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Generate accurate marks, feedback, and evaluation summaries 
  automatically. Reduce teacher workload and speed up the checking process 
  by 10x.
                </p>
              </div>

              <div className="mt-8">
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full 
                             transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #4D97FF, #8A15A3)",
                    boxShadow: "0 4px 15px rgba(77, 151, 255, 0.4)",
                  }}
                >
                  <Download size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <FeatureSection />
        {/* Read More */}
        <div className="w-full flex justify-end mb-10 mr-5">
          <button
            className="
      group flex items-center justify-center 
      px-5 py-2 w-48 rounded-full text-white 
      text-lg sm:text-xl font-thin 
      border border-white/40 bg-transparent cursor-pointer
      transition-all duration-300 
      shadow-none hover:shadow-lg hover:scale-[1.02]
    "
            style={{
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(90deg, #8A15A3, #4D97FF)";
              e.currentTarget.style.border = "1px solid transparent";
              
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.4)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Read More
            <IoIosArrowRoundForward
              size={35}
              className="ml-2 transition-all duration-300 group-hover:rotate-45"
            />
          </button>
        </div>
        {/* Read More */}

        <ProfessionalBusiness />
      </main>
    </div>
  );
}
