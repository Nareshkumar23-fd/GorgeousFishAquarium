import React from "react";
import { Globe, DollarSign, UserPlus, LogIn } from "lucide-react";

const TopHead = () => {
  return (
    <div className="hidden md:flex justify-between items-center px-8 py-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-b border-blue-100/60 text-sm backdrop-blur-sm">
      
      {/* Left side */}
      <div className="flex items-center gap-8">
        {/* Language */}
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-blue-500" />
          <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Language</span>
          <select className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300 rounded-lg px-3 py-1.5 text-gray-700 outline-none cursor-pointer transition-all duration-200 text-sm focus:ring-2 focus:ring-blue-400/20">
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        <div className="w-px h-5 bg-blue-200/60"></div>

        {/* Currency */}
        <div className="flex items-center gap-3">
          <DollarSign className="w-4 h-4 text-blue-500" />
          <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Currency</span>
          <select className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300 rounded-lg px-3 py-1.5 text-gray-700 outline-none cursor-pointer transition-all duration-200 text-sm focus:ring-2 focus:ring-blue-400/20">
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>INR (₹)</option>
            <option>GBP (£)</option>
          </select>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 group">
          <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="relative">
            Register
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
          </span>
        </button>
        
        <div className="w-px h-5 bg-blue-200/60"></div>
        
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 group">
          <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="relative">
            Login
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TopHead;