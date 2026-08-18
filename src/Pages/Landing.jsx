import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import hero from "../assets/hero.png";
import limg from "../assets/new limg.png";
import { useEffect } from "react";
import LandingIMG from "../assets/landingIMG.png";
import Searchbar from "../Components/Searchbar";
import video from "../assets/video.mp4";
import List_item from "../Components/List_item";
import InfoBox from "../Components/InfoBox";
import ListItemSkeleton from "../Components/ListItemSkeleton";
import axios from "axios";
import aboutimg from "../assets/about_img.png";
import about from "../Components/AboutNestra";
import AboutNestra from "../Components/AboutNestra";
import HowItWorks from "../Components/HowItWorks";
import Stats from "../Components/Stats";
import Testimonials from "../Components/Testimonials";
import PropertyCTA from "../Components/PropertyCTA";
const Landing = () => {
  const API_URL = "http://localhost:3000/api";
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/listing/all?limit=${visibleCount}`,
        );
        setProperties(res.data.properties || []);
        setHasMore(res.data.hasMore || false);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const newCount = visibleCount + 3;
      const res = await axios.get(`${API_URL}/listing/all?limit=${newCount}`);
      setProperties(res.data.properties || []);
      setVisibleCount(newCount);
      setHasMore(res.data.hasMore || false);
    } catch (error) {
      console.error("Error loading more properties:", error);
    } finally {
      setLoadingMore(false);
    }
  };
  return (
    <div className="relative">
      <div className="sticky top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="min-h-screen min-w-full -mt-20 md:-mt-16">
        <div
          className="min-h-[70vh] md:min-h-screen w-full lpage relative flex flex-col justify-center gap-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${LandingIMG})` }}
        >
          <div className="absolute z-0 inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          <div className="flex z-10 flex-col justify-center gap-6 m-10 md:mx-20 lg:mx-20 mt-32">
            <div className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white text-left">
              Find your next <br /> home in{" "}
              <span className="text-[#e8b75c] font-bold">Nepal</span>
            </div>
            <p className="md:text-lg lg:text-xl m-1 md:m-0 text-white/90 text-left max-w-2xl">
              Buy, Sell, Rent properties with ease.
              <br />
              Trusted by thousands of users across Nepal.
            </p>
            <Searchbar />
          </div>
        </div>
        <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
          <div className="flex flex-col justify-center lg:mx-20 gap-1 p-4 md:p-10 lg:p-16">
            <div className="w-full flex flex-col justify-center items-center gap-3 md:p-1 mb-8">
              <h1 className="w-full md:text-left text-sm md:text-base font-semibold text-gray-500 tracking-wider uppercase">
                Handpicked for you
              </h1>
              <h1 className="w-full text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 md:text-left">
                Featured Listings
              </h1>
              <div className="w-20 h-1 bg-[#e8b75c] md:self-start"></div>
            </div>
            <div className="listings grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto">
              {loading
                ? Array(6)
                    .fill(0)
                    .map((_, i) => <ListItemSkeleton key={i} />)
                : properties.map((property) => (
                    <List_item key={property._id} property={property} />
                  ))}
            </div>
            {!loading && hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105"
                >
                  {loadingMore ? "Loading..." : "Load More Properties"}
                </button>
              </div>
            )}
          </div>
        </div>
        <AboutNestra id="about" />
        <div className="info min-h-[50vh] w-full bg-gradient-to-b from-white to-gray-50 flex flex-col justify-center items-center py-20 gap-8">
          <div className="text-center">
            <h2 className="text-sm md:text-base font-semibold text-gray-500 tracking-wider uppercase mb-2">
              Why Choose Us
            </h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Why Choose NESTRA?
            </h1>
            <div className="w-20 h-1 bg-[#e8b75c] mx-auto mt-4"></div>
          </div>
          <div className="box-info grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto px-4">
            <InfoBox />
            <div className="w-full sm:w-72 md:w-80 flex flex-col justify-center items-center gap-4 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-[#e8b75c] to-[#d4a84b] h-16 w-16 sm:h-20 sm:w-20 rounded-full flex justify-center items-center text-white text-2xl sm:text-3xl shadow-md">
                <i className="ri-search-line"></i>
              </div>

              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-900">
                Smart Search
              </h2>

              <p className="text-center text-sm sm:text-base text-gray-600 leading-relaxed">
                Find your ideal room, apartment, or house using location, price,
                property type, and amenities.
              </p>
            </div>
            <div className="w-full sm:w-72 md:w-80 flex flex-col justify-center items-center gap-4 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-[#e8b75c] to-[#d4a84b] h-16 w-16 sm:h-20 sm:w-20 rounded-full flex justify-center items-center text-white text-2xl sm:text-3xl shadow-md">
                <i className="ri-chat-3-line"></i>
              </div>

              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-900">
                Direct Contact
              </h2>

              <p className="text-center text-sm sm:text-base text-gray-600 leading-relaxed">
                Connect directly with property owners without unnecessary
                middlemen for faster communication.
              </p>
            </div>
          </div>
        </div>
        <HowItWorks />

        <Testimonials id="review" />

        <footer className="w-full flex flex-col justify-center items-center bg-gray-900">
          <div className="w-full flex flex-col md:flex-row justify-between items-start text-white gap-10 p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
            <div className="flex flex-col w-full md:w-1/3 gap-4 text-center md:text-left">
              <h1 className="text-2xl font-bold">
                <span className="text-[#e8b75c]">Nes</span>Tra
              </h1>
              <p className="text-gray-400 leading-relaxed">
                Nepal's trusted community-driven rental marketplace. We make
                finding and listing rental properties simple, transparent, and
                direct.
              </p>
            </div>
            <div className="flex flex-col w-full md:w-1/4 gap-4 text-center md:text-center">
              <h1 className="text-lg font-semibold mb-2">QUICK LINKS</h1>
              <ul className="flex flex-col gap-3 text-gray-300">
                <li>
                  <a
                    href="/"
                    className="hover:text-[#e8b75c] transition-colors duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/listing"
                    className="hover:text-[#e8b75c] transition-colors duration-300"
                  >
                    Buy
                  </a>
                </li>
                <li>
                  <a
                    href="/listing"
                    className="hover:text-[#e8b75c] transition-colors duration-300"
                  >
                    Rent
                  </a>
                </li>
                <li>
                  <a
                    href="/listing"
                    className="hover:text-[#e8b75c] transition-colors duration-300"
                  >
                    Sell
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col w-full md:w-1/4 gap-4 text-center">
              <h1 className="text-lg font-semibold mb-2">LEGAL</h1>
              <ul className="flex flex-col gap-3 text-gray-300">
                <li>
                  <a
                    href="/"
                    className="hover:text-[#e8b75c] transition-colors duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-[#e8b75c] transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full border-t border-gray-800">
            <div className="w-full h-16 bg-gray-900 text-gray-400 flex justify-center items-center text-sm">
              <p>&copy; 2026 NesTra. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
