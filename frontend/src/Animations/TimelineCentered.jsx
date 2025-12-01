import React, { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TimelineCentered = () => {
  const timelineRef = useRef(null);

  // Memoize steps to prevent unnecessary re-renders
  const steps = useMemo(
  () => [
    {
      title: "Student Login & Upload",
      description:
        "Students log in and upload handwritten or typed assignments in image or PDF format.",
    },
    {
      title: "AI Plagiarism Check",
      description:
        "AI scans submissions across class data and online sources to detect plagiarism or AI-generated text.",
    },
    {
      title: "Handwriting Verification",
      description:
        "SmartEval analyzes handwriting patterns to confirm the student’s identity and prevent impersonation.",
    },
    {
      title: "AI Evaluation & Scores",
      description:
        "The system checks accuracy, clarity, and structure, generating AI-suggested scores instantly.",
    },
    {
      title: "Teacher Review",
      description:
        "Teachers review AI findings, add feedback, adjust marks, and finalize grades.",
    },
    {
      title: "Reports & Secure Storage",
      description:
        "Plagiarism results, handwriting analysis, and final marks are stored securely for future reference.",
    },
  ],
  []
);


  // Use GSAP's useGSAP hook for automatic cleanup
  useGSAP(
    () => {
      if (!timelineRef.current) return;

      const elements = gsap.utils.toArray(timelineRef.current.children);

      // Create a master timeline for better performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none none",
        },
      });

      // Animate all elements in sequence
      elements.forEach((element, index) => {
        tl.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          index * 0.15 // Stagger timing
        );
      });
    },
    { scope: timelineRef }
  );

  return (
    <section
      className="px-4 py-16 md:px-12 lg:px-24"
      aria-label="Process timeline"
    >
      <h2 className="mb-16 text-center text-4xl font-thin text-white md:text-5xl">
        Our Step-by-Step Process
      </h2>

      <div className="relative mx-auto max-w-4xl">
        {/* Main Vertical Line */}
        <div
          className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-800"
          aria-hidden="true"
        ></div>

        {/* Timeline Steps Container */}
        <ol className="relative w-full" ref={timelineRef} role="list">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <li
                key={index}
                className={`relative mb-16 flex items-center ${
                  isEven ? "md:justify-start" : "md:justify-end"
                } justify-center last:mb-0`}
              >
                {/* Horizontal Connector Line */}
                <div
                  className={`absolute top-1/2 hidden h-0.5 w-16 bg-linear-to-r from-indigo-500 to-purple-500 md:block ${
                    isEven ? "right-1/2" : "left-1/2"
                  }`}
                  aria-hidden="true"
                ></div>

                {/* Circle Icon on the main line */}
                <div
                  className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#111111]"
                  style={{
                    backgroundColor: "#8B5CF6",
                    boxShadow: "0 0 20px 2px rgba(139, 92, 246, 0.6)",
                  }}
                  aria-hidden="true"
                >
                  <span className="text-sm font-bold text-white">
                    {index + 1}
                  </span>
                </div>

                {/* Step Card */}
                <div
                  className={`relative z-20 w-full max-w-md rounded-xl border border-gray-700/50 bg-[#111111] p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/30 hover:shadow-indigo-500/20 md:w-[calc(50%-4rem)] ${
                    isEven ? "md:ml-0" : "md:mr-0"
                  }`}
                  role="article"
                  aria-labelledby={`step-${index}-title`}
                >
                  {/* Step Number Badge */}
                  <div className="mb-3 inline-block rounded-full bg-indigo-500/10 px-3 py-1">
                    <span className="text-xs font-semibold text-indigo-400">
                      Step {index + 1}
                    </span>
                  </div>

                  <h3
                    id={`step-${index}-title`}
                    className="mb-2 text-xl font-semibold text-white"
                  >
                    {step.title}
                  </h3>
                  <p className="font-light leading-relaxed text-gray-300">
                    {step.description}
                  </p>

                  {/* Decorative Corner Accent */}
                  <div
                    className="absolute -right-1 -top-1 h-6 w-6 rounded-tr-xl border-r-2 border-t-2 border-indigo-500/50"
                    aria-hidden="true"
                  ></div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default TimelineCentered;
