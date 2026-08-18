import React from "react";

const InfoBox = () => {
  return (
    <div className="w-full sm:w-72 md:w-80 flex flex-col justify-center items-center gap-4 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="bg-gradient-to-br from-[#e8b75c] to-[#d4a84b] h-16 w-16 sm:h-20 sm:w-20 rounded-full flex justify-center items-center text-white text-2xl sm:text-3xl shadow-md">
        <i className="ri-verified-badge-line"></i>
      </div>

      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-900">
        Verified Properties
      </h1>

      <p className="text-center text-sm sm:text-base text-gray-600 leading-relaxed">
        Every listing is reviewed to reduce fake ads and provide trusted rental
        options across Nepal.
      </p>
    </div>
  );
};

export default InfoBox;
