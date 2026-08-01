import React from "react";
import { Link } from "react-router-dom";
const List_item = ({ image, text, id }) => {
  return (
    <Link to={`/property/${id}`} className="block">
      <div className="cursor-pointer">
        <div className="w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg bg-white flex flex-col group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
          {/* IMAGE */}
          <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
            <img
              src={image}
              alt="Property"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* CONTENT */}
          <div className="p-4 flex flex-col gap-1">
            <h2 className="text-base sm:text-lg font-semibold">{text}</h2>

            <div className="flex items-center gap-2 text-gray-700">
              <i className="ri-map-pin-2-fill"></i>
              <p className="text-sm">Lorem ipsum dolor sit amet</p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-600 ">
              <div className=" rounded-lg px-3 py-2">1 Room</div>

              <div className=" rounded-lg px-3 py-2">2 Bath</div>

              <div className=" rounded-lg px-3 py-2">1200 sqft</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default List_item;
