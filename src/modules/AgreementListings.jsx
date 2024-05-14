import { useEffect, useState } from "react";
import AgreementList from "../components/AgreementList";
import FilterButton from "../components/navbar/FilterButton";
import loading from "../../public/SVG/loading.svg";
import Search from "../components/navbar/Search";
import Data from "../components/demo.json";

function AgreementListings() {
  const [agreements, setagreements] = useState([]);
  const [filteredAgreements, setFilteredagreements] = useState([]);
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const isStateAgent = localStorage.getItem("Isstateagent");
  const islandlord = localStorage.getItem("Islandlord");
  const isTenanat = localStorage.getItem("Istenant");
  console.log("agreements", agreements);

  const statusFilters = [
    {
      label: "All",
      property: "",
    },
    {
      label: "Pending",
      property: 0,
    },
    {
      label: "Active",
      property: 3,
    },
    {
      label: "Inactive",
      property: 4,
    },
    {
      label: "Cancelled",
      property: 5,
    },
  ];

  const durationFilters = [
    {
      label: "All Months",
      property: "",
    },
    {
      label: "1 Month",
      property: 1,
    },
    {
      label: "2 Months",
      property: 2,
    },
    {
      label: "3 Months",
      property: 3,
    },
    {
      label: "4 Months",
      property: 4,
    },
    {
      label: "5 Months",
      property: 5,
    },
    {
      label: "6 Months",
      property: 6,
    },
    {
      label: "7 Months",
      property: 7,
    },
    {
      label: "8 Months",
      property: 8,
    },
  ];

  useEffect(() => {
    fetchAgreements();
  }, []);

  const fetchAgreements = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/agreements/getAllAgreements`
      );
      const agreementsData = await response.json();
      setagreements(agreementsData);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("duration", typeof duration, duration)
  console.log("status", typeof status, status)

  const filterAgreements = () => {
    return agreements.filter((agreements) => {
      console.log("Running");
      // Filter by searchInput in description
      if (
        searchInput &&
        !agreements.estateName
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      ) {
        return false;
      }
      // Filter by status
      if (status?.property && agreements.status !== status?.property) {
        return false;
      }

      // Filter by duration
      if (duration?.property && agreements.durationMonths !== duration?.property) {
        return false;
      }

      return true;
    });
  };

  useEffect(() => {
    console.log("useeffect running");
    if (searchInput || duration || status) {
      const filtered = filterAgreements();
      setFilteredagreements(filtered);
    } else {
      console.log("else");
      setFilteredagreements(agreements);
    }
  }, [searchInput, status, duration, agreements]);
  console.log("filteredAgreements", filteredAgreements);

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
              filters={statusFilters}
              sortFilter={status}
              setSortFilter={setStatus}
              initialFilter={"Status"}
            />

            <FilterButton
              filters={durationFilters}
              sortFilter={duration}
              setSortFilter={setDuration}
              initialFilter={"All Months"}
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
            <AgreementList agreementsProp={filteredAgreements} />
          ) : (
            <div className="flex w-full py-10 justify-center text-slate-500">
              <img alt="loader" src={loading} />
            </div>
          )}
          {!isStateAgent &&
          !islandlord &&
          !isTenanat &&
          agreements.length > 0 ? (
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
