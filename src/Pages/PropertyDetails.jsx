import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  CircleCheck,
  Eye,
  Heart,
  MapPin,
  Maximize2,
  Share2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../Components/AuthContext";
import Navbar from "../Components/Navbar";

const API_URL = "http://localhost:3000/api";
const FALLBACK_IMAGE = "https://via.placeholder.com/1200x800?text=Property";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const hasIncrementedView = useRef(false);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);

      try {
        const endpoint = hasIncrementedView.current
          ? `${API_URL}/property/${id}/view`
          : `${API_URL}/property/${id}`;
        hasIncrementedView.current = true;
        const res = await axios.get(endpoint);
        setProperty(res.data);
        setSelectedImage(0);
      } catch (error) {
        console.error("Error fetching property:", error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!login || !id) return;

      try {
        const res = await axios.get(`${API_URL}/favorites/list`, {
          withCredentials: true,
        });
        setIsFavorite(res.data.some((item) => item.property?._id === id));
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };

    checkFavoriteStatus();
  }, [id, login]);

  const handleFavoriteToggle = async () => {
    if (!login) {
      toast.error("Please login to save properties");
      navigate("/auth");
      return;
    }

    try {
      if (isFavorite) {
        await axios.delete(`${API_URL}/favorites/remove/${id}`, {
          withCredentials: true,
        });
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        await axios.post(
          `${API_URL}/favorites/add`,
          { propertyId: id },
          { withCredentials: true },
        );
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error(
        error.response?.data?.message || "Unable to update favorites",
      );
    }
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: property.title,
        text: `Check out ${property.title} on Nestra`,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Property link copied");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        toast.error("Unable to share property");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-slate-500">
          Loading property details...
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold">Property not found</h1>
          <button
            onClick={() => navigate("/listing")}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white"
          >
            Browse properties
          </button>
        </div>
      </div>
    );
  }

  const images = property.images?.length ? property.images : [FALLBACK_IMAGE];
  const currentImage = images[selectedImage] || images[0];
  const isVerified = ["Verified", "Active"].includes(property.listingStatus);
  const postedDate = property.createdAt
    ? new Date(property.createdAt).toLocaleDateString()
    : "Not available";
  const stats = [
    { label: "Bedrooms", value: property.bedroom ?? 0, Icon: BedDouble },
    { label: "Bathrooms", value: property.bathroom ?? 0, Icon: Bath },
    { label: "Area", value: `${property.area ?? 0} sqft`, Icon: Maximize2 },
    { label: "Property type", value: property.type, Icon: Building2 },
  ];
  const details = [
    ["Listing type", property.status || "Not specified"],
    ["Property type", property.type || "Not specified"],
    ["Country", property.country || "Not specified"],
    ["Address", property.address || "Not specified"],
    ["Floors", property.floors ?? "Not specified"],
    ["Parking spaces", property.parking ?? "Not specified"],
    ["Year built", property.yearBuilt ?? "Not specified"],
    ["Price negotiable", property.negotiable ? "Yes" : "No"],
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-[1440px]  px-4 py-7 sm:px-6 lg:px-8">
        {" "}
        <section className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/90 backdrop-blur-sm px-3 py-2 text-sm font-medium hover:bg-white shadow-sm"
            >
              <ArrowLeft size={17} /> Back
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="rounded-lg border border-slate-200 bg-white/90 backdrop-blur-sm p-2.5 hover:bg-white shadow-sm"
                title="Share property"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={handleFavoriteToggle}
                className={`rounded-lg border p-2.5 backdrop-blur-sm shadow-sm ${
                  isFavorite
                    ? "border-red-200 bg-red-50/90 text-red-600 hover:bg-red-50"
                    : "border-slate-200 bg-white/90 hover:bg-white"
                }`}
                title={
                  isFavorite ? "Remove from saved properties" : "Save property"
                }
              >
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
          {images.length === 1 && (
            <img
              src={images[0]}
              alt={property.title}
              className="h-72 w-full object-cover sm:h-[460px]"
            />
          )}

          {images.length === 2 && (
            <div className="grid grid-cols-2 gap-1">
              {images.map((image, index) => (
                <button
                  key={image + index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className="overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className="h-64 w-full object-cover sm:h-[420px]"
                  />
                </button>
              ))}
            </div>
          )}

          {images.length === 3 && (
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setSelectedImage(0)}
                className="row-span-2 overflow-hidden"
              >
                <img
                  src={images[0]}
                  alt={`${property.title} 1`}
                  className="h-[420px] w-full object-cover"
                />
              </button>
              {images.slice(1).map((image, index) => (
                <button
                  key={image + index}
                  type="button"
                  onClick={() => setSelectedImage(index + 1)}
                  className="overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${property.title} ${index + 2}`}
                    className="h-[209px] w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {images.length === 4 && (
            <div className="grid grid-cols-2 gap-1">
              {images.map((image, index) => (
                <button
                  key={image + index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className="overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className="h-52 w-full object-cover sm:h-[260px]"
                  />
                </button>
              ))}
            </div>
          )}

          {images.length > 4 && (
            <>
              <div className="grid gap-1 md:grid-cols-2">
                <img
                  src={currentImage}
                  alt={property.title}
                  className="h-72 w-full object-cover md:h-[420px]"
                />
                <div className="grid grid-cols-2 gap-1">
                  {images.slice(1, 5).map((image, index) => (
                    <button
                      key={image + index}
                      type="button"
                      onClick={() => setSelectedImage(index + 1)}
                      className="relative min-h-36 overflow-hidden text-left"
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 2}`}
                        className="h-full w-full object-cover"
                      />
                      {index === 3 && images.length > 5 && (
                        <span className="absolute inset-0 grid place-items-center bg-slate-950/55 text-lg font-semibold text-white">
                          +{images.length - 5} photos
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-slate-100 p-3">
                {images.slice(0, 6).map((image, index) => (
                  <button
                    key={image + index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`h-14 w-14 overflow-hidden rounded-md border-2 ${
                      selectedImage === index
                        ? "border-emerald-600"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
        <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-7">
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {property.status}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        isVerified
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      <CircleCheck size={14} />{" "}
                      {isVerified ? "Verified" : "Pending"}
                    </span>
                  </div>
                  <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    {property.title}
                  </h1>
                  <p className="mt-3 flex items-center gap-2 text-slate-500">
                    <MapPin size={18} /> {property.location}
                    {property.country ? `, ${property.country}` : ""}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm text-slate-500">
                    {property.status === "For Rent" ? "Monthly rent" : "Price"}
                  </p>
                  <p className="mt-1 text-3xl font-bold">
                    Rs {Number(property.price || 0).toLocaleString()}
                  </p>
                  {property.status === "For Rent" && (
                    <p className="text-sm text-slate-500">per month</p>
                  )}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map(({ label, value, Icon }) => (
                <div
                  key={label}
                  className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
                >
                  <Icon size={21} className="text-emerald-700" />
                  <p className="mt-3 text-xs text-slate-500">{label}</p>
                  <p className="mt-1 font-semibold">{value}</p>
                </div>
              ))}
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold">Property overview</h2>
              <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                {property.description ||
                  "No description has been provided for this property."}
              </p>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold">Property information</h2>
              <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {details.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-b border-slate-100 pb-3 text-sm"
                  >
                    <span className="text-slate-500">{label}</span>
                    <span className="text-right font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            {property.facilities?.length > 0 && (
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-bold">Facilities</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {property.facilities.map((facility) => (
                    <div
                      key={facility}
                      className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm"
                    >
                      <Check size={17} className="text-emerald-700" />
                      {facility}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold">Location</h2>
              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
                <iframe
                  title="Property location"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`${property.location}, ${property.country || "Nepal"}`)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="h-80 w-full"
                  loading="lazy"
                />
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">Listing summary</p>
              <p className="mt-2 text-3xl font-bold">
                Rs {Number(property.price || 0).toLocaleString()}
              </p>
              {property.status === "For Rent" && (
                <p className="text-sm text-slate-500">per month</p>
              )}
              <button
                onClick={handleFavoriteToggle}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold ${
                  isFavorite
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-700 text-white hover:bg-emerald-800"
                }`}
              >
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                {isFavorite ? "Saved property" : "Save property"}
              </button>
              <button
                onClick={handleShare}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-3 font-semibold hover:bg-slate-50"
              >
                <Share2 size={18} /> Share listing
              </button>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="font-bold">Listing activity</h2>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-500">
                    <Eye size={17} /> Views
                  </span>
                  <span className="font-semibold">{property.views || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-500">
                    <CalendarDays size={17} /> Posted
                  </span>
                  <span className="font-semibold">{postedDate}</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default PropertyDetails;
