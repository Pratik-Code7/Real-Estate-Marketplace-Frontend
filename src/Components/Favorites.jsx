import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Fav_Comp from "./Fav_Comp";
import FavoriteSkeleton from "./FavoriteSkeleton";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://localhost:3000/api";

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`${API_URL}/favorites/list`, {
          withCredentials: true,
        });
        console.log("Favorites response:", res.data);
        setFavorites(res.data.favorites || res.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        if (error.response?.status === 401) {
          console.error("User not authenticated");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (favoriteId, propertyId) => {
    try {
      if (favoriteId) {
        await axios.delete(`${API_URL}/favorites/delete/${favoriteId}`, {
          withCredentials: true,
        });
      } else if (propertyId) {
        await axios.delete(`${API_URL}/favorites/remove/${propertyId}`, {
          withCredentials: true,
        });
      }

      setFavorites((prev) =>
        prev.filter((fav) => fav._id !== favoriteId && fav.property?._id !== propertyId)
      );
      toast.success("Removed from favorites");
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error(error.response?.data?.message || "Failed to remove favorite");
    }
  };

  if (loading) {
    return (
      <div className="dash-right h-full w-full flex flex-col gap-5">
        {Array(3).fill(0).map((_, i) => <FavoriteSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="dash-right h-full overflow-y-auto w-full flex flex-col gap-10">
      {favorites.length > 0 ? (
        <div className="flex flex-col gap-5">
          {favorites.map((favorite) => (
            <Fav_Comp
              key={favorite._id}
              favorite={favorite}
              onRemove={handleRemoveFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-24 p-20 bg-white rounded-2xl flex justify-center items-center gap-10">
          <div className="bg-gray-100 rounded-full text-4xl h-18 w-18 flex justify-center items-center">
            <i className="ri-folder-open-fill"></i>
          </div>
          <div className="w-72">
            <h1 className="text-sm md:text-md font-bold">
              Save properties you love
            </h1>
            <p className="text-xs md:text-sm text-gray-600">
              Click the heart icon on any property to save it for easy access
              later
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;

