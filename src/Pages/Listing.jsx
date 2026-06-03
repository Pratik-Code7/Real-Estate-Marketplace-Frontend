import React, { useState } from "react";
import Fav_Comp from "../Components/Fav_Comp";

const Listing = () => {
  const [active, setactive] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-8 ">
      <div className="mb-4">
        <button
          onClick={() => window.history.back()}
          className="text-sm text-gray-600 hover:text-black flex items-center gap-1 bg-white px-3 py-1 rounded-lg shadow-sm"
        >
          <i class="ri-arrow-go-back-line"></i> Back
        </button>
      </div>
      <div className="w-full  mx-auto flex flex-col md:flex-row gap-6  ">
        {/* FILTER SIDEBAR */}
        <div className="w-full  md:w-1/3 lg:w-1/4 bg-white p-5 rounded-2xl shadow-md  ">
          <h2 className="text-xl font-semibold mb-4">
            <i className="ri-filter-line text-xm font-semibold"></i> Filter
            Properties
          </h2>

          <form className="flex flex-col gap-5">
            {/* Location */}
            <div className="flex flex-col gap-2">
              <label>Location</label>
              <input
                type="text"
                placeholder="Search Location..."
                className="border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-black"
              />
            </div>

            {/* Property Type */}
            <div className="flex flex-col gap-2 text-sm">
              <label>Property Type</label>
              <select className="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:border-black">
                <option>All</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>House</option>
                <option>Office</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <label>Price Range</label>
                <span className="text-sm text-gray-500">$500 - $5000</span>
              </div>

              <input
                type="range"
                min="500"
                max="5000"
                className="w-full accent-black"
              />
            </div>

            {/* Bedrooms */}
            <div className="flex flex-col gap-2">
              <label>Bedrooms</label>
              <select className="border border-gray-300 rounded-lg px-4 py-2">
                <option>Any</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3 Bedrooms</option>
                <option>4+ Bedrooms</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div className="flex flex-col gap-2">
              <label>Bathrooms</label>
              <select className="border border-gray-300 rounded-lg px-4 py-2">
                <option>Any</option>
                <option>1 Bathroom</option>
                <option>2 Bathrooms</option>
                <option>3+ Bathrooms</option>
              </select>
            </div>

            {/* Amenities */}
            <div className="flex flex-col gap-3">
              <label>Facilities</label>

              <div className="grid grid-cols-2 gap-2 text-sm">
                {["Parking", "Swimming Pool", "Gym", "WiFi"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input type="checkbox" />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                type="submit"
                className="bg-black text-white py-2 rounded-xl w-full"
              >
                Apply
              </button>

              <button
                type="reset"
                className="border border-gray-300 py-2 rounded-xl w-full"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT CONTENT */}
        <div className="h-screen overflow-y-auto">
          <Fav_Comp />
        </div>
      </div>
    </div>
  );
};

export default Listing;
