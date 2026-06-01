import React from "react";

const List_item = ({ image, text }) => {
  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col">
      {/* IMAGE */}
      <div className="w-full h-48 sm:h-56 md:h-64">
        <img
          src={image}
          alt="Property"
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-base sm:text-lg font-semibold">{text}</h2>

        <div className="flex items-center gap-2 text-gray-700">
          <i className="ri-map-pin-2-fill"></i>
          <p className="text-sm">Lorem ipsum dolor sit amet</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-600 mt-2">
          <div className="bg-gray-200 rounded-lg px-3 py-1">1 Room</div>

          <div className="bg-gray-200 rounded-lg px-3 py-1">2 Bath</div>

          <div className="bg-gray-200 rounded-lg px-3 py-1">1200 sqft</div>
        </div>
      </div>
    </div>
  );
};

export default List_item;
