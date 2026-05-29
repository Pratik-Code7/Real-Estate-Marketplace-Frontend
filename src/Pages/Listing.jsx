import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Favorites from "../Components/Favorites";
import Fav_Comp from "../Components/Fav_Comp";
const Listing = () => {
  const [active, setactive] = useState(0);
  const dashList = [
    "My Properties",
    "Favorites",
    "Notifications",
    "Profile Settings",
  ];
  return (
    <div className="h-screen  w-full bg-gray-100 overflow-hidden">
      <Navbar />
      <div className="Dash-Box flex  items-center h-full justify-center  ">
        <div className=" bg-white h-full w-1/4  flex flex-col gap-2 p-5 "></div>
        <Fav_Comp />
      </div>
    </div>
  );
};

export default Listing;
