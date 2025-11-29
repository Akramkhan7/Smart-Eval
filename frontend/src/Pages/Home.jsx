import React from "react";
import Header from "../components/Home/Headers/NoLoginHeader";
import HeroSection from "../components/Home/LandingPage";
import Footer from "../components/Footer/Footer";
import FloatingAnimate from "../Animations/FloatingAnimate";
<<<<<<< HEAD:frontend/src/components/Pages/Home.jsx
import HeroSection2 from "./HeroSection2";
import FooterCTASection from "./FooterCTASection";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
=======
import Features from "../components/Home/Features/Features";
import FooterCTASection from "../components/Footer/FooterCTASection";
import StudentDashboard from "./Student";
>>>>>>> 443bcae4f96cd9717f55829184facd4931c6c539:frontend/src/Pages/Home.jsx

const Home = ( ) => {
  const {user,loading} = useContext(AuthContext);
  
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
