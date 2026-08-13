import React from "react";
import { Settings } from "lucide-react";

function ComingSoonSection() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Settings size={32} className="text-gray-400" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Coming Soon</h3>
      <p className="text-gray-500">This feature is under development and will be available soon.</p>
    </div>
  );
}

export default ComingSoonSection;
