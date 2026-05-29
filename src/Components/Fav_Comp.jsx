import React from "react";
import Favorites from "./Favorites";
const Fav_Comp = () => {
  const properties = [
    {
      id: 1,
      title: "Modern Apartment",
      img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Luxury Villa",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "Cozy Cottage",
      img: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      title: "City Penthouse",
      img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 5,
      title: "Beach House",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 6,
      title: "Mountain Cabin",
      img: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
    },
  ];
  return (
    <div className="dash-right h-full  w-full flex flex-wrap   p-10  gap-10 ">
      {properties.map((elem) => (
        <div className="bg-gray-500 h-80 w-86 rounded-2xl overflow-hidden shadow-2xl relative">
          <div className="absolute h-[68%] flex  flex-col  w-full justify-between items-center gap-2 ">
            <div className="w-full px-5 py-2 flex justify-end">
              <div className="heart    rounded-full h-8 w-8 flex justify-center  items-center bg-white text-red-600">
                <i className="ri-heart-line"></i>
              </div>
            </div>
            <div className="w-full flex text-xs justify-between py-3 px-3">
              <div className="px-5 py-1 flex justify-center items-center bg-white rounded-2xl">
                Apartment
              </div>
              <div className="px-5 py-1 flex justify-center items-center text-sm bg-white rounded-lg ">
                Rs $10000/mo
              </div>
            </div>
          </div>
          <div className="image h-[68%] w-full ">
            <img
              src={elem.img}
              alt="Property"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="list-text bg-white w-full h-[32%] px-4 py-2 text-[1rem] gap-0.15 flex flex-col justify-between  ">
            {elem.title}
            <div className="flex items-center gap-2  text-gray-700 ">
              <i className="ri-map-pin-2-fill"></i>
              <p className=" text-xs">Lorem ipsum dolor sit amet</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
              <div className="flex justify-center items-center bg-gray-200 h-7 rounded-[10px] py-1 px-3">
                1 Room
              </div>
              <div className="flex justify-center items-center bg-gray-200 h-7 rounded-[10px] py-1 px-3">
                2 Bath
              </div>
              <div className="flex justify-center items-center bg-gray-200 h-7 rounded-[10px] py-1 px-3">
                1200 sqft
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fav_Comp;
