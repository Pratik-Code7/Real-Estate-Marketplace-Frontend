import React from "react";
import Landing from "./Pages/Landing";
import { Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import DashBoard from "./Pages/DashBoard";
import Listing from "./Pages/Listing";
import AdminDashboard from "./admin/AdminDashboard";
import DashboardV2 from "./Pages/DashboardV2";
import Post from "./Pages/post";
import NotFoundPage from "./Components/NotFoundPage";
import Signup from "./Pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertyDetails from "./Pages/PropertyDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
const App = () => {
  return (
    <>
      <ToastContainer theme="light" />
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/post" element={<Post />} />
        </Route>
        {/* TEMP TEST ROUTE – remove when done */}
        <Route path="/dashv2" element={<DashboardV2 />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
