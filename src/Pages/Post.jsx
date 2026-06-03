import React from "react";

const Post = () => {
  const Facilities = [
    "WiFi",
    "Air Conditioning",
    "Balcony",
    "Garden",
    "Swimming Pool",
    "Security",
    "Gym",
    "Elevator",
    "Parking",
    "Furnished",
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Post Property</h1>
          <p className="text-gray-600">
            Fill the form below to publish your property.
          </p>
        </div>

        <form className="space-y-6">
          {/* Adds vertical spacing between child elements inside a container. */}
          {/* BASIC DETAILS */}
          <div className="bg-white  shadow-2xl rounded-xl p-5">
            <h2 className="font-semibold text-lg mb-4">Basic Details</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm">Property Title</label>
                <input
                  type="text"
                  placeholder="Enter property title"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm">Property Type</label>
                <select className="w-full mt-1 border border-gray-500 rounded-lg p-2">
                  <option>Select Type</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Villa</option>
                  <option>Office</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Property Status</label>
                <select className="w-full mt-1 border border-gray-500 rounded-lg p-2">
                  <option>Select Status</option>
                  <option>For Sale</option>
                  <option>For Rent</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="text-sm">Description</label>
                <textarea
                  rows="4"
                  placeholder="Enter property description"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>
            </div>
          </div>
          {/* PRICING & LOCATION */}
          <div className="bg-white shadow-2xl rounded-xl p-5">
            <h2 className="font-semibold text-lg mb-4">Pricing & Location</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm">Price</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm">Currency</label>
                <select className="w-full mt-1 border border-gray-500 rounded-lg p-2">
                  <option>USD ($)</option>
                  <option>NPR (Rs)</option>
                  <option>INR (₹)</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Negotiable</label>
                <select className="w-full mt-1 border border-gray-500  rounded-lg p-2">
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Country</label>
                <select className="w-full mt-1 border border-gray-500 rounded-lg p-2">
                  <option>Select Country</option>
                  <option>Nepal</option>
                  <option>India</option>
                </select>
              </div>

              <div>
                <label className="text-sm">City</label>
                <select className="w-full mt-1 border border-gray-500 rounded-lg p-2">
                  <option>Select City</option>
                  <option>Kathmandu</option>
                  <option>Pokhara</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Address</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>

              <div className="md:col-span-3">
                <label className="text-sm">Location on Map (Optional)</label>
                <input
                  type="text"
                  placeholder="Search location on Google Maps"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>
            </div>
          </div>
          {/* PROPERTY DETAILS */}
          <div className="bg-white shadow-2xl rounded-xl p-5">
            <h2 className="font-semibold text-lg mb-4">Property Details</h2>

            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm">Area (sq ft)</label>
                <input
                  type="number"
                  placeholder="Enter area"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm">Bedrooms</label>
                <input
                  type="number"
                  placeholder="Enter bedrooms"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm">Bathrooms</label>
                <input
                  type="number"
                  placeholder="Enter bathrooms"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm">Floors</label>
                <input
                  type="number"
                  placeholder="Enter floors"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm">Parking Spaces</label>
                <input
                  type="number"
                  placeholder="Parking spaces"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm">Year Built</label>
                <input
                  type="number"
                  placeholder="Year built"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>
            </div>
          </div>
          {/* Facilities */}
          <div className="bg-white shadow-2xl rounded-xl p-5">
            <h2 className="font-semibold text-lg mb-4">Facilities</h2>

            <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-3">
              {Facilities.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 border border-gray-500 rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                >
                  <input type="checkbox" />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>
          {/* PROPERTY IMAGES */}
          <div className="bg-white shadow-2xl rounded-xl p-5">
            <h2 className="font-semibold text-lg mb-4">Property Images</h2>

            <div className="border-2 border-dashed rounded-xl p-10 text-center">
              <input type="file" multiple accept="image/*" className="mb-3" />
            </div>
          </div>
          {/* CONTACT INFORMATION */}
          <div className="bg-white shadow-2xl rounded-xl p-5">
            <h2 className="font-semibold text-lg mb-4">Contact Information</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />I agree to the Terms & Conditions
              </label>
            </div>
          </div>
          {/* BUTTONS */}
          <div className="flex justify-between">
            <a
              href="/"
              className="shadow-2xl px-6 py-3 rounded-lg bg-white hover:bg-gray-100"
            >
              Cancel
            </a>

            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-lg "
            >
              Publish Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
