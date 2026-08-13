import React from "react";
import { useNavigate } from "react-router-dom";
import aboutimg from "../assets/about_img.png";
const AboutNestra = ({ id }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "ri-shield-check-line",
      title: "Verified Listings",
      text: "Every property is verified for authenticity and peace of mind.",
    },
    {
      icon: "ri-search-line",
      title: "Smart Search",
      text: "Find the right property faster with advanced filters and location search.",
    },
    {
      icon: "ri-home-5-line",
      title: "Easy & Transparent",
      text: "Clear information, real images, and no hidden surprises.",
    },
    {
      icon: "ri-group-line",
      title: "Built for Nepal",
      text: "Designed for our community and the way we live.",
    },
  ];

  return (
    <section
      id={id}
      className="scroll-smooth w-full bg-[#f8f5ef] overflow-hidden"
    >
      <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center px-8 py-16 md:px-12 lg:px-16 xl:px-20">
          {/* Small heading */}
          <div className="mb-5">
            <p className="text-[#9b7135] text-sm font-medium tracking-wide">
              ABOUT NESTRA
            </p>

            <div className="w-12 h-[2px] bg-[#9b7135] mt-4"></div>
          </div>

          {/* Main heading */}
          <h2 className="font-serif text-4xl md:text-5xl xl:text-5xl font-bold leading-[1.05] text-[#171717] max-w-xl">
            Find. Rent. Live.
            <br />
            The NESTRA Way.
          </h2>

          {/* Description */}
          <div className="mt-8 space-y-5 text-[#292929] text-base md:text-lg leading-7 max-w-xl">
            <p>
              NESTRA is Nepal's trusted real estate marketplace that makes
              finding, renting, and listing properties simple, transparent, and
              reliable.
            </p>

            <p>
              Whether you're looking for your next home, an investment property,
              or the perfect rental, NESTRA connects you with verified listings,
              smart search features, and a seamless experience.
            </p>

            <p>
              Our mission is to build a better way to discover properties and
              create communities people love.
            </p>
          </div>

          {/* Features */}
          <div className="mt-8 border-t border-[#ddd4c7] pt-7 grid grid-cols-2 md:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`px-4 first:pl-0 ${
                  index !== 0 ? "border-l border-[#ddd4c7]" : ""
                }`}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-[#eee6d9] flex items-center justify-center mb-4">
                  <i className={`${feature.icon} text-2xl text-[#9b7135]`}></i>
                </div>

                <h3 className="font-semibold text-sm text-[#171717]">
                  {feature.title}
                </h3>
                {/* 
                <p className="text-xs md:text-sm text-gray-600 leading-5 mt-2">
                  {feature.text}
                </p> */}
              </div>
            ))}
          </div>

          {/* Button */}
          <button
            onClick={() => navigate("/listing")}
            className="mt-9 w-fit bg-[#9b7135] hover:bg-[#805b29] text-white px-7 py-3.5 rounded-full transition-all duration-300 flex items-center gap-3"
          >
            <span>Explore Properties</span>
            <i className="ri-arrow-right-line text-lg"></i>
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative hidden md:block min-h-[500px] lg:min-h-full">
          <img
            src={aboutimg}
            alt="NESTRA modern living space"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutNestra;
