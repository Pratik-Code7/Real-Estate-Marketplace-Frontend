import React from "react";
import { ArrowUpRight } from "lucide-react";

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
  return (
    <>
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white border border-gray-200 rounded-xl p-5"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-11 h-11 rounded-full ${stat.bg} ${stat.text} flex items-center justify-center`}
                >
                  <Icon size={21} />
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-4">{stat.title}</p>

              <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>

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
            <h3 className="font-semibold">Overview</h3>

            <select className="border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 6 months</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-5 mt-5 text-xs">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500" />
              Users
            </span>

            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              Properties
            </span>

            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-400" />
              Inquiries
            </span>

            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              Bookings
            </span>
          </div>

          <div className="h-[260px] mt-6 relative">
            {/* Horizontal lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((item) => (
                <div key={item} className="border-t border-gray-100" />
              ))}
            </div>

            {/* Fake chart */}
            <svg
              viewBox="0 0 800 250"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <polyline
                points="0,190 50,175 100,180 150,155 200,165 250,120 300,110 350,125 400,95 450,105 500,80 550,100 600,75 650,90 700,65 750,80 800,55"
                fill="none"
                stroke="#9333ea"
                strokeWidth="3"
              />

              <polyline
                points="0,210 50,200 100,205 150,190 200,195 250,175 300,180 350,160 400,170 450,150 500,160 550,140 600,155 650,135 700,145 750,120 800,130"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
              />

              <polyline
                points="0,225 50,220 100,215 150,220 200,205 250,210 300,195 350,205 400,190 450,200 500,180 550,190 600,175 650,185 700,165 750,170 800,155"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
              />

              <polyline
                points="0,240 50,235 100,238 150,230 200,235 250,220 300,225 350,215 400,220 450,205 500,215 550,200 600,210 650,195 700,205 750,190 800,195"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>May 12</span>
            <span>May 19</span>
            <span>May 26</span>
            <span>Jun 02</span>
            <span>Jun 09</span>
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
                  className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-none"
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
                        property.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {property.status}
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
