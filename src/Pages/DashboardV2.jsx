import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Users,
  House,
  CalendarDays,
  Star,
  MessageSquare,
  CreditCard,
  ChevronDown,
  Search,
  Bell,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Heart,
  DollarSign,
} from "lucide-react";

/* ─────────────────── Sidebar ─────────────────── */
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

function DashV2Sidebar({ activeSection, setActiveSection, userName }) {
  return (
    <aside className="w-[250px] bg-[#111315] text-white fixed left-0 top-0 bottom-0 hidden lg:flex flex-col">
      <div className="h-[80px] flex items-center px-7 border-b border-white/10">
        <div className="w-10 h-10 rounded-lg border border-white flex items-center justify-center mr-3">
          <House size={23} />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Nestra</h1>
          <p className="text-[11px] text-gray-400">Real Estate Marketplace</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <SidebarItem icon={LayoutDashboard} label="Overview" active={activeSection === "Overview"} onClick={() => setActiveSection("Overview")} />

        <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-7 mb-2 px-2">Manage</p>
        <SidebarItem icon={House} label="My Properties" active={activeSection === "My Properties"} onClick={() => setActiveSection("My Properties")} />
        <SidebarItem icon={Heart} label="Favorites" active={activeSection === "Favorites"} onClick={() => setActiveSection("Favorites")} />
        <SidebarItem icon={CalendarDays} label="Bookings" active={activeSection === "Bookings"} onClick={() => setActiveSection("Bookings")} />
        <SidebarItem icon={Star} label="Reviews" active={activeSection === "Reviews"} onClick={() => setActiveSection("Reviews")} />

        <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-7 mb-2 px-2">Communication</p>
        <SidebarItem icon={MessageSquare} label="Messages" active={activeSection === "Messages"} onClick={() => setActiveSection("Messages")} />

        <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-7 mb-2 px-2">Finance</p>
        <SidebarItem icon={CreditCard} label="Payments" active={activeSection === "Payments"} onClick={() => setActiveSection("Payments")} />

        <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-7 mb-2 px-2">Account</p>
        <SidebarItem icon={Users} label="Profile" active={activeSection === "Profile"} onClick={() => setActiveSection("Profile")} />
        <SidebarItem icon={Settings} label="Settings" active={activeSection === "Settings"} onClick={() => setActiveSection("Settings")} />
      </div>

      <div className="border-t border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-sm font-semibold">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-400">Property Owner</p>
          </div>
          <ChevronDown size={17} className="text-gray-400" />
        </div>
      </div>
    </aside>
  );
}

/* ─────────────────── Header ─────────────────── */
function DashV2Header({ activeSection, userName }) {
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-5 lg:px-7 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold">{activeSection}</h2>
        <span className="text-gray-500 text-sm hidden sm:block">Welcome back, {userName} 👋</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center border border-gray-200 rounded-lg px-3 w-64 h-10">
          <Search size={17} className="text-gray-400" />
          <input type="text" placeholder="Search anything..." className="border-none outline-none bg-transparent px-2 text-sm w-full" />
        </div>
        <button className="relative">
          <Bell size={21} />
          <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center">3</span>
        </button>
        <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}

/* ─────────────────── Overview ─────────────────── */
function OverviewSection() {
  const stats = [
    { title: "My Properties", value: "6", change: 20, Icon: House, bg: "bg-blue-100", text: "text-blue-600" },
    { title: "Total Views", value: "1,240", change: 15, Icon: Eye, bg: "bg-purple-100", text: "text-purple-600" },
    { title: "Saved Favorites", value: "18", change: 5, Icon: Heart, bg: "bg-pink-100", text: "text-pink-600" },
    { title: "Total Earnings", value: "Rs 85,000", change: -3, Icon: DollarSign, bg: "bg-green-100", text: "text-green-600" },
  ];
  const activity = [
    { Icon: Eye, text: "Someone viewed your Thamel Apartment", time: "2 min ago", color: "text-blue-500" },
    { Icon: Heart, text: "New favorite on Lazimpat Villa", time: "15 min ago", color: "text-pink-500" },
    { Icon: MessageSquare, text: "New inquiry on your Studio Flat", time: "1 hour ago", color: "text-yellow-500" },
    { Icon: Star, text: "New review left on your property", time: "3 hours ago", color: "text-orange-500" },
    { Icon: CreditCard, text: "Payment received for Booking #1042", time: "Yesterday", color: "text-green-500" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className={`${s.bg} ${s.text} w-14 h-14 rounded-xl flex items-center justify-center`}>
              <s.Icon size={26} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm">{s.title}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${s.change >= 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {s.change >= 0 ? "+" : ""}{s.change}%
            </span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={18} />
          <h3 className="font-semibold text-lg">Recent Activity</h3>
        </div>
        <div className="flex flex-col divide-y divide-gray-100">
          {activity.map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div className={`${item.color} bg-gray-50 rounded-full p-2`}><item.Icon size={16} /></div>
              <p className="text-sm flex-1 text-gray-700">{item.text}</p>
              <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Messages ─────────────────── */
const sampleMessages = [
  { id: 1, from: "Ram Bahadur", property: "Thamel Apartment", message: "Is this property still available for rent?", time: "10:32 AM", unread: true, avatar: "RB" },
  { id: 2, from: "Sita Sharma", property: "Lazimpat Villa", message: "Can we schedule a visit this weekend?", time: "9:15 AM", unread: true, avatar: "SS" },
  { id: 3, from: "Hari Thapa", property: "Pulchowk Studio", message: "What is included in the rent price?", time: "Yesterday", unread: false, avatar: "HT" },
  { id: 4, from: "Maya Gurung", property: "Patan Office Space", message: "Thank you for the quick reply!", time: "Yesterday", unread: false, avatar: "MG" },
  { id: 5, from: "Bikash Rai", property: "Bhaisepati House", message: "Is parking available?", time: "Mon", unread: false, avatar: "BR" },
];

function MessagesSection() {
  const [selected, setSelected] = useState(sampleMessages[0]);
  const [reply, setReply] = useState("");
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex h-[600px]">
      <div className="w-80 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center border border-gray-200 rounded-lg px-3 h-9">
            <Search size={15} className="text-gray-400" />
            <input type="text" placeholder="Search messages..." className="border-none outline-none bg-transparent px-2 text-sm w-full" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sampleMessages.map((msg) => (
            <div key={msg.id} onClick={() => setSelected(msg)} className={`flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 transition ${selected?.id === msg.id ? "bg-gray-50" : "hover:bg-gray-50"}`}>
              <div className="w-10 h-10 rounded-full bg-[#111315] text-white flex items-center justify-center text-xs font-semibold shrink-0">{msg.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className={`text-sm ${msg.unread ? "font-bold" : "font-medium"} truncate`}>{msg.from}</p>
                  <span className="text-[10px] text-gray-400 shrink-0">{msg.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{msg.property}</p>
                <p className={`text-xs truncate mt-0.5 ${msg.unread ? "text-gray-800 font-medium" : "text-gray-400"}`}>{msg.message}</p>
              </div>
              {msg.unread && <span className="w-2 h-2 rounded-full bg-black mt-2 shrink-0" />}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {selected ? (
          <>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#111315] text-white flex items-center justify-center text-xs font-semibold">{selected.avatar}</div>
              <div>
                <p className="font-semibold text-sm">{selected.from}</p>
                <p className="text-xs text-gray-500">{selected.property}</p>
              </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
              <div className="flex items-start gap-3 max-w-[70%]">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold shrink-0">{selected.avatar}</div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
                  <p className="text-sm text-gray-800">{selected.message}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{selected.time}</p>
                </div>
              </div>
              <div className="flex items-end gap-3 max-w-[70%] self-end">
                <div className="bg-[#111315] text-white rounded-2xl rounded-tr-none px-4 py-3">
                  <p className="text-sm">Thank you for your inquiry! Yes, the property is still available.</p>
                  <p className="text-[10px] text-gray-400 mt-1">Just now</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type a message..." className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gray-400" />
              <button onClick={() => setReply("")} className="bg-[#111315] text-white px-5 py-2 rounded-xl text-sm hover:bg-gray-800 transition">Send</button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400"><p>Select a message to view</p></div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────── Payments ─────────────────── */
const samplePayments = [
  { id: "#PAY-1042", property: "Thamel Apartment", from: "Ram Bahadur", amount: "Rs 25,000", date: "Aug 14, 2026", status: "Completed" },
  { id: "#PAY-1041", property: "Lazimpat Villa", from: "Sita Sharma", amount: "Rs 45,000", date: "Aug 10, 2026", status: "Completed" },
  { id: "#PAY-1040", property: "Pulchowk Studio", from: "Hari Thapa", amount: "Rs 12,000", date: "Aug 5, 2026", status: "Pending" },
  { id: "#PAY-1039", property: "Patan Office", from: "Maya Gurung", amount: "Rs 30,000", date: "Jul 28, 2026", status: "Completed" },
  { id: "#PAY-1038", property: "Bhaisepati House", from: "Bikash Rai", amount: "Rs 18,000", date: "Jul 20, 2026", status: "Failed" },
];

function PaymentsSection() {
  const statusStyle = {
    Completed: { bg: "bg-green-100", text: "text-green-700", Icon: CheckCircle },
    Pending: { bg: "bg-yellow-100", text: "text-yellow-700", Icon: Clock },
    Failed: { bg: "bg-red-100", text: "text-red-700", Icon: XCircle },
  };
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Earned", value: "Rs 1,10,000", sub: "↑ This month", subColor: "text-green-600" },
          { label: "Pending Payments", value: "Rs 12,000", sub: "1 transaction", subColor: "text-yellow-600" },
          { label: "Total Transactions", value: "5", sub: "All time", subColor: "text-gray-500" },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">{c.label}</p>
            <p className="text-2xl font-bold mt-1">{c.value}</p>
            <span className={`text-xs font-medium ${c.subColor}`}>{c.sub}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold">Transaction History</h3>
          <button className="text-sm text-gray-500 hover:text-black border border-gray-200 rounded-lg px-3 py-1.5 transition">Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                <th className="text-left py-3 px-5">ID</th>
                <th className="text-left py-3 px-3">Property</th>
                <th className="text-left py-3 px-3">From</th>
                <th className="text-left py-3 px-3">Amount</th>
                <th className="text-left py-3 px-3">Date</th>
                <th className="text-left py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {samplePayments.map((p) => {
                const s = statusStyle[p.status];
                return (
                  <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3 px-5 font-mono text-xs text-gray-500">{p.id}</td>
                    <td className="py-3 px-3 font-medium">{p.property}</td>
                    <td className="py-3 px-3 text-gray-600">{p.from}</td>
                    <td className="py-3 px-3 font-semibold">{p.amount}</td>
                    <td className="py-3 px-3 text-gray-500">{p.date}</td>
                    <td className="py-3 px-3">
                      <span className={`flex items-center gap-1 w-fit px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
                        <s.Icon size={12} /> {p.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Coming Soon ─────────────────── */
function ComingSoon({ section }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-16 flex flex-col items-center justify-center gap-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <Settings size={28} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold">{section}</h3>
      <p className="text-gray-400 text-sm max-w-xs">This section is under construction. Check back soon!</p>
    </div>
  );
}

/* ─────────────────── Main ─────────────────── */
function DashboardV2() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/", { withCredentials: true })
      .then(res => { if (res.data.user) setUserName(res.data.user.name || "User"); })
      .catch(() => {});
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "Overview": return <OverviewSection />;
      case "Messages": return <MessagesSection />;
      case "Payments": return <PaymentsSection />;
      default: return <ComingSoon section={activeSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <DashV2Sidebar activeSection={activeSection} setActiveSection={setActiveSection} userName={userName} />
      <main className="lg:ml-[250px] flex-1 w-full">
        <DashV2Header activeSection={activeSection} userName={userName} />
        <section className="p-5 lg:p-7 space-y-5">{renderSection()}</section>
        <footer className="px-7 py-5 border-t border-gray-200 text-xs text-gray-400 flex justify-between">
          <span>© 2026 Nestra. All rights reserved.</span>
          <span>Dashboard V2 — Preview</span>
        </footer>
      </main>
    </div>
  );
}

export default DashboardV2;
