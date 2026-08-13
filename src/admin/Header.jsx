import React from "react";
import { Search, Bell, Settings } from "lucide-react";

function Header({ activeSection, adminName, inquiryCount }) {
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-5 lg:px-7 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold">{activeSection}</h2>
          <span className="text-gray-500 text-sm hidden sm:block">
            Welcome back, {adminName} 👋
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center border border-gray-200 rounded-lg px-3 w-65 h-10">
          <Search size={17} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="!border-none !outline-none !shadow-none focus:!border-none focus:!outline-none focus:!shadow-none bg-transparent px-2 text-sm w-full"
          />
        </div>

        <button className="relative">
          <Bell size={21} />
          {inquiryCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center">
              {inquiryCount}
            </span>
          )}
        </button>

        <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}

export default Header;
