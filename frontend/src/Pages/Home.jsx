import React from "react";
import NoLoginHeader from "../components/Home/Headers/NoLoginHeader";
import LoginHeader from "../components/Home/Headers/LoginHeader";
import HeroSection from "../components/Home/LandingPage";
import Footer from "../components/Footer/Footer";
import Features from "../components/Home/Features/Features";
import FooterCTASection from "../components/Footer/FooterCTASection";
import StudentDashboard from "./Student";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Home = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <p>Checking login…</p>;

  return (
    <div className="relative w-full text-white">
      <div className="relative z-10">
        {user ? <LoginHeader /> : <NoLoginHeader />}

        <HeroSection />
        <Features />
        <Footer />
        <FooterCTASection />
      </div>
    </div>
  );
};

export default Home;
