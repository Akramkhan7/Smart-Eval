import React from "react";

const colors = {
  completed: "bg-green-500",
  pending: "bg-yellow-500",
  review: "bg-blue-500",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`${colors[status]} text-white px-3 py-1 rounded-full text-xs`}
    >
      {status.toUpperCase()}
    </span>
  );
};

export default StatusBadge;
