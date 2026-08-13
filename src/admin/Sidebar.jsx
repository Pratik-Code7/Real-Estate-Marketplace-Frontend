import React from "react";
import {
  LayoutDashboard,
  Users,
  House,
  MessageSquare,
  CalendarDays,
  Star,
  FileText,
  Tags,
  MapPin,
  SlidersHorizontal,
  Image,
  ShieldCheck,
  Settings,
  ChevronDown,
} from "lucide-react";

function SidebarItem({ icon: Icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
        active
          ? "bg-white/20 text-white"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon size={19} strokeWidth={1.8} />
      <span className="text-sm">{label}</span>
    </div>
  );
}

function Sidebar({ activeSection, setActiveSection, adminName }) {
  return (
    <aside className="w-[250px] bg-[#111315] text-white fixed left-0 top-0 bottom-0 hidden lg:flex flex-col">
      {/* Logo */}
      <div className="h-[80px] flex items-center px-7 border-b border-white/10">
        <div className="w-10 h-10 rounded-lg border border-white flex items-center justify-center mr-3">
          <House size={23} />
        </div>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">Nestra</h1>
          <p className="text-[11px] text-gray-400">Real Estate Marketplace</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={activeSection === "Dashboard"} 
          onClick={() => setActiveSection("Dashboard")}
        />

        <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-7 mb-2 px-2">
          Manage
        </p>

        <SidebarItem 
          icon={Users} 
          label="Users" 
          active={activeSection === "Users"} 
          onClick={() => setActiveSection("Users")}
        />
        <SidebarItem 
          icon={House} 
          label="Properties" 
          active={activeSection === "Properties"} 
          onClick={() => setActiveSection("Properties")}
        />
        <SidebarItem 
          icon={MessageSquare} 
          label="Inquiries" 
          active={activeSection === "Inquiries"} 
          onClick={() => setActiveSection("Inquiries")}
        />
        <SidebarItem 
          icon={CalendarDays} 
          label="Bookings" 
          active={activeSection === "Bookings"} 
          onClick={() => setActiveSection("Bookings")}
        />
        <SidebarItem 
          icon={Star} 
          label="Reviews" 
          active={activeSection === "Reviews"} 
          onClick={() => setActiveSection("Reviews")}
        />
        <SidebarItem 
          icon={FileText} 
          label="Reports" 
          active={activeSection === "Reports"} 
          onClick={() => setActiveSection("Reports")}
        />

        <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-7 mb-2 px-2">
          Content
        </p>

        <SidebarItem 
          icon={Tags} 
          label="Categories" 
          active={activeSection === "Categories"} 
          onClick={() => setActiveSection("Categories")}
        />
        <SidebarItem 
          icon={MapPin} 
          label="Locations" 
          active={activeSection === "Locations"} 
          onClick={() => setActiveSection("Locations")}
        />
        <SidebarItem 
          icon={SlidersHorizontal} 
          label="Facilities" 
          active={activeSection === "Facilities"} 
          onClick={() => setActiveSection("Facilities")}
        />
        <SidebarItem 
          icon={Image} 
          label="Banners" 
          active={activeSection === "Banners"} 
          onClick={() => setActiveSection("Banners")}
        />

        <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-7 mb-2 px-2">
          System
        </p>

        <SidebarItem 
          icon={Users} 
          label="Admins" 
          active={activeSection === "Admins"} 
          onClick={() => setActiveSection("Admins")}
        />
        <SidebarItem 
          icon={ShieldCheck} 
          label="Roles & Permissions" 
          active={activeSection === "Roles"} 
          onClick={() => setActiveSection("Roles")}
        />
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          active={activeSection === "Settings"} 
          onClick={() => setActiveSection("Settings")}
        />
      </div>

      {/* Admin */}
      <div className="border-t border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            {adminName.substring(0, 2).toUpperCase()}
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium">{adminName}</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>

          <ChevronDown size={17} className="text-gray-400" />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
