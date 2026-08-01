"use client";
import Sidebar from "../../components/Sidebar.jsx";

export default function BrowsePage() {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="border-3 rounded-md w-full p-5 text-5xl grid grid-cols-5 gap-5 overflow-auto">
        <div className="w-60 h-80 border-3 rounded-md"></div>
        <div className="w-60 h-80 border-3 rounded-md"></div>
        <div className="w-60 h-80 border-3 rounded-md"></div>
        <div className="w-60 h-80 border-3 rounded-md"></div>
        <div className="w-60 h-80 border-3 rounded-md"></div>
        <div className="w-60 h-80 border-3 rounded-md"></div>
        <div className="w-60 h-80 border-3 rounded-md"></div>
        <div className="w-60 h-80 border-3 rounded-md"></div>
        <div className="w-60 h-80 border-3 rounded-md"></div>
        <div className="w-60 h-80 border-3 rounded-md"></div>
      </div>
    </div>
  );
}
