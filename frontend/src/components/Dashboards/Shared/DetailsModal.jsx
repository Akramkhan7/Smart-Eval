import React from "react";

const DetailsModal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl">
        {children}

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-black text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailsModal;
