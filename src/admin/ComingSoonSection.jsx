import React from "react";
import { Settings, Heart, Users, Tags, MapPin, SlidersHorizontal, Image, ShieldCheck } from "lucide-react";

function ComingSoonSection({ section }) {
  const getIcon = () => {
    switch (section) {
      case "Favorites": return Heart;
      case "Admins": return Users;
      case "Categories": return Tags;
      case "Locations": return MapPin;
      case "Facilities": return SlidersHorizontal;
      case "Banners": return Image;
      case "Roles": return ShieldCheck;
      default: return Settings;
    }
  };

  const Icon = getIcon();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon size={32} className="text-gray-400" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{section}</h3>
      <p className="text-gray-500">This feature is under development and will be available soon.</p>
    </div>
  );
}

export default ComingSoonSection;
