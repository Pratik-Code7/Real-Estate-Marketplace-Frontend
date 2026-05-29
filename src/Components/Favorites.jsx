import React, { useState } from "react";
import Fav_Comp from "./Fav_Comp";

const Favorites = () => {
  // const [like, setlike] = useState(false);
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
    <div className="dash-right h-full overflow-y-auto  w-full flex flex-wrap gap-10 ">
      <Fav_Comp />
      <div className="w-full h-24 p-20 mx-10 mb-20 bg-white  rounded-2xl flex justify-center items-center  gap-10">
        <div className="bg-gray-100 rounded-full text-4xl  h-18 w-18 flex justify-center items-center">
          <i class="ri-folder-open-fill"></i>
        </div>
        <div className="w-72">
          <h1 className="font-bold">Save properties you love</h1>
          <p>
            Click the heart icon on any property to save it for easy access
            later
          </p>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
