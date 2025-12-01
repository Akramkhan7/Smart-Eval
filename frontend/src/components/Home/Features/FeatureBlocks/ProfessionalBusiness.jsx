import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Download } from "lucide-react"; // Assuming you use lucide-react

// --- CONSTANTS & HELPER FUNCTIONS (From MagicBento Source) ---
const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_GLOW_COLOR = "132, 0, 255"; // Purple glow used in the styling

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

// --- PARTICLE CARD COMPONENT (The Animation Engine) ---
const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
  enableStars = true, // Added prop for particle animation control
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor
      )
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current || !enableStars) return; // Check enableStars here

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles, enableStars]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      if (enableStars) animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;
        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
    enableStars,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

// --- MAIN SECTION COMPONENT ---
const ProfessionalBusiness = () => {
  const customGlowColor = DEFAULT_GLOW_COLOR; // '132, 0, 255'

  return (
    <>
      {/* This style block is critical for the border glow and particle appearance.
        In a production app, move this CSS to a global stylesheet.
      */}
      <style>{`
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(200px circle at var(--glow-x, 50%) var(--glow-y, 50%),
                rgba(${customGlowColor}, calc(var(--glow-intensity, 0) * 0.8)) 0%,
                rgba(${customGlowColor}, calc(var(--glow-intensity, 0) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
            /* Note: The full border glow effect reacts to mouse position via GlobalSpotlight, 
               but this will give a strong hover effect without it. */
          }
          
          .card--border-glow:hover {
            box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(${customGlowColor}, 0.2);
          }
          
          .particle {
             /* Base particle style is inline, but adding ::before here for the shadow */
          }
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${customGlowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
      `}</style>

      <section className=" text-white font-thin py-16 px-4 md:px-12 lg:px-24 min-h-screen flex flex-col justify-start">
        <h1 className="text-4xl md:text-5xl font-stretch-condensed mb-16 max-w-4xl">
          Built by Students, for Students 
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Left Text Column */}
         <div className="flex-1 max-w-xl text-gray-300 space-y-6 text-sm sm:text-base">
            <p>
              Watch how SmartEval automates assignment evaluation — from plagiarism detection
              to handwriting verification and AI-assisted scoring.
            </p>
            <p>
              Our workflow helps teachers save time, maintain fairness, 
              and provide detailed insights for every student submission.
            </p>
            <p>
              Each step is automated but fully transparent, ensuring accuracy and efficiency.
            </p>
            <p>
              Students benefit from instant feedback and clear grading reports, making the learning process faster and more reliable.
            </p>
            <p>
              Administrators can monitor progress, generate analytics, and maintain secure records effortlessly.
            </p>
            <p>
              SmartEval supports multiple file types including scanned documents, images, and PDFs, ensuring smooth submission for every student.
            </p>
          </div>

          {/* Right Animated Card */}
          <div className="flex-none w-full lg:w-[560px] h-[360px] md:h-[480px]">
            <ParticleCard
              className="relative flex flex-col justify-center items-center p-6 md:p-8 rounded-2xl shadow-xl 
                         border border-gray-700/50 h-full w-full
                         transition-all duration-300 hover:shadow-2xl hover:border-indigo-500/50 
                         card--border-glow"
              glowColor={customGlowColor}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              enableStars={true}
              particleCount={10}
            >
              {/* Abstract Wave Background Image */}
              <img
                src="https://image.pollinations.ai/prompt/abstract%20wave%20lines%20purple%20with%20central%20glow%20on%20dark%20background"
                alt="Abstract wave lines"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-80"
              />

              {/* Placeholder Content for the Card */}
              <div className="relative z-10 text-center text-white p-4"></div>
            </ParticleCard>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfessionalBusiness;
