import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Auth.css";
import { Link } from "react-router-dom";
import google from "../assets/google.png";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";
import axios from "axios";
const Auth = () => {
  const { setLogin } = useAuth();
  const navigate = useNavigate();
  const [ShowPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  // const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  // const handleGoogleSuccess = async (credentialResponse) => {
  //   try {
  //     const res = await axios.post("http://localhost:3000/api/auth/google", {
  //       credential: credentialResponse.credential,
  //     });

  //     console.log(res.data);
  //     localStorage.setItem("token", res.data.token);
  //   } catch (error) {
  //     console.log(error.response?.data || error.message);
  //   }
  // };
  // const handleGoogleError = () => {
  //   console.log("Google Login Failed");
  // };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     console.log("Access Token:", tokenResponse.access_token);

  //     // fetch user info from Google API
  //     const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
  //       headers: {
  //         Authorization: `Bearer ${tokenResponse.access_token}`,
  //       },
  //     });

  //     const user = await res.json();

  //     console.log("User:", user);

  //     localStorage.setItem("user", JSON.stringify(user));
  //   },
  //   onError: () => console.log("Login Failed"),
  // });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/google",
          { access_token: tokenResponse.access_token },
          { withCredentials: true }, // needed so the httpOnly cookie gets set
        );
        toast.success("Google login successful");
        navigate("/");
        setLogin(true);
        console.log("Backend response:", res.data);
        // navigate to dashboard/home here if needed
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Google login failed",
        );
      }
    },
    onError: () => console.log("Login Failed"),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      toast.success(response.data.message);
      navigate("/");
      setLogin(true);
      console.log(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };
  return (
    <div className=" flex justify-center items-center h-screen w-screen bg-white p-5 ">
      <div className="container bg-white rounded-2xl  flex flex-col  h-auto w-100 p-6  md:w-96">
        <div className="textbox flex justify-center items-center flex-col mt-3  gap-1">
          <h1 className="font-bold text-2xl">Welcome Back</h1>
          <p className="text-l text-gray-600">Login to Continue</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-3">
          <div className=" flex flex-col gap-2 px-5 ">
            <label htmlFor="email" className="mt-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            <div className="relative w-full">
              <input
                type={ShowPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="w-full"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!ShowPassword)}
              >
                {ShowPassword ? (
                  <i className="ri-eye-fill"></i>
                ) : (
                  <i className="ri-eye-off-fill"></i>
                )}
              </button>
            </div>
            {/* <div className="bg-green-50 flex justify-center items-center"> */}
            <button
              type="submit"
              className="bg-black text-white p-2.5 rounded-xl w-full mt-2"
            >
              Login
            </button>
            <div className=" flex justify-center items-center mt-1 mb-1 gap-4">
              <div className="line"></div>
              <div>OR</div>
              <div className="line"></div>
            </div>
            <button
              type="button"
              onClick={googleLogin}
              className="gbtn rounded-xl p-2.5 flex justify-center items-center gap-2 w-full"
            >
              <img src={google} alt="Google Logo" className="w-6  " />
              <h1>Continue with Google</h1>
            </button>
            {/* <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          /> */}

            <Link
              to="/signup"
              className="flex justify-center items-center text-sm p-1 mt-2 gap-1"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
