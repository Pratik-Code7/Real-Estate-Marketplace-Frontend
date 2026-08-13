import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ListingSkeleton from "./ListingSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Property = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/property/myProperty",
          {
            withCredentials: true,
          },
        );
        setProperties(response.data);
      } catch (err) {
        setError("Failed to load properties");
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, []);
  const [totalLikes, setTotalLikes] = useState(0);
  const [activeListings, setActiveListings] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  useEffect(() => {
    const like = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/favorites/total-likes",
          {
            withCredentials: true,
          },
        );

        setTotalLikes(res.data.totalLikes);
      } catch (err) {
        console.error("Error fetching total likes:", err);
      }
    };

    like();
  }, []);
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [viewsRes, propertiesRes] = await Promise.all([
          axios.get("http://localhost:3000/api/property/total-views", {
            withCredentials: true,
          }),

          axios.get("http://localhost:3000/api/property/total-count", {
            withCredentials: true,
          }),
        ]);

        setTotalViews(viewsRes.data.totalViews);
        setTotalProperties(propertiesRes.data.totalProperties);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    fetchDashboardStats();
  }, []);
  useEffect(() => {
    const fetchActiveListings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/property/active-count",
          {
            withCredentials: true,
          },
        );

        setActiveListings(res.data.activeListings);
      } catch (err) {
        console.error("Error fetching active listings:", err);
      }
    };

    fetchActiveListings();
  }, []);

  const dashStats = [
    { title: "TOTAL LIKES", value: loading ? 0 : totalLikes },
    { title: "TOTAL VIEWS", value: loading ? 0 : totalViews },
    { title: "TOTAL PROPERTIES", value: loading ? 0 : totalProperties },
    { title: "ACTIVE LISTINGS", value: loading ? 0 : activeListings },
  ];

  return (
    <div className="w-full h-full p-4 md:p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">My Properties</h1>
        <p className="text-gray-500">
          Manage your active properties and track their performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {loading
          ? // Skeleton loading for stats
            Array(4)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-md">
                  <Skeleton height={16} width="60%" className="mb-2" />
                  <Skeleton height={28} width="40%" />
                </div>
              ))
          : dashStats.map((elem, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-md ">
                <h3 className="text-sm text-gray-500">{elem.title}</h3>
                <p className="text-xl font-bold">{elem.value}</p>
              </div>
            ))}
      </div>

      {/* Loading State - Skeleton */}
      {loading && (
        <div className="flex flex-col gap-5">
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <ListingSkeleton key={idx} />
            ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">{error}</div>
        </div>
      )}

      {/* Property List */}
      {!loading && !error && properties.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">No properties found</div>
        </div>
      )}

      {!loading && !error && properties.length > 0 && (
        <div className="flex flex-col gap-5">
          {properties.map((property) => (
            <div
              key={property._id}
              className="w-full bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xs group hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/property/${property._id}`)}
            >
              {/* Image */}
              <div className="relative h-56 md:h-auto md:w-1/3 overflow-hidden">
                <img
                  src={
                    property.images?.[0] || "https://via.placeholder.com/400"
                  }
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-xl text-xs">
                  {property.status}
                </div>
              </div>

              {/* Details */}
              <div className="w-full flex flex-col justify-between p-4 md:p-6">
                <div>
                  {/* Title */}
                  <div className="flex md:flex-row justify-between gap-2">
                    <h2 className="text-lg font-bold">{property.title}</h2>
                    <p className="font-semibold">
                      Rs {property.price}/
                      {property.status === "For Rent" ? "mo" : ""}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                    {property.bedroom && <span>{property.bedroom} Bed</span>}
                    {property.bathroom && <span>{property.bathroom} Bath</span>}
                    {property.area && <span>{property.area} sqft</span>}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <i className="ri-map-pin-2-fill"></i>
                    <span>
                      {property.location}, {property.country}
                    </span>
                  </div>

                  {/* Type */}
                  <div className="mt-2 text-sm">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {property.type}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 border-t pt-4 flex md:flex-row justify-between items-start md:items-center gap-3 text-sm">
                  <span className="text-gray-500">
                    Posted {new Date(property.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex gap-4">
                    <button
                      className="hover:text-blue-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="ri-pencil-line"></i> Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="ri-delete-bin-line"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Property;
