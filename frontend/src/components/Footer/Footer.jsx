import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white text-black text-center py-4 shadow-md z-50">
      <p className="text-sm font-medium">
        © {new Date().getFullYear()} SmartEval — AI-Powered Academic Evaluation System
      </p>
      <p className="text-xs text-gray-600 mt-1">
        Designed for Smarter, Faster, and Fairer Assessments
      </p>
    </footer>
  );
};

export default Footer;
