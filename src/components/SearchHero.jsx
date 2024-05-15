import React from "react";
import FilterButton from "./navbar/FilterButton";

function SearchHero({
  floorType,
  setFloorType,
  setAddress,
  setCity,
  setMinAmount,
  setMaxAmount,
}) {
  const propertyType = [
    {
      label: "All Bed DD",
      property: "",
    },
    {
      label: "1 Bed DD",
      property: "1 Bed DD",
    },
    {
      label: "2 Bed DD",
      property: "2 Bed DD",
    },
    {
      label: "3 Bed DD",
      property: "3 Bed DD",
    },
    {
      label: "4 Bed DD",
      property: "4 Bed DD",
    },
    {
      label: "5 Bed DD",
      property: "5 Bed DD",
    },
    {
      label: "6 Bed DD",
      property: "6 Bed DD",
    },
    {
      label: "7 Bed DD",
      property: "7 Bed DD",
    },
    {
      label: "8 Bed DD",
      property: "8 Bed DD",
    },
  ];

  return (
    <>
      <div className="min-h-[48vh] relative w-full search-hero">
        <div className="search-hero ">
          <div className="bg-[rgba(0,0,0,.5)] absolute top-0 start-0 end-0 bottom-0"></div>
        </div>
        <div className="absolute top-[6%] md:top-[20%] start-0 end-0">
          <h1 className="text-xl md:text-[4rem] text-white text-center">
            Discover Your New Home
          </h1>
          <h2 className="text-md md:text-[1.5rem] text-white text-center md:mt-8">
            Helping 100 million renters find their perfect fit.
          </h2>

          <div className="flex justify-center flex-wrap gap-6 items-center mt-10">
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm max-w-[280px] rounded-lg block w-full p-2.5"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Search by Address"
            />
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm max-w-[280px] rounded-lg block w-full p-2.5"
              placeholder="Search by City"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="number"
              class="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm max-w-[280px] rounded-lg block w-full p-2.5"
              placeholder="Minimum Amount"
              onChange={(e) => {
                setMinAmount(e.target.value);
              }}
            />
            <input
              class="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 max-w-[280px] text-sm rounded-lg block w-full p-2.5"
              type="number"
              placeholder="Maximum Amount"
              onChange={(e) => {
                setMaxAmount(e.target.value);
              }}
            />
            <FilterButton
              filters={propertyType}
              initialFilter={"All types Bed"}
              sortFilter={floorType}
              setSortFilter={setFloorType}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchHero;
