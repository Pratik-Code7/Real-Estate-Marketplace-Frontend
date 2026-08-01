// AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/", {
        withCredentials: true,
      });
      setLogin(true);
    } catch {
      setLogin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ login, setLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
