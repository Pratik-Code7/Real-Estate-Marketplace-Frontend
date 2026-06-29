import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [login, setlogin] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className=" sticky top-0 z-50 w-full bg-white px-4 sm:px-6 py-3 md:py-0 flex flex-col sm:flex-row items-center justify-between  gap-1   ">
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
        {!login && (
          <button
            onClick={() => {
              navigate("/auth");
              setlogin(true);
            }}
            className="sm:hidden flex items-center justify-center bg-black text-white rounded-full h-8 w-8"
          >
            <i className="ri-user-line text-sm"></i>
          </button>
        )}
      </div>
      <div className="flex gap-4 items-center  w-full sm:w-auto  ">
        <div className=" bg-white w-full  flex rounded-full py-1.5 px-5 border-2 border-gray-200 ">
          <i className="ri-search-line mx-2"></i>
          <input
            type="text"
            placeholder="Search areas..."
            className="outline-0"
          />
        </div>
        <div className="hidden md:block bg-black py-2 w-full rounded-3xl text-white px-5 cursor-pointer">
          <Link to="/post">Post Property</Link>
        </div>
        <div className="hidden sm:flex">
          {login ? (
            <div className="flex icon bg-black rounded-full p-3 h-10 w-10  items-center justify-center">
              <i className="ri-user-line text-white"></i>
            </div>
          ) : (
            <div
              className="  bg-black py-2 px-5 rounded-3xl text-white cursor-pointer"
              onClick={() => {
                navigate("/auth");
                setlogin(true);
              }}
            >
              Login
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
