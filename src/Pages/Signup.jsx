import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-white p-5">
      <div className="container bg-white rounded-2xl flex flex-col h-auto w-100 p-6 md:w-96">
        <div className="textbox flex justify-center items-center flex-col mt-3 gap-1">
          <h1 className="font-bold text-2xl">Create Account</h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>

        <div className="flex flex-col gap-2 px-5">
          <label htmlFor="name" className="mt-2">
            Full Name
          </label>
          <input type="text" id="name" placeholder="Full Name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />

          <label htmlFor="password">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="w-full"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="ri-eye-fill"></i>
              ) : (
                <i className="ri-eye-off-fill"></i>
              )}
            </button>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm Password"
              className="w-full"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <i className="ri-eye-fill"></i>
              ) : (
                <i className="ri-eye-off-fill"></i>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="bg-black text-white p-2.5 rounded-xl w-full mt-2"
          >
            Sign Up
          </button>

          <Link
            to="/auth"
            className="flex justify-center items-center text-sm p-1 mt-2"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
