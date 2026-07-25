import React, { useState } from "react";
import Fav_Comp from "../Components/Fav_Comp";
import Navbar from "../Components/Navbar";

const Listing = () => {
  // Filter State
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "All",
    price: 5000,
    bedrooms: "Any",
    bathrooms: "Any",
    facilities: [],
  });

  // Temp state (form inputs before "Apply" is clicked)
  const [tempFilters, setTempFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacilityToggle = (facility) => {
    setTempFilters((prev) => {
      const exists = prev.facilities.includes(facility);
      return {
        ...prev,
        facilities: exists
          ? prev.facilities.filter((f) => f !== facility)
          : [...prev.facilities, facility],
      };
    });
  };

  const handleApply = (e) => {
    e.preventDefault();
    setFilters(tempFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      location: "",
      propertyType: "All",
      price: 5000,
      bedrooms: "Any",
      bathrooms: "Any",
      facilities: [],
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="text-sm text-gray-600 hover:text-black flex items-center gap-1 bg-white px-3 py-1 rounded-lg shadow-sm"
          >
            ← Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
            {/* FILTER SIDEBAR */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Filter Properties</h2>

              <form onSubmit={handleApply} className="flex flex-col gap-5">
                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label>Location</label>

                  <input
                    type="text"
                    name="location"
                    value={tempFilters.location}
                    onChange={handleChange}
                    placeholder="Search Location..."
                    className="border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-black"
                  />
                </div>

                {/* Property Type */}
                <div className="flex flex-col gap-2">
                  <label>Property Type</label>

                  <select
                    name="propertyType"
                    value={tempFilters.propertyType}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl px-4 py-2"
                  >
                    <option>All</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>House</option>
                    <option>Office</option>
                  </select>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <label>Price Range</label>

                    <span>${tempFilters.price}</span>
                  </div>

                  <input
                    type="range"
                    name="price"
                    min="500"
                    max="5000"
                    value={tempFilters.price}
                    onChange={handleChange}
                    className="w-full accent-black"
                  />
                </div>

                {/* Bedrooms */}
                <div className="flex flex-col gap-2">
                  <label>Bedrooms</label>

                  <select
                    name="bedrooms"
                    value={tempFilters.bedrooms}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl px-4 py-2"
                  >
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

                  <select
                    name="bathrooms"
                    value={tempFilters.bathrooms}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl px-4 py-2"
                  >
                    <option>Any</option>
                    <option>1 Bathroom</option>
                    <option>2 Bathrooms</option>
                    <option>3+ Bathrooms</option>
                  </select>
                </div>

                {/* Facilities */}
                <div className="flex flex-col gap-3">
                  <label>Facilities</label>

                  <div className="grid grid-cols-2 gap-2">
                    {["Parking", "Swimming Pool", "Gym", "WiFi"].map((item) => (
                      <label key={item} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={tempFilters.facilities.includes(item)}
                          onChange={() => handleFacilityToggle(item)}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-black text-white py-2 rounded-xl w-full"
                  >
                    Apply
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="border border-gray-300 py-2 rounded-xl w-full"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-3 h-screen overflow-y-auto">
              <Fav_Comp filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listing;
