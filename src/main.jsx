import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import { HashRouter, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <BrowserRouter> */}
    <BrowserRouter basename="/Rent_UI">
      <GoogleOAuthProvider
        clientId="665998867795-5k65ul63fquakk3b0477cesv99c4h5d4.apps.googleusercontent.com"
        locale="en"
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
    {/* <HashRouter>
      <App />
    </HashRouter> */}
  </StrictMode>,
);
