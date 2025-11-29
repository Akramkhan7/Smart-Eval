import React from "react";
import Header from "../components/Home/Headers/NoLoginHeader";
import HeroSection from "../components/Home/LandingPage";
import Footer from "../components/Footer/Footer";
import FloatingAnimate from "../Animations/FloatingAnimate";
import Features from "../components/Home/Features/Features";
import FooterCTASection from "../components/Footer/FooterCTASection";
import StudentDashboard from "./Student";

const Home = () => {
  return (
    <div className="relative w-full text-white">
      <FloatingAnimate />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <Features />
        <Footer />
        <FooterCTASection />
        
      </div>
    </div>
  );
};

export default Home;
