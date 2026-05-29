import React from "react";
import Landing from "./Pages/Landing";
import { Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import DashBoard from "./Pages/DashBoard";
import Listing from "./Pages/Listing";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/listing" element={<Listing />} />
    </Routes>
  );
};

export default App;
