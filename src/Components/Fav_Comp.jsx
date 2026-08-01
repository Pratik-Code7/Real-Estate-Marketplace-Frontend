import React from "react";
import { Link } from "react-router-dom";
const Fav_Comp = ({ filters }) => {
  const properties = [
    {
      id: 1,
      title: "Modern Apartment",
      img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      location: "Lalitpur",
      type: "Apartment",
      price: 1200,
      bedrooms: 1,
      bathrooms: 1,
      facilities: ["Parking", "WiFi"],
    },
    {
      id: 2,
      title: "Luxury Villa",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      location: "Kathmandu",
      type: "Villa",
      price: 4500,
      bedrooms: 4,
      bathrooms: 3,
      facilities: ["Parking", "Swimming Pool", "Gym", "WiFi"],
    },
    {
      id: 3,
      title: "Cozy Cottage",
      img: "https://images.unsplash.com/photo-1448630360428-65456885c650",
      location: "Bhaktapur",
      type: "House",
      price: 900,
      bedrooms: 2,
      bathrooms: 1,
      facilities: ["Parking"],
    },
    {
      id: 4,
      title: "City Penthouse",
      img: "https://images.unsplash.com/photo-1494526585095-c41746248156",
      location: "Kathmandu",
      type: "Apartment",
      price: 3200,
      bedrooms: 3,
      bathrooms: 2,
      facilities: ["Gym", "WiFi"],
    },
    {
      id: 5,
      title: "Beach House",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      location: "Pokhara",
      type: "House",
      price: 2500,
      bedrooms: 3,
      bathrooms: 2,
      facilities: ["Parking", "Swimming Pool"],
    },
    {
      id: 6,
      title: "Mountain Cabin",
      img: "https://images.unsplash.com/photo-1460317442991-0ec209397118",
      location: "Pokhara",
      type: "Office",
      price: 1500,
      bedrooms: 1,
      bathrooms: 1,
      facilities: ["WiFi"],
    },
  ];

  // Default filters, in case none are passed
  const activeFilters = filters || {
    location: "",
    propertyType: "All",
    price: 5000,
    bedrooms: "Any",
    bathrooms: "Any",
    facilities: [],
  };

  const filteredProperties = properties.filter((property) => {
    const matchesLocation = activeFilters.location
      ? property.location
          .toLowerCase()
          .includes(activeFilters.location.toLowerCase())
      : true;

    const matchesType =
      activeFilters.propertyType === "All" ||
      property.type === activeFilters.propertyType;

    const matchesPrice = property.price <= Number(activeFilters.price);

    const matchesBedrooms =
      activeFilters.bedrooms === "Any" ||
      property.bedrooms === parseInt(activeFilters.bedrooms);

    const matchesBathrooms =
      activeFilters.bathrooms === "Any" ||
      property.bathrooms === parseInt(activeFilters.bathrooms);

    const matchesFacilities = activeFilters.facilities.every((f) =>
      property.facilities.includes(f),
    );

    return (
      matchesLocation &&
      matchesType &&
      matchesPrice &&
      matchesBedrooms &&
      matchesBathrooms &&
      matchesFacilities
    );
  });

  return (
    <div className="w-full flex flex-col gap-5">
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xs p-10 text-center text-gray-500">
          No properties match your filters.
        </div>
      ) : (
        filteredProperties.map((elem) => (
          <div
            key={elem.id}
            className="bg-white rounded-2xl overflow-hidden shadow-xs flex flex-col md:flex-row group hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-56 md:h-auto md:w-1/3 overflow-hidden">
              <img
                src={elem.img}
                alt={elem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded text-sm">
                Saved
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 flex flex-col justify-between w-full">
              <div>
                <h2 className="text-lg font-bold">{elem.title}</h2>
                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <i className="ri-map-pin-2-fill"></i>
                  <p className="text-sm text-gray-500">{elem.location}</p>
                </div>

                <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
                  <span>
                    {elem.bedrooms} Room{elem.bedrooms > 1 ? "s" : ""}
                  </span>
                  <span>{elem.bathrooms} Bath</span>
                  <span>{elem.type}</span>
                </div>
              </div>

              {/* Price section */}
              <div className="mt-4 border-t pt-4 flex justify-between items-center">
                <p className="font-semibold">Rs {elem.price}/mo</p>

                <button className="text-red-500">Remove</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Fav_Comp;
