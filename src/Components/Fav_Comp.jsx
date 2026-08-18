import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import {
  BadgeCheck,
  Bath,
  BedDouble,
  Clock3,
  MapPin,
  Maximize2,
} from "lucide-react";

const Fav_Comp = ({ property, favorite, onRemove }) => {
  // Support both usages:
  // 1) <Fav_Comp property={property} />                 -> plain listing card
  // 2) <Fav_Comp favorite={favorite} onRemove={fn} />    -> saved favorites card
  const data = property || favorite?.property;
  const { login } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const API_URL = "http://localhost:3000/api";

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (login && data?._id) {
        try {
          const res = await axios.get(
            `${API_URL}/favorites/check/${data._id}`,
            {
              withCredentials: true,
            },
          );
          setIsFavorite(res.data.isFavorite);
          setFavoriteId(res.data.favoriteId);
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      }
    };

    checkFavoriteStatus();
  }, [data?._id, login]);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!login) {
      toast.error("Please login to save properties");
      return;
    }

    try {
      if (isFavorite) {
        await axios.delete(`${API_URL}/favorites/remove/${data._id}`, {
          withCredentials: true,
        });
        setIsFavorite(false);
        setFavoriteId(null);
        toast.success("Removed from favorites");
        if (onRemove) {
          onRemove(favoriteId || favorite?._id, data?._id);
        }
      } else {
        const res = await axios.post(
          `${API_URL}/favorites/add`,
          { propertyId: data._id },
          { withCredentials: true },
        );
        setIsFavorite(true);
        setFavoriteId(res.data.favorite._id);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error(error.response?.data?.message || "Error updating favorites");
    }
  };

  if (!data) {
    return null;
  }

  const image =
    data.images?.[0] ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c/400x300";
  const isVerified = ["Verified", "Active"].includes(data.listingStatus);
  const ReviewIcon = isVerified ? BadgeCheck : Clock3;
  const reviewLabel = isVerified ? "Verified" : "Pending";

  return (
    <Link to={`/property/${data._id}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-xs flex flex-col md:flex-row group hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer">
        {/* Image */}
        <div className="relative h-60 md:h-60 md:w-2/3 overflow-hidden">
          <img
            src={image}
            alt={data.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Property type badge */}
          <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            {favorite ? "Saved" : data.status || "Property"}
          </div>

          {!favorite && (
            <div
              className={`absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shadow-md ${
                isVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              <ReviewIcon size={14} aria-hidden="true" />
              {reviewLabel}
            </div>
          )}

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

        {/* Content */}
        <div className="p-4 md:p-6 flex flex-col justify-between w-full">
          <div>
            <h2 className="text-lg font-bold">{data.title}</h2>
            <div className="flex items-center gap-1.5 mt-2 text-gray-500">
              <MapPin size={15} />
              <p className="text-sm text-gray-500">{data.location}</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4 border-t border-slate-100 pt-3 text-sm text-slate-600">
              {data.bedroom && (
                <div className="flex items-center gap-1.5">
                  <BedDouble size={17} className="text-emerald-700" />
                  <span>{data.bedroom} Bed</span>
                </div>
              )}
              {data.bathroom && (
                <div className="flex items-center gap-1.5">
                  <Bath size={17} className="text-emerald-700" />
                  <span>{data.bathroom} Bath</span>
                </div>
              )}
              {data.area && (
                <div className="flex items-center gap-1.5">
                  <Maximize2 size={17} className="text-emerald-700" />
                  <span>{data.area} sqft</span>
                </div>
              )}
            </div>
          </div>

          {/* Price section */}
          <div className="mt-4 border-t pt-4 flex justify-between items-center">
            <p className="font-semibold">
              Rs {data.price}
              {data.status === "For Rent" ? "/mo" : ""}
            </p>

            {/* Only show Remove button when used as a favorites card */}
            {favorite && onRemove && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemove(favorite._id, data?._id);
                }}
                className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1 hover:underline transition-all"
              >
                <i className="ri-delete-bin-line"></i> Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Fav_Comp;
