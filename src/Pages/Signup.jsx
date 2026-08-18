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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "name") {
      const trimmed = value.trim();
      if (!trimmed) errorMsg = "Full name is required";
      else if (trimmed.length < 2) errorMsg = "Full name must be at least 2 characters";
      else if (!/^[a-zA-Z\s]+$/.test(trimmed)) errorMsg = "Letters and spaces only";
    } else if (name === "email") {
      const trimmed = value.trim();
      if (!trimmed) errorMsg = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) errorMsg = "Invalid email format";
    } else if (name === "password") {
      if (!value) errorMsg = "Password is required";
      else if (value.length < 6) errorMsg = "Password must be at least 6 characters";
      else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) errorMsg = "Needs 1 uppercase, 1 lowercase & 1 number";
    } else if (name === "confirmPassword") {
      if (!value) errorMsg = "Please confirm your password";
      else if (value !== formData.password) errorMsg = "Passwords do not match";
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    validateField(id, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run all validations
    const nameTrimmed = formData.name.trim();
    const emailTrimmed = formData.email.trim();

    const newErrors = {
      name: !nameTrimmed
        ? "Full name is required"
        : nameTrimmed.length < 2
        ? "Full name must be at least 2 characters"
        : !/^[a-zA-Z\s]+$/.test(nameTrimmed)
        ? "Letters and spaces only"
        : "",
      email: !emailTrimmed
        ? "Email is required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)
        ? "Invalid email format"
        : "",
      password: !formData.password
        ? "Password is required"
        : formData.password.length < 6
        ? "Password must be at least 6 characters"
        : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)
        ? "Needs 1 uppercase, 1 lowercase & 1 number"
        : "",
      confirmPassword: !formData.confirmPassword
        ? "Please confirm your password"
        : formData.password !== formData.confirmPassword
        ? "Passwords do not match"
        : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: nameTrimmed,
          email: emailTrimmed,
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
      setErrors({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error(error);
      const serverMsg = error.response?.data?.message || "Registration Failed";
      if (serverMsg.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: serverMsg }));
      } else {
        toast.error(serverMsg);
      }
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
              <div className="flex flex-col gap-1">
                {/* FULL NAME */}
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs mt-0.5">{errors.name}</span>
                )}

                {/* EMAIL */}
                <label htmlFor="email" className="text-sm font-medium mt-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-0.5">{errors.email}</span>
                )}

                {/* PASSWORD */}
                <label htmlFor="password" className="text-sm font-medium mt-2">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
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
                {errors.password && (
                  <span className="text-red-500 text-xs mt-0.5">{errors.password}</span>
                )}

                {/* CONFIRM PASSWORD */}
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
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""}`}
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
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs mt-0.5">{errors.confirmPassword}</span>
                )}

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
