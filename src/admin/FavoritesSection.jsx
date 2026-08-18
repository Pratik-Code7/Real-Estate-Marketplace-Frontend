import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heart, Eye, MapPin, Building2, ArrowUpRight } from "lucide-react";

function FavoritesSection() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/api/admin/favorites", {
          withCredentials: true,
        });
        // Filter out favorites where property doesn't exist
        const validFavorites = res.data.filter(fav => fav.property && fav.property._id);
        setFavorites(validFavorites);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Heart size={20} className="text-red-500" />
            User Favorites
          </h3>
          <span className="text-sm text-gray-500">
            {favorites.length} {favorites.length === 1 ? "property" : "properties"}
          </span>
        </div>

        {favorites.length > 0 ? (
          <div className="space-y-4">
            {favorites.map((favorite) => (
              <div
                key={favorite._id}
                className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                onClick={() => navigate(`/property/${favorite.property._id}`)}
              >
                <img
                  src={favorite.property?.images?.[0] || "https://via.placeholder.com/100x80?text=No+Image"}
                  alt={favorite.property?.title || "Property"}
                  className="w-20 h-16 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/100x80?text=No+Image";
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">
                    {favorite.property?.title || "Unknown Property"}
                  </h4>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin size={14} />
                    {favorite.property?.location || "Unknown location"}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Building2 size={14} />
                    {favorite.property?.type || "Unknown type"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Saved by: {favorite.user?.name || "Unknown user"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    Rs {Number(favorite.property?.price || 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 justify-end">
                    <Eye size={12} />
                    {favorite.property?.views || 0} views
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/property/${favorite.property._id}`);
                  }}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                  title="View property"
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Heart size={48} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No favorites found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesSection;