import React from "react";

const InfoBox = () => {
  return (
    <div className="w-full sm:w-72 md:w-80 flex flex-col justify-center items-center gap-3 rounded-2xl p-5 ">
      <div className="bg-white h-14 w-14 sm:h-16 sm:w-16 rounded-full flex justify-center items-center text-black text-2xl">
        <i className="ri-verified-badge-line"></i>
      </div>

      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center">
        Verified Properties
      </h1>

      <p className="text-center text-xs sm:text-sm text-gray-600">
        Every listing is reviewed to reduce fake ads and provide trusted rental
        options across Nepal.
      </p>
    </div>
  );
};

export default InfoBox;
