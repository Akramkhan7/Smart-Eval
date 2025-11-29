import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import FloatingAnimate from "../Animations/FloatingAnimate";
import HeroSection2 from "./HeroSection2";
import FooterCTASection from "./FooterCTASection";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const Home = ( ) => {
  const {user,loading} = useContext(AuthContext);
  
  return (
    <div className="relative w-full text-white">
      <FloatingAnimate />

      <div className="relative z-10">
        <Header />
        <HeroSection />
        <HeroSection2 />
        <Footer />
        <FooterCTASection />

        
      </div>
    </div>
  );
};

export default Home;
