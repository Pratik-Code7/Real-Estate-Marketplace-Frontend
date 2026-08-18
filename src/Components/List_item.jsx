import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { Bath, BedDouble, MapPin, Maximize2 } from "lucide-react";

const List_item = ({ property }) => {
  const { login } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const image = property.images?.[0] || "https://via.placeholder.com/400x300";
  const API_URL = "http://localhost:3000/api";

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (login && property._id) {
        try {
          const res = await axios.get(
            `${API_URL}/favorites/check/${property._id}`,
            {
              withCredentials: true,
            },
          );
          setIsFavorite(res.data.isFavorite);
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      }
    };

    checkFavoriteStatus();
  }, [property._id, login]);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!login) {
      toast.error("Please login to save properties");
      return;
    }

    try {
      if (isFavorite) {
        await axios.delete(`${API_URL}/favorites/remove/${property._id}`, {
          withCredentials: true,
        });
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        await axios.post(
          `${API_URL}/favorites/add`,
          { propertyId: property._id },
          { withCredentials: true },
        );
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error(error.response?.data?.message || "Error updating favorites");
    }
  };

  return (
    <Link to={`/property/${property._id}`} className="block">
      <div className="cursor-pointer">
        <div className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          {/* IMAGE */}
          <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
            <img
              src={image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Status Badge - Top Left */}
            <div className="absolute top-3 left-3 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-sm">
              {property.status || "Property"}
            </div>

            {/* Favorite Button - Top Right */}
            <button
              onClick={handleFavoriteToggle}
              className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition ${isFavorite ? "text-red-500" : "text-gray-600"}`}
            >
              <i
                className={`${isFavorite ? "ri-heart-fill" : "ri-heart-line"} text-lg`}
              ></i>
            </button>
          </div>

          {/* CONTENT */}
          <div className="p-4 sm:p-5">
            <h2 className="text-base font-semibold sm:text-lg">
              {property.title}
            </h2>

            <div className="mt-2 flex items-center gap-1.5 text-slate-500">
              <MapPin size={15} />
              <p className="text-sm">{property.location}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-300 pt-3 text-sm text-slate-600">
              {property.bedroom && (
                <div className="flex items-center gap-1.5">
                  <BedDouble size={17} className="text-emerald-700" />
                  <span>{property.bedroom} Bed</span>
                </div>
              )}
              {property.bathroom && (
                <div className="flex items-center gap-1.5">
                  <Bath size={17} className="text-emerald-700" />
                  <span>{property.bathroom} Bath</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center gap-1.5">
                  <Maximize2 size={17} className="text-emerald-700" />
                  <span>{property.area} sqft</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default List_item;
