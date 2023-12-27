import { useEffect, useState } from "react";
import AgreementList from "../components/AgreementList";
import FilterButton from "../components/navbar/FilterButton";
import loading from "../../public/SVG/loading.svg";
import Search from "../components/navbar/Search";
import Data from "../components/demo.json";

const filters = [
  {
    label: "Newest first",
    property: "#newest_first_org",
  },
  {
    label: "Sort A-Z",
    property: "#sort_asc_org",
  },
  {
    label: "Sort Z-A",
    property: "#sort_dsc_org",
  },
];

function AgreementListings() {
  const [agreements, setagreements] = useState([]);
  const [searchInput, setSearchInput] = useState({ searchString: "" });
  const isStateAgent=localStorage.getItem("Isstateagent")
  const islandlord=localStorage.getItem("Islandlord")
  const isTenanat=localStorage.getItem("Istenant")

  useEffect(() => {

    setagreements(Data.AgreementData);

  }, []);
  return (
    <div className="flex flex-col justify-center w-full">
      {/* ------------- Background Gradient ------------ */}
      <div className="gradient z-0" />

      {/* ------------- Headings ------------ */}

      <div className="gap-0 z-[1] mt-5">
        <h1 className="text-gray-900 text-center text-3xl md:text-4xl font-semibold">
          Simplifying Rental Agreements for You!
        </h1>
        <h1 className="blue-gradient text-center text-3xl md:text-4xl font-semibold">
          Transparent Terms. Easy Agreements. Hassle-Free Renting.
        </h1>
      </div>




      <div className="flex justify-center my-6 relative mx-3">
        <div className="flex lg:w-3/5 flex-col justify-center w-full md:w-4/5 items-start border z-10 border-slate-300  bg-white/50 rounded-2xl py-5">
          <div className="flex mt-6 w-full justify-between border-b ">
            <h1 className="text-2xl text-start font-medium text-slate-800 px-5 my-2">
              List of Agreements
            </h1>


            {/* --------sort button--------- */}
            <FilterButton
              filters={filters}
              agreements={agreements}
              setagreements={setagreements}
            />

            {/* --------sort button END--------- */}
          </div>
          <div className="flex w-full px-4 py-2">
            <Search
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchPlaceholder="Type agreements name to search.."
            />
          </div>
          {agreements.length > 0 ? (
            <AgreementList agreementsProp={agreements} />
          ) : (
            <div className="flex w-full py-10 justify-center text-slate-500">
              <img alt="loader" src={loading} />
            </div>
          )}
          {(!isStateAgent && !islandlord &&!isTenanat) && agreements.length > 0 ? (
            <h1 className=" blue-gradient text-center text-3xl md:text-4xl font-semibold ml-5">
              Please login to see more...
            </h1>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AgreementListings;
