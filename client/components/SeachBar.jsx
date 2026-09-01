"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

export default function SearchBar({ userSearch, setUserSearch }) {
  return (
    <div className="flex items-center sketchy-border  gap-2 px-3 py-2 w-full rounded-xl">
      <HugeiconsIcon icon={Search01Icon} size={22} strokeWidth={1.5} />
      <input
        type="text"
        placeholder="Search"
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value)}
        className="w-full text-lg lg:text-xl focus:outline-none"
      />
    </div>
  );
}
