import React from "react";

const InfoItem = ({ label, value }) => {
  return (
    <p className="text-sm text-white/80">
      <strong className="text-white">{label}: </strong> {value}
    </p>
  );
};

export default InfoItem;
