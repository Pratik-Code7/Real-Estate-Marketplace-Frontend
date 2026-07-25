import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "tenant", // Remove if not needed
        },
      );

      toast.success(response.data.message || "Registration Successful");
      navigate("/");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-white p-5">
      <div className="container bg-white rounded-2xl flex flex-col h-auto w-100 p-6 md:w-96">
        <div className="textbox flex justify-center items-center flex-col mt-3 gap-1">
          <h1 className="font-bold text-2xl">Create Account</h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-5">
          <label htmlFor="name" className="mt-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <label htmlFor="password">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="w-full"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
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
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              required
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
        </form>
      </div>
    </div>
  );
};

export default Signup;
