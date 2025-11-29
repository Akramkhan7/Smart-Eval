import React from "react";

const Card = ({ children }) => {
  return (
    <div className="p-5 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
      {children}
    </div>
  );
};

export default Card;
