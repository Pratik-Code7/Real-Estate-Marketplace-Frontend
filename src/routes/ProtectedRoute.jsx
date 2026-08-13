import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import loading from "../assets/wmremove-transformed.mp4";
const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/api/auth", {
          withCredentials: true,
        });

        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 w-full h-full flex items-center justify-center">
        <video
          autoPlay
          loop
          src={loading}
          className="w-64 h-64 md:w-96 md:h-96 object-cover"
          muted
        ></video>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
