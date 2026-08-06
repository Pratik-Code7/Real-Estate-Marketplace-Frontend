import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Components/AuthContext";
import img1 from "../assets/whiteimg.png";
import img2 from "../assets/2.png";
import img3 from "../assets/1.png";
import img4 from "../assets/3.png";
const Navbar = () => {
  const [islogin, setisLogin] = useState(false);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { login, setLogin } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const [scrolled, setScrolled] = useState(!isLanding);
  useEffect(() => {
    if (!isLanding) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLanding]);
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
    <nav
      className={`sticky top-0 z-50 w-full px-4 sm:px-6 py-2 md:py-0 flex flex-col sm:flex-row items-center justify-around gap-1 transition-all duration-300 ${
        scrolled ? "bg-white text-black " : "bg-transparent text-white"
      }`}
    >
      {" "}
      {/* <div className="flex  gap-6 items-center  "> */}
      <div className="h-16  overflow-hidden  flex items-center">
        <a
          href="/"
          className="text-l sm:text-xl flex justify-center items-center  font-bold text-white"
        >
          <img
            src={`${scrolled ? img3 : img1} `}
            alt="Logo"
            className=" h-10 w-10 object-contain "
          />
          <img
            src={`${scrolled ? img4 : img2} `}
            alt="Logo"
            className=" h-16 w-32 object-cover  "
          />
        </a>
      </div>
      <a href="#">Home</a>
      <Link to="/listing">Properties</Link>
      <Link to="/dashboard">Dashboard</Link>
      <a href="#">About</a>
      <a href="#">Contact</a>
      {!login ? (
        <button
          onClick={() => navigate("/auth")}
          className="sm:hidden flex items-center justify-center bg-black text-white rounded-full h-8 w-8"
        >
          <i className="ri-arrow-right-circle-line text-sm"></i>
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
                className="flex bg-transparent border  rounded-full p-3 h-10 w-10 items-center justify-center cursor-pointer"
              >
                <i
                  className={`ri-user-line ${scrolled ? "text-black" : "text-white"}`}
                ></i>
              </div>

              {open && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border w-40 z-50">
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      navigate("/post");
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Post Property
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
              className=" bg-linear-to-r from-orange-400 to-red-500 py-2 px-5 rounded-lg text-white cursor-pointer hover:bg-gray-800"
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
