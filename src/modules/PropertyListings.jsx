import { useContext, useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import PropertyList from "../components/PropertyList";
import FilterButton from "../components/navbar/FilterButton";
// import loading from "../../../../../../../../SVG/loading.svg";
import loading from "../../public/SVG/loading.svg";
import Search from "../components/navbar/Search";
import { loadingContext } from "../components/context/LoadingState";
import propertiesData from "./properties.json"
import { Log } from "ethers";

const filters = [
  {
    label: "featured",
    property: "#featured",
  },
  {
    label: "Newest first",
    property: "#newest_first_project",
  },
  {
    label: "Sort A-Z",
    property: "#proj_sort_asc",
  },
  {
    label: "Sort Z-A",
    property: "#proj_sort_dsc",
  },
  {
    label: "Open to work",
    property: "#open_for_development",
  },
];

function PropertyListings() {
  const [properties, setproperties] = useState([]);
  const [searchInput, setSearchInput] = useState({ searchString: "" });
  const isStateAgent = localStorage.getItem("Isstateagent")
  const islandlord = localStorage.getItem("Islandlord")
  const isTenanat = localStorage.getItem("Istenant")


  const fetchproperties = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/property/getAllProperties`);
      const propertiesData = await response.json();
      setproperties(propertiesData)

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchproperties();
  }, []);





  return (
    <div className="flex flex-col justify-center w-full">
      {/* ------------- Background Gradient ------------ */}
      <div className="gradient z-0" />

      {/* ------------- Headings ------------ */}

      <div className="gap-0 z-[1] mt-5">
        <h1 className=" text-gray-900 text-center text-3xl md:text-4xl font-semibold">
          Find your dream properties to live
        </h1>
        <h1 className=" blue-gradient text-center text-3xl md:text-4xl  font-semibold">
          Complete Trust & Security
        </h1>

        {/* ----------------Show Only for Organizations------------ */}
        {isStateAgent && (
          <div className="flex my-8 items-center justify-center gap-10 z-[1]">
            <div className="flex justify-between  items-center cursor-pointer bg-accent hover:bg-accent/50 rounded-lg text-white font-semibold text-center">
              <a
                href="/properties/create"
                className="flex p-3 md:p-4 items-center justify-center"
              >
                List property
                <RiArrowRightSLine className="ml-2 text-md" />
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center my-6 relative mx-3">
        <div className="flex lg:w-3/5 flex-col justify-center w-full md:w-4/5 items-start border z-10 border-slate-300  bg-white/50 rounded-2xl py-5">
          <h1 className="text-2xl text-start font-medium text-slate-800 px-5">
            Properties Listed on Platform
          </h1>
          <div className="flex mt-6 w-full justify-between border-b ">
            <div className="tabs gap-4 pl-6">
            </div>

            {/* --------sort button--------- */}
            <FilterButton
              filters={filters}
              properties={properties}
              setproperties={setproperties}
            />

            {/* --------sort button END--------- */}
          </div>

          <p className="mx-5 my-2 text-base">
            Browse properties that match your living criteria and prefered area. Ordered by most relevant.
          </p>
          <div className="flex w-full px-4 py-2">
            <Search
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchPlaceholder="Type project title to search.."
            />
            {/* <Search /> */}
          </div>

          {properties.length > 0 ? (
            <PropertyList propertiesProp={properties} />
          ) : (
            <div className="flex w-full py-10 justify-center text-slate-500">
              <img alt="loader" src={loading} />
            </div>
          )}
          {(!isStateAgent && !islandlord && !isTenanat) && properties.length > 0 ? (
            <h1 className=" blue-gradient text-center text-2xl md:text-4xl font-semibold ml-5">
              Please login to see more...
            </h1>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PropertyListings;
