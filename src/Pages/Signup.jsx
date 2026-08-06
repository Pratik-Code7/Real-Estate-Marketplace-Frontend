import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import landingIMG from "../assets/landingIMG.png";
import "./Auth.css";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "tenant",
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
          role: formData.role,
        },
      );

      toast.success(response.data.message || "Registration Successful");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "tenant",
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 items-center justify-center p-4 md:p-8">
      <div className="flex w-full max-w-6xl h-[85vh] md:h-[90vh] overflow-hidden rounded-3xl shadow-2xl">
        <div className="login-section w-full md:w-2/5 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
          <div className="w-full max-w-md">
            <div className="textbox flex flex-col gap-1 mb-2">
              <h1 className="font-bold text-2xl md:text-3xl">Create Account</h1>
              <p className="text-base md:text-lg text-gray-600">
                Sign up to get started
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <label htmlFor="email" className="text-sm font-medium mt-2">
                  Email
                </label>
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
                <label htmlFor="password" className="text-sm font-medium mt-2">
                  Password
                </label>
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className="ri-eye-fill"></i>
                    ) : (
                      <i className="ri-eye-off-fill"></i>
                    )}
                  </button>
                </div>

                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium mt-2"
                >
                  Confirm Password
                </label>
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <i className="ri-eye-fill"></i>
                    ) : (
                      <i className="ri-eye-off-fill"></i>
                    )}
                  </button>
                </div>

                <label className="text-sm font-medium mt-3">Select Role</label>
                <div className="flex gap-6 mt-1">
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <input
                      type="radio"
                      name="role"
                      value="tenant"
                      checked={formData.role === "tenant"}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Tenant</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <input
                      type="radio"
                      name="role"
                      value="owner"
                      checked={formData.role === "owner"}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Owner</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-black text-white p-3 rounded-xl w-full mt-4 hover:bg-gray-800 transition-colors font-medium"
                >
                  Sign Up
                </button>

                <Link
                  to="/auth"
                  className="flex justify-center items-center text-sm p-2 mt-2 gap-1 text-gray-600 hover:text-black transition-colors"
                >
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="image-section hidden md:flex md:w-3/5 items-center justify-center bg-gray-50">
          <img
            src={landingIMG}
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
