import React from "react";

export default function Search({
  searchInput,
  setSearchInput,
  searchPlaceholder,
}) {

  return (
    <div className="flex gap-0 items-center w-full rounded-xl p-0 h-10 justify-center">
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="px-3 h-full outline-1 border w-full rounded-xl text-center border-slate-300 outline-slate-300/50 "
      />
    </div>
  );
}
