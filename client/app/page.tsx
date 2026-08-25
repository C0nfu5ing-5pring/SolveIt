"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleOnBrowseClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/signup");
      return;
    }

    router.push(`/browse?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="p-5 flex-1 flex flex-col items-center justify-center gap-6 text-center">
      <div>
        <h1 className="text-8xl">Solve It</h1>
        <p className="text-2xl md:text-xl lg:text-3xl leading-5">
          Find and share previous year question papers
        </p>
      </div>

      <button
        className="bg-black py-2 px-5 md:py-3 md:px-7 lg:py-3 lg:px-10 text-white rounded-md text-xl md:text-2xl lg:text-2xl active:scale-95 transition-all hover:scale-102 cursor-pointer"
        onClick={handleOnBrowseClick}
      >
        Browse Papers
      </button>
    </div>
  );
}
