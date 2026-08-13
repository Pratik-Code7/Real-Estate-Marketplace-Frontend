import React, { useState, useEffect } from "react";
import axios from "axios";

function InquiriesSection() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/inquiries/recent", { withCredentials: true });
        setInquiries(res.data);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading inquiries...</div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold mb-4">All Inquiries</h3>
      {inquiries.length > 0 ? (
        <div className="space-y-4">
          {inquiries.map((item) => (
            <div key={item.name} className="border-b border-gray-100 pb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                  {item.name.split(" ").map((x) => x[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.property}</p>
                    </div>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                  <p className="text-sm mt-2">{item.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No inquiries found</p>
      )}
    </div>
  );
}

export default InquiriesSection;
