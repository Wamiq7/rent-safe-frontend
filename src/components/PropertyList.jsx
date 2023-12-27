/* eslint-disable camelcase */
import React from "react";
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const PropertyList = ({ propertiesProp = [] }) => {
  const isStateAgent = localStorage.getItem("Isstateagent")
  const islandlord = localStorage.getItem("Islandlord")
  const isTenanat = localStorage.getItem("Istenant")

  let limitedproperties;
  if (!isStateAgent && !islandlord && !isTenanat) {
    // const maxToShow = 4;
    limitedproperties = propertiesProp.slice(0, 4);
  } else {
    limitedproperties = propertiesProp;
  }

  return limitedproperties.map((properties, index) => {
    const {
      uid,
      title,
      description,
      timeframe,
      thumbnail,
      floor,
      status,
      stateAgent
    } = properties;

    return (
      // giving key prop to react fragment is imp to avoid unique key warnings
      <React.Fragment key={index}>
        {/* ---------------- Project List--------------- */}
        <Link
          key={index}
          to={`/properties/${uid}`}
          className="flex flex-col items-start gap-3 p-5 hover:bg-slate-100 cursor-pointer border-t w-full relative"
        >
          <div className="flex flex-col lg:flex-row w-full gap-6 items-center relative">
            <img
              src={thumbnail}
              className="flex place-content-start items-start w-full aspect-video  h-48 object-cover rounded-lg"
              alt={title}
            />
            <div className="flex flex-col w-full">
              {/* ------------ title------------- */}
              <h1 className="text-xl font-medium text-slate-900">{title}</h1>

              {/* ------------ timestamp ------------- */}
              <div className="flex my-5">
                <div className="flex flex-col w-1/2 items-start justify-start gap-3">
                  <div>
                    <h3 className="listing-content-data">{timeframe}</h3>
                    <h4 className="listing-content-constant">Listed Date</h4>
                  </div>
                  <div>
                    <h3 className="listing-content-data">
                      {status}
                    </h3>
                    <h4 className="listing-content-constant">Status</h4>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 items-start justify-start gap-3">
                  <div>
                    <h3 className="listing-content-data">{floor}</h3>
                    <h4 className="listing-content-constant">Floor</h4>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ------------ description ------------- */}
          <p className="listing-description">{description}</p>

          {/* -------------tech Stack---------------- */}
          <div className="flex border  bg-accent/5 shadow-sm p-2 text-sm px-2 py-1 rounded-xl">
            Posted By :&nbsp;&nbsp;<b>{stateAgent.name}</b>
          </div>
        </Link>
      </React.Fragment>
    );
  });
};

export default PropertyList;
