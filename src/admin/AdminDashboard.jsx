import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Components/AuthContext";
import {
  Users,
  House,
  MessageSquare,
  CalendarDays,
  Star,
  FileText,
  DollarSign,
  Eye,
} from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardContent from "./DashboardContent";
import UsersSection from "./UsersSection";
import PropertiesSection from "./PropertiesSection";
import InquiriesSection from "./InquiriesSection";
import ReviewsSection from "./ReviewsSection";
import BookingsSection from "./BookingsSection";
import FavoritesSection from "./FavoritesSection";
import Post from "../Pages/Post";
import ComingSoonSection from "./ComingSoonSection";

function AdminDashboard() {
  const { login, role, loading: authLoading } = useAuth();
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [stats, setStats] = useState([]);
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userRoles, setUserRoles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Check if user is admin
        if (role !== "admin") {
          setError("Access denied. Admin only.");
          setLoading(false);
          return;
        }

        // Fetch all data in parallel
        const [
          statsRes,
          propertiesRes,
          inquiriesRes,
          reviewsRes,
          rolesRes,
          userRes,
        ] = await Promise.all([
          axios.get("http://localhost:3000/api/admin/stats", {
            withCredentials: true,
          }),
          axios.get(
            "http://localhost:3000/api/admin/properties/recent?limit=4",
            { withCredentials: true },
          ),
          axios.get("http://localhost:3000/api/admin/inquiries/recent", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/admin/reviews/recent", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/admin/users/roles", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/auth/", {
            withCredentials: true,
          }),
        ]);

        // Set admin name
        if (userRes.data.user) {
          setAdminName(userRes.data.user.name || "Admin");
        }

        // Format stats data
        const statsData = [
          {
            title: "Total Users",
            value: statsRes.data.totalUsers.toLocaleString(),
            change: statsRes.data.changes.users,
            icon: Users,
            bg: "bg-purple-100",
            text: "text-purple-600",
          },
          {
            title: "Total Properties",
            value: statsRes.data.totalProperties.toLocaleString(),
            change: statsRes.data.changes.properties,
            icon: House,
            bg: "bg-blue-100",
            text: "text-blue-600",
          },
          {
            title: "Active Listings",
            value: statsRes.data.activeListings.toLocaleString(),
            change: statsRes.data.changes.listings,
            icon: MessageSquare,
            bg: "bg-orange-100",
            text: "text-orange-500",
          },
          {
            title: "Total Bookings",
            value: statsRes.data.totalBookings.toLocaleString(),
            change: statsRes.data.changes.bookings,
            icon: DollarSign,
            bg: "bg-green-100",
            text: "text-green-600",
          },
          {
            title: "Total Views",
            value: statsRes.data.totalViews.toLocaleString(),
            change: statsRes.data.changes.views,
            icon: Eye,
            bg: "bg-red-100",
            text: "text-red-500",
          },
        ];

        setStats(statsData);
        setProperties(propertiesRes.data);
        setInquiries(inquiriesRes.data);
        setReviews(reviewsRes.data);
        setUserRoles(rolesRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchDashboardData();
    }
  }, [authLoading, role]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* SIDEBAR */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        adminName={adminName}
      />

      {/* MAIN */}
      <main className="lg:ml-[250px] flex-1 w-full">
        {/* TOPBAR */}
        <Header
          activeSection={activeSection}
          adminName={adminName}
          inquiryCount={inquiries.length}
        />

        {/* CONTENT */}
        <section className="p-5 lg:p-7 space-y-5">
          {activeSection === "Dashboard" && (
            <DashboardContent
              stats={stats}
              properties={properties}
              inquiries={inquiries}
              reviews={reviews}
              userRoles={userRoles}
              onNavigateToSection={setActiveSection}
            />
          )}

          {activeSection === "Users" && <UsersSection />}
          {activeSection === "Properties" && <PropertiesSection />}
          {activeSection === "Inquiries" && <InquiriesSection />}
          {activeSection === "Bookings" && <BookingsSection />}
          {activeSection === "Reviews" && <ReviewsSection />}
          {activeSection === "Favorites" && <FavoritesSection />}
          {activeSection === "Post Property" && <Post isAdmin={true} />}
          {activeSection === "Categories" && <ComingSoonSection section="Categories" />}
          {activeSection === "Locations" && <ComingSoonSection section="Locations" />}
          {activeSection === "Facilities" && <ComingSoonSection section="Facilities" />}
          {activeSection === "Banners" && <ComingSoonSection section="Banners" />}
          {activeSection === "Admins" && <ComingSoonSection section="Admins" />}
          {activeSection === "Roles" && <ComingSoonSection section="Roles" />}
          {activeSection === "Settings" && <ComingSoonSection section="Settings" />}
        </section>

        {/* FOOTER */}
      </main>
    </div>
  );
}

export default AdminDashboard;
