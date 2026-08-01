import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Components/AuthContext";
const Navbar = () => {
  const [islogin, setisLogin] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { login, setLogin } = useAuth();
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      setLogin(false);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className=" sticky top-0 z-50 w-full  px-4 sm:px-6 py-3 md:py-0 flex flex-col sm:flex-row items-center justify-between bg-red-200  gap-1   ">
      {/* <div className="flex  gap-6 items-center  "> */}
      <div className="h-16  overflow-hidden">
        <a href="/" className="text-l sm:text-xl">
          <img src={logo} alt="Logo" className=" h-18 w-18 object-cover" />
        </a>
      </div>
      <Link to="/listing">Listing</Link>
      <Link to="/dashboard">Dashboard</Link>
      {!login ? (
        <button
          onClick={() => navigate("/auth")}
          className="sm:hidden flex items-center justify-center bg-black text-white rounded-full h-8 w-8"
        >
          <i className="ri-user-line text-sm"></i>
        </button>
      ) : (
        <button
          onClick={() => navigate("/dashboard")}
          className="sm:hidden flex items-center justify-center bg-black text-white rounded-full h-8 w-8"
        >
          <i className="ri-user-line text-sm"></i>
        </button>
      )}
      {/* </div> */}
      <div className="flex gap-4 items-center  w-full sm:w-auto  ">
        {/* Search bar can be added here if needed in the future. */}
        {/* <div className=" bg-white w-full  flex rounded-full py-1.5 px-5 border-2 border-gray-200 ">
          <i className="ri-search-line mx-2"></i>
          <input
            type="text"
            placeholder="Search areas..."
            className="outline-0"
          />
        </div> */}
        {/* Post Property */}
        {/* <div className="hidden md:block bg-black py-2 w-full rounded-3xl text-white px-5 cursor-pointer">
          <Link to="/post">Post Property</Link>
        </div> */}
        <div className="hidden sm:flex">
          {login ? (
            <div className="relative">
              <div
                onClick={() => setOpen(!open)}
                className="flex bg-black rounded-full p-3 h-10 w-10 items-center justify-center cursor-pointer"
              >
                <i className="ri-user-line text-white"></i>
              </div>

              {open && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border w-40 z-50">
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="bg-black py-2 px-5 rounded-3xl text-white cursor-pointer hover:bg-gray-800"
              onClick={() => navigate("/auth")}
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
