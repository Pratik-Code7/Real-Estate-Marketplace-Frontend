import React, { use, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate, Navigate } from "react-router-dom";
const Navbar = () => {
  const [login, setlogin] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className=" gap-1 md:gap-5 px-5 sticky top-0 z-50 flex flex-col sm:flex-row w-full  items-center justify-between bg-white h-16    ">
      <div className="flex  gap-6 items-center  ">
        <div className="h-16 w-30">
          <a href="/" className="text-l sm:text-xl">
            <img
              src={logo}
              alt="Logo"
              className=" h-full w-full object-cover "
            />
          </a>
        </div>
        <Link to="/listing">Listing</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className="flex gap-4 items-center py-2 md:py-0 ">
        <div className=" bg-white flex rounded-full py-1.5 px-5 border-2 border-gray-200 ">
          <i className="ri-search-line mx-2"></i>
          <input
            type="text"
            placeholder="Search areas..."
            className="outline-0"
          />
        </div>
        <div className="hidden md:block bg-black py-2 rounded text-white px-5 cursor-pointer">
          Post Property
        </div>
        {login ? (
          <div className="flex icon bg-black rounded-full p-3 h-10 w-10  items-center justify-center">
            <i className="ri-user-line text-white"></i>
          </div>
        ) : (
          <div
            className="  bg-black py-2 px-5 rounded text-white cursor-pointer"
            onClick={() => {
              navigate("/auth");
              setlogin(true);
            }}
          >
            Login
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
