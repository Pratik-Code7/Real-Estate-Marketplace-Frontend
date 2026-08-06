import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Fav_Comp from "../Components/Fav_Comp";
import Navbar from "../Components/Navbar";
import ListingSkeleton from "../Components/ListingSkeleton";
import axios from "axios";
const Listing = () => {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    location: "",
    propertyType: "All",
    price: 50000,
    bedrooms: "Any",
    bathrooms: "Any",
    facilities: [],
  });

  const [tempFilters, setTempFilters] = useState(filters);

  // NEW: data state
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loc = searchParams.get("location") || "";
    let pType = searchParams.get("propertyType") || "All";

    if (pType === "Office Space") {
      pType = "Office";
    } else if (pType === "Residential House") {
      pType = "House";
    }

    let pr = 50000;
    const urlPrice = searchParams.get("price");
    if (urlPrice) {
      const parsedPrice = Number(urlPrice);
      if (!isNaN(parsedPrice)) {
        pr = parsedPrice > 50000 ? 50000 : parsedPrice;
      }
    }

    const newFilters = {
      location: loc,
      propertyType: pType,
      price: pr,
      bedrooms: "Any",
      bathrooms: "Any",
      facilities: [],
    };

    setFilters(newFilters);
    setTempFilters(newFilters);
  }, [searchParams]);

  // NEW: fetch properties whenever APPLIED filters change
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {};

        if (filters.location) params.location = filters.location;
        if (filters.propertyType !== "All")
          params.propertyType = filters.propertyType;
        if (filters.price) params.price = filters.price;
        if (filters.bedrooms !== "Any") params.bedrooms = filters.bedrooms;
        if (filters.bathrooms !== "Any") params.bathrooms = filters.bathrooms;
        if (filters.facilities.length > 0)
          params.facilities = filters.facilities.join(",");

        const res = await axios.get("http://localhost:3000/api/property/list", {
          params,
          withCredentials: true,
        });

        const data = res.data;

        // Adjust based on your actual API response shape
        setProperties(Array.isArray(data) ? data : data.properties || []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setError("Could not load properties. Please try again.");
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

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
      price: 50000,
      bedrooms: "Any",
      bathrooms: "Any",
      facilities: [],
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-6">
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
                    <option>Penthouse</option>
                    <option>Land</option>
                    <option>Duplex</option>
                    <option>Flat</option>
                    <option>Commercial Property</option>
                    <option>Retail Shop</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <label>Price Range</label>
                    <span>Rs {tempFilters.price}</span>
                  </div>
                  <input
                    type="range"
                    name="price"
                    min="500"
                    max="100000"
                    value={tempFilters.price}
                    onChange={handleChange}
                    className="w-full accent-black"
                  />
                </div>

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
            <div className="lg:col-span-3 h-screen overflow-y-auto flex flex-col gap-4">
              {loading && (
                <div className="flex flex-col gap-4">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => <ListingSkeleton key={i} />)}
                </div>
              )}

              {error && <p className="text-center text-red-500">{error}</p>}

              {!loading && !error && properties.length === 0 && (
                <p className="text-center text-gray-500">
                  No properties match your filters.
                </p>
              )}

              {!loading &&
                !error &&
                properties.map((prop) => (
                  <Fav_Comp key={prop._id} property={prop} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listing;
