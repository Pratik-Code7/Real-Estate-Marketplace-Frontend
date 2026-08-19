import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Chart from "./Chart";
function Role({ color, name, value, percent }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${color}`} />

      <div>
        <p className="font-medium">{name}</p>
        <p className="text-gray-400">
          {value} ({percent})
        </p>
      </div>
    </div>
  );
}

function DashboardContent({
  stats,
  properties,
  inquiries,
  reviews,
  userRoles,
  onNavigateToSection,
}) {
  const navigate = useNavigate();

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <>
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white border flex gap-5 border-gray-200 rounded-xl p-5"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-11 h-11 rounded-full ${stat.bg} ${stat.text} flex items-center justify-center`}
                >
                  <Icon size={21} />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mt-0">{stat.title}</p>

                <h3 className="text-2xl font-semibold mt-0">{stat.value}</h3>
              </div>

              {/* <div className="flex items-center gap-1 mt-3 text-green-600 text-xs">
                <ArrowUpRight size={14} />
                <span>{stat.change}</span>
                <span className="text-gray-400 ml-1">from last month</span>
              </div> */}
            </div>
          );
        })}
      </div>

      {/* CHART + PROPERTIES */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-5">
        {/* CHART */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Overview</h3>
              <p className="text-xs text-gray-400 mt-1">
                Platform activity over time
              </p>
            </div>

            {/* <select className="border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none bg-white">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 6 months</option>
            </select> */}
          </div>

          <div className="mt-6 h-[260px]">
            <Chart />
          </div>
        </div>

        {/* RECENT PROPERTIES */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Properties</h3>
            <button
              onClick={() => onNavigateToSection("Properties")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-xs hover:bg-gray-50 transition"
            >
              View All
            </button>
          </div>

          <div>
            {properties.length > 0 ? (
              properties.map((property) => (
                <div
                  key={property._id || property.title}
                  className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-none cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => handlePropertyClick(property._id)}
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-[80px] h-[55px] object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/80x55?text=No+Image";
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">
                      {property.title}
                    </h4>

                    <p className="text-xs text-gray-400 mt-1">
                      {property.location}
                    </p>
                  </div>

                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-medium">{property.price}</p>

                    <span
                      className={`inline-block mt-2 text-[10px] px-2 py-1 rounded-full ${
                        property.listingStatus === "Verified"
                          ? "bg-green-100 text-green-700"
                          : property.listingStatus === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {property.listingStatus || "Pending"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 py-4">No properties found</p>
            )}
          </div>

          <button
            onClick={() => onNavigateToSection("Properties")}
            className="w-full pt-4 text-sm font-medium hover:text-blue-600 transition"
          >
            View All Properties →
          </button>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* INQUIRIES */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Inquiries</h3>

            <button
              onClick={() => onNavigateToSection("Inquiries")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-xs hover:bg-gray-50 transition"
            >
              View All
            </button>
          </div>

          {inquiries.length > 0 ? (
            inquiries.map((item) => (
              <div
                key={item.name}
                className="py-3 border-b border-gray-100 last:border-none"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                    {item.name
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-xs font-semibold">{item.name}</p>

                      <span className="text-[10px] text-gray-400">
                        {item.time}
                      </span>
                    </div>

                    <p className="text-[10px] text-gray-400 mt-1">
                      {item.property}
                    </p>

                    <p className="text-xs mt-1">{item.message}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 py-4">No inquiries found</p>
          )}

          <button
            onClick={() => onNavigateToSection("Inquiries")}
            className="w-full text-sm font-medium mt-3 hover:text-blue-600 transition"
          >
            View All Inquiries →
          </button>
        </div>

        {/* USERS BY ROLE */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold">Users by Role</h3>

          {userRoles && (
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="relative">
                <div
                  className="w-40 h-40 rounded-full"
                  style={{
                    background:
                      userRoles.roles.length > 0
                        ? `conic-gradient(
                          #9333ea 0 ${userRoles.roles[0].percent}%, 
                          #3b82f6 ${userRoles.roles[0].percent}% ${userRoles.roles[0].percent + userRoles.roles[1].percent}%, 
                          #fbbf24 ${userRoles.roles[0].percent + userRoles.roles[1].percent}% ${userRoles.roles[0].percent + userRoles.roles[1].percent + userRoles.roles[2].percent}%, 
                          #22c55e ${userRoles.roles[0].percent + userRoles.roles[1].percent + userRoles.roles[2].percent}% 100%
                        )`
                        : "#e5e7eb",
                  }}
                />

                <div className="absolute inset-7 bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-xl font-semibold">
                    {userRoles.total.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400">Total Users</span>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                {userRoles.roles.map((role, index) => (
                  <Role
                    key={role.name}
                    color={
                      index === 0
                        ? "bg-purple-500"
                        : index === 1
                          ? "bg-blue-500"
                          : index === 2
                            ? "bg-yellow-400"
                            : "bg-green-500"
                    }
                    name={role.name}
                    value={role.value}
                    percent={`${role.percent}%`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* REVIEWS */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Recent Reviews</h3>

            <button
              onClick={() => onNavigateToSection("Reviews")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-xs hover:bg-gray-50 transition"
            >
              View All
            </button>
          </div>

          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.name}
                className="py-4 border-b border-gray-100 last:border-none"
              >
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                    {review.name.substring(0, 2)}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-xs font-semibold">{review.name}</p>

                      <span className="text-yellow-500 text-xs">
                        {"★".repeat(review.rating)}
                      </span>
                    </div>

                    <p className="text-xs mt-2">{review.review}</p>

                    <p className="text-[10px] text-gray-400 mt-1">
                      {review.property}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 py-4">No reviews found</p>
          )}

          <button
            onClick={() => onNavigateToSection("Reviews")}
            className="w-full text-sm font-medium mt-3 hover:text-blue-600 transition"
          >
            View All Reviews →
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardContent;
