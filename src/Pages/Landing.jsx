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

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API_URL}/listing/all`);
        setProperties(res.data.properties || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);
  return (
    <div className="relative">
      <div className="sticky top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="min-h-screen  min-w-full -mt-20   md:-mt-16">
        <div
          className="min-h-[70vh] md:min-h-screen w-full  lpage relative flex flex-col  justify-center gap-10  bg-cover bg-center  "
          style={{ backgroundImage: `url(${LandingIMG})` }} // hero from olld img
        >
          <div className="absolute z-0 inset-0 bg-linear-to-r from-black/50 to-transparent"></div>
          {/* <div className="absolute inset-0 bg-black/20"></div> */}
          <div className="  flex z-10 flex-col justify-center gap-6  m-10  md:mx-20 lg:mx-20 mt-32   ">
            <div className="text-4xl  md:text-6xl font-bold leading-tight text-white text-left">
              Find your next <br /> home in{" "}
              <span className="text-[#e8b75c] font-bold">Nepal</span>
            </div>
            <p className="  md:text-xl  m-1 md:m-0 text-white text-left">
              Buy, Sell, Rent properties with ease.
              <br />
              Trusted by thousands of users across Nepal.
            </p>
            <Searchbar />
          </div>
        </div>
        <div className="min-h-screen w-full bg-gray-50">
          <div className="flex flex-col justify-center lg:mx-20 gap-1  p-4  md:p-10 text-2xl font-bold  ">
            <div className="w-full flex flex-col justify-center items-center gap-3   md:p-1 text-2xl font-bold  ">
              <h1 className=" w-full md:text-left text-lg">
                HANDPICKED FOR YOU
              </h1>
              <h1 className="w-full  text-4xl  md:text-left  mb-5">
                Featured Listing
              </h1>
            </div>
            <div className="listings grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full max-w-7xl mx-auto">
              {loading
                ? Array(6)
                    .fill(0)
                    .map((_, i) => <ListItemSkeleton key={i} />)
                : properties.map((property) => (
                    <List_item key={property._id} property={property} />
                  ))}
              {/* {data.map((item) => (
                  <List_item
                    key={item.id}
                    image={item.image}
                    text={item.text}
                  />
                ))} */}
            </div>
          </div>
        </div>
        {/* <div className="w-full ">
          <img src={aboutimg} className="h-full w-full" alt="" />
        </div> */}
        <AboutNestra id="about" />
        <div className="info min-h-[50vh] w-full bg-gray-100 flex flex-col justify-center items-center py-16 gap-5 ">
          <div className="txt-info font-bold text-2xl">Why Choose NESTRA?</div>
          <div className="box-info grid grid-cols-1 md:grid-cols-3 md:gap-20   ">
            <InfoBox />
            <div className="w-full sm:w-72 md:w-80 flex flex-col justify-center items-center gap-3 rounded-2xl p-5 ">
              <div className="bg-white h-14 w-14 sm:h-16 sm:w-16 rounded-full flex justify-center items-center text-black text-2xl">
                <i className="ri-search-line"></i>
              </div>

              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center">
                Smart Search
              </h1>

              <p className="text-center text-xs sm:text-sm text-gray-600">
                Find your ideal room, apartment, or house using location, price,
                property type, and amenities.
              </p>
            </div>
            <div className="w-full sm:w-72 md:w-80 flex flex-col justify-center items-center gap-3 rounded-2xl p-5 ">
              <div className="bg-white h-14 w-14 sm:h-16 sm:w-16 rounded-full flex justify-center items-center text-black text-2xl">
                <i className="ri-chat-3-line"></i>
              </div>

              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center">
                Direct Contact
              </h1>

              <p className="text-center text-xs sm:text-sm text-gray-600">
                Connect directly with property owners without unnecessary
                middlemen for faster communication.
              </p>
            </div>
          </div>
        </div>
        <HowItWorks />

        {/* <Stats /> */}

        <Testimonials id="review" />

        {/* <PropertyCTA /> */}
        <footer className=" w-full flex flex-col justify-center items-center  ">
          {/* <div className="h-0.5 w-full bg-gray-400 "></div> */}
          <div className="  w-full flex flex-col md:flex-row justify-between items-start bg-black/95 text-white gap-10 p-6 md:p-10  ">
            <div className="flex flex-col w-full md:w-1/3 gap-3 text-center md:text-left">
              <h1>
                <b>NesTra</b>
              </h1>
              <p>
                Nepal's trusted community-driven rental marketplace. We make
                finding and listing rental properties simple, transparent, and
                direct.
              </p>
            </div>
            <div className="flex flex-col w-full md:w-1/4 gap-3 text-center md:text-center ">
              <h1>QUICK LINKS</h1>
              <ol className="flex flex-col gap-3  text-gray-100 ">
                <li>
                  <a href="/Rent_UI/">Home</a>
                </li>
                <li>
                  <a href="/Rent_UI/listing/">Buy</a>
                </li>
                <li>
                  <a href="/Rent_UI/listing">Rent</a>
                </li>

                <li>
                  <a href="/Rent_UI/listing">Sell</a>
                </li>
              </ol>
            </div>
            <div className="flex flex-col w-full md:w-1/4 gap-3 text-center  ">
              <h1>LEGAL</h1>
              <ol className="flex flex-col gap-3 text-gray-100 ">
                <li>
                  <a href="/">Terms of Service</a>
                </li>
                <li>
                  <a href="/">Privacy Policy</a>
                </li>
              </ol>
            </div>
          </div>
          {/* <div className="h-0.5 w-full bg-gray-400"></div> */}

          <div className="w-full h-20 bg-black text-white flex justify-center items-center ">
            <p>&copy; 2022 NesTra. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
