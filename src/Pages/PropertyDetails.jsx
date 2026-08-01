import React from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    description:
      "A beautiful modern apartment located in the heart of Lalitpur. Close to schools, hospitals, restaurants and shopping centres.",
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
    description:
      "Luxury villa with premium facilities, spacious rooms and beautiful city views.",
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
    description: "Peaceful cottage surrounded by greenery and fresh air.",
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = properties.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        Property Not Found
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* ================= HERO ================= */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={property.img}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        {/* Top Buttons */}
        <div className="absolute top-6 left-6 right-6 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>

          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition">
              <i className="ri-heart-line text-xl"></i>
            </button>

            <button className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition">
              <i className="ri-share-line text-xl"></i>
            </button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-10 left-10 text-white">
          <span className="bg-white text-black px-4 py-2 rounded-full font-medium">
            {property.type}
          </span>

          <h1 className="text-5xl font-bold mt-5">{property.title}</h1>

          <div className="flex items-center gap-2 mt-3 text-lg">
            <i className="ri-map-pin-2-fill"></i>
            <span>{property.location}, Nepal</span>
          </div>
        </div>
      </div>

      {/* ================= IMAGE GALLERY ================= */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-lg p-5">
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <img
                key={item}
                src={property.img}
                alt=""
                className="h-36 w-full object-cover rounded-2xl cursor-pointer hover:scale-105 duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                <div>
                  <h2 className="text-4xl font-bold">{property.title}</h2>

                  <div className="flex items-center gap-2 mt-3 text-gray-500">
                    <i className="ri-map-pin-2-fill text-lg"></i>
                    <span>{property.location}, Nepal</span>
                  </div>

                  <div className="flex items-center gap-5 mt-5">
                    <div className="flex items-center gap-2">
                      <i className="ri-star-fill text-yellow-400"></i>
                      <span className="font-semibold">4.8</span>
                    </div>

                    <span className="text-gray-400">(23 Reviews)</span>
                  </div>
                </div>

                <div className="text-left lg:text-right">
                  <h2 className="text-5xl font-bold">Rs {property.price}</h2>
                  <p className="text-gray-500 mt-2">per month</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
              <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
                <i className="ri-hotel-bed-fill text-4xl"></i>
                <p className="mt-4 text-gray-500">Bedrooms</p>
                <h3 className="font-bold text-2xl">{property.bedrooms}</h3>
              </div>

              <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
                <i className="ri-showers-fill text-4xl"></i>
                <p className="mt-4 text-gray-500">Bathrooms</p>
                <h3 className="font-bold text-2xl">{property.bathrooms}</h3>
              </div>

              <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
                <i className="ri-ruler-2-line text-4xl"></i>
                <p className="mt-4 text-gray-500">Area</p>
                <h3 className="font-bold text-2xl">1200 sqft</h3>
              </div>

              <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
                <i className="ri-home-4-fill text-4xl"></i>
                <p className="mt-4 text-gray-500">Type</p>
                <h3 className="font-bold text-2xl">{property.type}</h3>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">
              <h2 className="text-2xl font-bold mb-6">Description</h2>
              <p className="text-gray-600 leading-8">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">
              <h2 className="text-2xl font-bold mb-6">Amenities</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {property.facilities.map((item) => (
                  <div
                    key={item}
                    className="border rounded-2xl p-5 flex items-center gap-4 hover:bg-black hover:text-white duration-300 cursor-pointer"
                  >
                    {item === "Parking" && (
                      <i className="ri-parking-box-fill text-2xl"></i>
                    )}

                    {item === "WiFi" && (
                      <i className="ri-wifi-fill text-2xl"></i>
                    )}

                    {item === "Swimming Pool" && (
                      <i className="ri-water-flash-fill text-2xl"></i>
                    )}

                    {item === "Gym" && (
                      <i className="ri-heart-pulse-fill text-2xl"></i>
                    )}

                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">
              <h2 className="text-2xl font-bold mb-6">Property Details</h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500">Property Type</p>
                  <h3 className="font-semibold mt-1">{property.type}</h3>
                </div>

                <div>
                  <p className="text-gray-500">Status</p>
                  <h3 className="font-semibold mt-1">Available</h3>
                </div>

                <div>
                  <p className="text-gray-500">Bedrooms</p>
                  <h3 className="font-semibold mt-1">{property.bedrooms}</h3>
                </div>

                <div>
                  <p className="text-gray-500">Bathrooms</p>
                  <h3 className="font-semibold mt-1">{property.bathrooms}</h3>
                </div>

                <div>
                  <p className="text-gray-500">Area</p>
                  <h3 className="font-semibold mt-1">1200 sqft</h3>
                </div>

                <div>
                  <p className="text-gray-500">Furnished</p>
                  <h3 className="font-semibold mt-1">Yes</h3>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">
              <h2 className="text-2xl font-bold mb-6">Location</h2>

              <div className="rounded-2xl overflow-hidden">
                <iframe
                  title="map"
                  src="https://maps.google.com/maps?q=Kathmandu&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-80"
                />
              </div>
            </div>
          </div>
          {/* End of Left Column */}

          {/* ================= RIGHT SIDEBAR ================= */}
          <div>
            <div className="sticky top-8 space-y-6">
              {/* Price Card */}
              <div className="bg-white rounded-3xl shadow-sm p-7">
                <p className="text-gray-500">Monthly Rent</p>

                <h2 className="text-4xl font-bold mt-2">Rs {property.price}</h2>

                <p className="text-gray-400">/ month</p>

                <button className="w-full mt-8 bg-black text-white py-4 rounded-xl hover:bg-gray-800 duration-300">
                  Contact Owner
                </button>

                <button className="w-full mt-3 border py-4 rounded-xl hover:bg-gray-100 duration-300">
                  <i className="ri-whatsapp-line mr-2"></i>
                  WhatsApp
                </button>

                <button className="w-full mt-3 border py-4 rounded-xl hover:bg-gray-100 duration-300">
                  <i className="ri-heart-line mr-2"></i>
                  Save Property
                </button>
              </div>

              {/* Owner Card */}
              <div className="bg-white rounded-3xl shadow-sm p-7">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt="Owner"
                    className="w-16 h-16 rounded-full"
                  />

                  <div>
                    <h3 className="font-bold">John Doe</h3>
                    <p className="text-gray-500 text-sm">Verified Landlord</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Listings</span>
                    <span className="font-semibold">18</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Rating</span>
                    <span className="font-semibold">⭐ 4.9</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Response</span>
                    <span className="font-semibold text-green-600">5 mins</span>
                  </div>
                </div>
              </div>

              {/* Report Card */}
              <div className="bg-white rounded-3xl shadow-sm p-7">
                <button className="w-full text-red-500 border border-red-200 py-3 rounded-xl hover:bg-red-50 duration-300">
                  <i className="ri-flag-line mr-2"></i>
                  Report Listing
                </button>
              </div>
            </div>
          </div>
          {/* End of Right Sidebar */}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
