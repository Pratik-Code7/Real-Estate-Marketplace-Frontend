import { useState } from "react";
import Navbar from "../Components/Navbar";
import hero from "../assets/hero.png";
import Property from "../Components/Property";
import Favorites from "../Components/Favorites";
import Messages from "../Components/Messages";
import Profile from "../Components/Profile";
const DashBoard = () => {
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
        <div className=" bg-white h-full w-1/4  flex flex-col gap-2 p-5 ">
          {dashList.map((elem, idx) => (
            <div
              key={idx}
              onClick={() => {
                setactive(idx);
              }}
              className={
                active == idx
                  ? "bg-black text-white p-3 rounded  cursor-pointer"
                  : "p-3 rounded  cursor-pointer hover:bg-gray-100"
              }
            >
              {elem}
            </div>
          ))}
        </div>
        {active == 0 && <Property />}
        {active == 1 && <Favorites />}
        {active == 2 && <Messages />}
        {active == 3 && <Profile />}
      </div>
    </div>
  );
};

export default DashBoard;
