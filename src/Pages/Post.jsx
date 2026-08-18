import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
const API_URL = "http://localhost:3000/api";

const FACILITIES = [
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

const INITIAL_PROPERTY = {
  title: "",
  type: "",
  status: "",
  description: "",
  price: "",
  negotiable: "",
  country: "",
  location: "",
  address: "",
  area: "",
  bedroom: "",
  bathroom: "",
  floors: "",
  parking: "",
  yearBuilt: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  agreedToTerms: false,
};

const Post = ({ isAdmin = false }) => {
  const [images, setImages] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [property, setProperty] = useState(INITIAL_PROPERTY);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleFacility = (item) => {
    setFacilities((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item],
    );
  };

  const validate = () => {
    if (!property.title.trim()) {
      toast.error("Please enter a property title");
      return false;
    }
    if (!property.type || property.type === "Select Type") {
      toast.error("Please select a property type");
      return false;
    }
    if (!property.status || property.status === "Select Status") {
      toast.error("Please select a property status");
      return false;
    }
    if (!property.price) {
      toast.error("Please enter a price");
      return false;
    }
    if (!property.location || property.location === "Select City") {
      toast.error("Please select a city");
      return false;
    }
    if (images.length === 0) {
      toast.error("Please select at least one image");
      return false;
    }
    if (!property.agreedToTerms) {
      toast.error("You must agree to the Terms & Conditions");
      return false;
    }
    return true;
  };

  const publishProperty = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const uploadForm = new FormData();
      images.forEach((image) => uploadForm.append("images", image));

      const uploadRes = await axios.post(`${API_URL}/upload`, uploadForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Expecting either { imageUrl } for a single image or { imageUrls: [...] }
      const imageUrls = uploadRes.data.imageUrls || [uploadRes.data.imageUrl];

      const propertyData = {
        ...property,
        images: imageUrls,
        facilities,
      };

      const res = await axios.post(
        isAdmin ? `${API_URL}/property/admin/add` : `${API_URL}/property/add`,
        propertyData,
        {
          withCredentials: true,
        },
      );

      toast.success(
        res.data.message || "Property submitted for admin approval",
      );
      setProperty(INITIAL_PROPERTY);
      setFacilities([]);
      setImages([]);
    } catch (error) {
      console.error("Publish Property Error:", error);

      if (error.response) {
        toast.error(error.response.data.message || "Server Error");
      } else if (error.request) {
        toast.error("Cannot connect to the server.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Post Property</h2>
          <p className="text-gray-600 text-sm">
            Fill the form below to submit your property for admin approval.
          </p>
        </div>

        <form className="space-y-6" onSubmit={publishProperty}>
          {/* BASIC DETAILS */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-lg mb-4">Basic Details</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Property Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter property title"
                  value={property.title}
                  onChange={handleChange}
                  name="title"
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Property Type <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                  name="type"
                  value={property.type}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Property Status <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                  name="status"
                  value={property.status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  rows="4"
                  placeholder="Enter property description"
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                  name="description"
                  value={property.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* PRICING & LOCATION */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-lg mb-4">Pricing & Location</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={property.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Negotiable</label>
                <select
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                  name="negotiable"
                  value={property.negotiable}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Country</label>
                <select
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                  name="country"
                  value={property.country}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  <option value="Nepal">Nepal</option>
                  <option value="India">India</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                  name="location"
                  value={property.location}
                  onChange={handleChange}
                >
                  <option value="">Select City</option>
                  <option value="Kathmandu">Kathmandu</option>
                  <option value="Pokhara">Pokhara</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={property.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>
          </div>

          {/* PROPERTY DETAILS */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-lg mb-4">Property Details</h3>

            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">Area (sq ft)</label>
                <input
                  type="number"
                  name="area"
                  value={property.area}
                  onChange={handleChange}
                  placeholder="Enter area"
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Bedrooms</label>
                <input
                  type="number"
                  name="bedroom"
                  value={property.bedroom}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Bathrooms</label>
                <input
                  type="number"
                  name="bathroom"
                  value={property.bathroom}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Floors</label>
                <input
                  type="number"
                  name="floors"
                  value={property.floors}
                  onChange={handleChange}
                  placeholder="Enter floors"
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Parking Spaces</label>
                <input
                  type="number"
                  name="parking"
                  value={property.parking}
                  onChange={handleChange}
                  placeholder="Parking spaces"
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Year Built</label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={property.yearBuilt}
                  onChange={handleChange}
                  placeholder="Year built"
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>
          </div>

          {/* FACILITIES */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-lg mb-4">Facilities</h3>

            <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-3">
              {FACILITIES.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={facilities.includes(item)}
                    onChange={() => toggleFacility(item)}
                  />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* PROPERTY IMAGES */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-lg mb-4">
              Property Images <span className="text-red-500">*</span>
            </h3>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                className="mb-3"
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);

                  setImages((prev) => [...prev, ...selectedFiles]);

                  // Reset input so the same image can be selected again
                  e.target.value = "";
                }}
              />
              {images.length > 0 && (
                <p className="text-sm text-gray-600">
                  {images.length} image{images.length > 1 ? "s" : ""} selected
                </p>
              )}
              {images.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Property ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          {/* <div className="bg-white shadow-2xl rounded-xl p-5">
            <h2 className="font-semibold text-lg mb-4">Contact Information</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm">Your Name</label>
                <input
                  type="text"
                  name="contactName"
                  value={property.contactName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm">Phone Number</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={property.contactPhone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm">Email Address</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={property.contactEmail}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full mt-1 border border-gray-500 rounded-lg p-2"
                />
              </div>
            </div>
          </div> */}

          {/* TERMS & CONDITIONS */}
          <div className="border border-gray-200 rounded-xl p-5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={property.agreedToTerms}
                onChange={handleChange}
                className="mt-1"
              />
              <span className="text-sm">
                I agree to the Terms & Conditions{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                setProperty(INITIAL_PROPERTY);
                setFacilities([]);
                setImages([]);
              }}
              className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
            >
              Reset Form
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
            >
              {submitting ? "Submitting..." : "Submit Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
