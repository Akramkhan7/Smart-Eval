import React from "react";
import Particles from "../Hooks/FloatingLines"; // Correct your import path

function FloatingAnimate() {
  return (
    <div
      style={{
        width: "100%",
        height: "50vh", // animation height
        position: "fixed", // fixed so it stays in place
        top: 0,
        left: 0,
        zIndex: -10, // behind all content
        pointerEvents: "auto", // allow hover events
      }}
    >
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true} // hover effect
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  );
}

export default FloatingAnimate;
