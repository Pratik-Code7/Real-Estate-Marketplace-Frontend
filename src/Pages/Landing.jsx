import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import hero from "../assets/hero.png";
import { useEffect } from "react";
import Searchbar from "../Components/Searchbar";
import video from "../assets/video.mp4";
import List_item from "../Components/List_item";
import InfoBox from "../Components/InfoBox";
import ListItemSkeleton from "../Components/ListItemSkeleton";
const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const [loading, setLoading] = useState(true);
  const data = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      text: "Modern Luxury Villa",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      text: "City Apartment",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      text: "Cozy Family House",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      text: "Beachside Property",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
      text: "Mountain Cabin",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      text: "Beachside Property",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="min-h-screen  min-w-full  ">
        <div
          className="min-h-[70vh] md:min-h-[95vh] w-full  lpage relative flex flex-col  justify-center gap-10  bg-cover bg-center  "
          style={{ backgroundImage: `url(${hero})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>

          <div className="absolute z-10 flex flex-col justify-center gap-6  mx-10   ">
            <div className="text-4xl  md:text-5xl font-bold leading-tight text-left">
              Find your next <br /> home in Nepal
            </div>
            <p className="  md:text-xl  ">
              Buy, Sell, Rent properties with ease.
              <br />
              Trusted by thousands of users across Nepal.
            </p>
            <Searchbar />
          </div>
        </div>
        <div className="min-h-screen w-full bg-white">
          <div className="flex flex-col justify-center items-center gap-5 p-4 md:p-10 text-2xl font-bold  ">
            <h1 className="w-full text-center md:text-left  md:pl-14">
              Featured Listing
            </h1>
            <div className="listings grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full max-w-7xl mx-auto">
              {loading
                ? Array(6)
                    .fill(0)
                    .map((_, i) => <ListItemSkeleton key={i} />)
                : data.map((item) => (
                    <List_item
                      key={item.id}
                      image={item.image}
                      text={item.text}
                    />
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

        <div className="info min-h-[50vh] w-full bg-gray-200 flex flex-col justify-center items-center py-16 gap-5 ">
          <div className="txt-info font-bold text-2xl">
            Why Choose HamroRent?
          </div>
          <div className="box-info grid grid-cols-1 md:grid-cols-3 md:gap-20   ">
            <InfoBox />
            <InfoBox />
            <InfoBox />
          </div>
        </div>
        <footer className=" w-full flex flex-col justify-center items-center  ">
          {/* <div className="h-0.5 w-full bg-gray-400 "></div> */}
          <div className="  w-full flex flex-col md:flex-row justify-between items-start gap-10 p-6 md:p-10  ">
            <div className="flex flex-col w-full md:w-1/3 gap-3 text-center md:text-left">
              <h1>
                <b>HamroRent</b>
              </h1>
              <p>
                Nepal's trusted community-driven rental marketplace. We make
                finding and listing rental properties simple, transparent, and
                direct.
              </p>
            </div>
            <div className="flex flex-col w-full md:w-1/4 gap-3 text-center md:text-center ">
              <h1>QUICK LINKS</h1>
              <ol className="flex flex-col gap-3  text-gray-700 ">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/">Buy</a>
                </li>
                <li>
                  <a href="/">Rent</a>
                </li>

                <li>
                  <a href="/">Sell</a>
                </li>
              </ol>
            </div>
            <div className="flex flex-col w-full md:w-1/4 gap-3 text-center  ">
              <h1>LEGAL</h1>
              <ol className="flex flex-col gap-3 text-gray-700 ">
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

          <div className="w-full h-20 bg-gray-100 flex justify-center items-center ">
            <p>&copy; 2023 HamroRent. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;
